const axios = require('axios');
const { config } = require('../config/env');
const { buildConcisePrompt, buildPatientResult, extractScore, classifyScore } = require('./gemini.service');
const { getCacheKey, getFromCache, setInCache } = require('./cache');

const inflightByCacheKey = new Map();
const CLAUDE_MAX_TOKENS = 220;
const CLAUDE_TEMPERATURE = 0;

function extractUsage(data) {
  const usage = data?.usage;
  if (!usage || typeof usage !== 'object') return null;
  const input = Number(usage.input_tokens ?? 0);
  const output = Number(usage.output_tokens ?? 0);
  return {
    input: Number.isFinite(input) ? input : 0,
    output: Number.isFinite(output) ? output : 0,
    total: (Number.isFinite(input) ? input : 0) + (Number.isFinite(output) ? output : 0),
  };
}

async function analyzePatientWithClaude(patient) {
  if (!config.claudeApiKey) {
    throw new Error('CLAUDE_API_KEY no está configurado en .env');
  }

  // 1. Revisa caché primero — no gastar tokens si ya lo analizamos
  const cacheKey = getCacheKey(patient);
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  // 1.1 De-dup de llamadas concurrentes para el mismo payload
  const inflight = inflightByCacheKey.get(cacheKey);
  if (inflight) {
    return inflight;
  }

  const task = (async () => {

    const scores = patient.respuestas.map(r => extractScore(r));
    const validScores = scores.filter(s => s !== null);
    const total = validScores.reduce((sum, s) => sum + s, 0);
    const clasificacion = classifyScore(total);
    const prompt = buildConcisePrompt(patient, scores, total, clasificacion);

    let response;
    try {
      const modelToUse = config.claudeHaikuModel || config.claudeModel;
      response = await axios.post(
        config.claudeApiUrl,
        {
          model: modelToUse,
          max_tokens: CLAUDE_MAX_TOKENS,
          temperature: CLAUDE_TEMPERATURE,
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'x-api-key': config.claudeApiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          timeout: 30000,
        }
      );
    } catch (err) {
      // 2. Manejo específico de rate limit (429)
      if (err.response?.status === 429) {
        const retryAfter = err.response.headers['retry-after'] || 60;
        throw new Error(`Rate limit alcanzado. Reintenta en ${retryAfter} segundos.`);
      }
      throw err;
    }

    // 3. Leer headers para monitorear uso (opcional pero útil para logs)
    const tokensRemaining = response.headers['anthropic-ratelimit-tokens-remaining'];
    const tokensReset = response.headers['anthropic-ratelimit-tokens-reset'];
    if (tokensRemaining && parseInt(tokensRemaining, 10) < 10000) {
      console.warn(`⚠️ Tokens restantes bajos: ${tokensRemaining} — reset: ${tokensReset}`);
    }

    const usage = extractUsage(response.data);
    if (usage) {
      console.info(`[Claude usage] input=${usage.input} output=${usage.output} total=${usage.total}`);
    }

    const blocks = Array.isArray(response.data.content) ? response.data.content : [];
    const analisisIA = blocks
      .filter(block => block?.type === 'text' && typeof block.text === 'string')
      .map(block => block.text)
      .join('\n')
      .trim();

    if (!analisisIA) {
      throw new Error('Claude no devolvió contenido de texto en la respuesta');
    }

    const result = buildPatientResult(patient, scores, total, clasificacion, analisisIA);

    // 4. Guardar en caché para no repetir la llamada
    setInCache(cacheKey, result);

    return result;
  })();

  inflightByCacheKey.set(cacheKey, task);
  try {
    return await task;
  } finally {
    inflightByCacheKey.delete(cacheKey);
  }
}

module.exports = { analyzePatientWithClaude };