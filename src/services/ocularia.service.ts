const QUESTION_COUNT = 6;
const DEFAULT_MAX_SUBMISSIONS = 25;
const SUBMISSION_COUNT_STORAGE_KEY = 'ocularia_submission_count_v1';

export interface OculariaSubmissionLimitState {
  used: number;
  remaining: number;
  max: number;
  blocked: boolean;
}

export interface OculariaRequest {
  nombre: string;
  apellidos: string;
  edad: number;
  sexo: 'F' | 'M' | 'Otro';
  fecha: string;
  respuestas: number[];
}

export interface OculariaResponse {
  success: boolean;
  paciente: {
    nombre: string;
    edad: number;
    sexo: string;
    fecha: string;
  };
  resultado: {
    diagnostico: string;
    riesgo: string;
    recomendaciones: string[];
    puntuacion: {
      total: number;
      maximo: number;
      porPregunta: number[];
    };
    clasificacion: {
      nivel: string;
      descripcion: string;
    };
  };
}

export interface ImpactoFactoresRequest {
  nombre: string;
  respuestas: number[];
  medicamentos?: string[];
  factores_hormonales?: string[];
  factores_ambientales?: string[];
  enfermedades?: string[];
  antecedentes_oculares?: string[];
  cirugia_ocular_previa?: string[];
}

export interface ImpactoFactoresResponse {
  success: boolean;
  puntuacion: {
    total: number;
    maximo: number;
  };
  resumen: string;
}

function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_OCULARIA_API_BASE_URL?.trim();
  
  if (!configured || configured.length === 0) {
    throw new Error(
      'VITE_OCULARIA_API_BASE_URL no está configurada. ' +
      'Por favor define esta variable de entorno en tu archivo .env o durante el deploy.'
    );
  }
  
  const baseUrl = configured.replace(/\/$/, '');
  
  // Forzar HTTPS para proteger datos del paciente en tránsito
  if (baseUrl.startsWith('http://')) {
    throw new Error('La URL de la API debe usar HTTPS para proteger los datos del paciente.');
  }
  
  return baseUrl;
}

function getMaxSubmissions(): number {
  const configuredRaw = import.meta.env.VITE_OCULARIA_MAX_SUBMISSIONS?.trim();
  if (!configuredRaw) return DEFAULT_MAX_SUBMISSIONS;
  const configured = Number(configuredRaw);
  if (!Number.isInteger(configured) || configured < 1) {
    return DEFAULT_MAX_SUBMISSIONS;
  }
  return configured;
}

function getStoredSubmissionCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(SUBMISSION_COUNT_STORAGE_KEY);
    if (!raw) return 0;
    const parsed = Number(raw);
    if (!Number.isInteger(parsed) || parsed < 0) return 0;
    return parsed;
  } catch {
    return 0;
  }
}

function setStoredSubmissionCount(nextCount: number): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SUBMISSION_COUNT_STORAGE_KEY, String(Math.max(0, nextCount)));
  } catch {
    // Ignoramos errores de storage para no romper la evaluacion.
  }
}

function ensureSubmissionLimit(): void {
  const used = getStoredSubmissionCount();
  const max = getMaxSubmissions();
  if (used >= max) {
    throw new Error(`Se alcanzo el limite global de ${max} cuestionarios para esta version de prueba.`);
  }
}

function registerSubmissionUsage(): void {
  const used = getStoredSubmissionCount();
  setStoredSubmissionCount(used + 1);
}

export function getOculariaSubmissionLimitState(): OculariaSubmissionLimitState {
  const max = getMaxSubmissions();
  const used = getStoredSubmissionCount();
  const normalizedUsed = Math.min(used, max);
  return {
    used: normalizedUsed,
    remaining: Math.max(0, max - normalizedUsed),
    max,
    blocked: normalizedUsed >= max,
  };
}

// Allowlist: solo letras (incluidas tildes/diéresis), espacios, guiones y apóstrofes.
const NAME_ALLOWLIST_RE = /^[\p{L}\s'\-]{1,}$/u;

function sanitizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function assertNameSafe(value: string, field: string): void {
  if (!NAME_ALLOWLIST_RE.test(value)) {
    throw new Error(`El campo ${field} contiene caracteres no permitidos.`);
  }
}

function validateRequest(payload: OculariaRequest): OculariaRequest {
  const nombre = sanitizeText(payload.nombre);
  const apellidos = sanitizeText(payload.apellidos);
  const edad = Number(payload.edad);
  const sexo = payload.sexo;
  const fecha = payload.fecha;
  const respuestas = payload.respuestas;

  if (!nombre || nombre.length > 80) {
    throw new Error('El nombre no es valido.');
  }
  assertNameSafe(nombre, 'nombre');

  if (!apellidos || apellidos.length > 120) {
    throw new Error('Los apellidos no son validos.');
  }
  assertNameSafe(apellidos, 'apellidos');

  if (!Number.isInteger(edad) || edad < 1 || edad > 120) {
    throw new Error('La edad debe ser un numero entre 1 y 120.');
  }

  if (!['F', 'M', 'Otro'].includes(sexo)) {
    throw new Error('El sexo seleccionado no es valido.');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    throw new Error('La fecha no tiene formato valido.');
  }
  // Validar que sea una fecha calendario real
  const parsedDate = new Date(fecha);
  if (isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== fecha) {
    throw new Error('La fecha proporcionada no es una fecha valida.');
  }

  if (!Array.isArray(respuestas) || respuestas.length !== QUESTION_COUNT) {
    throw new Error('Debes responder las 6 preguntas del cuestionario.');
  }

  const normalizedScores = respuestas.map((score) => {
    if (!Number.isInteger(score) || score < 0 || score > 4) {
      throw new Error('Cada respuesta debe estar entre 0 y 4.');
    }
    return score;
  });

  return {
    nombre,
    apellidos,
    edad,
    sexo,
    fecha,
    respuestas: normalizedScores,
  };
}

const MAX_STRING = 2000;
const MAX_RECOMMENDATIONS = 20;

function isSafeString(value: unknown, maxLength = MAX_STRING): value is string {
  return typeof value === 'string' && value.length <= maxLength;
}

function isValidResponse(value: unknown): value is OculariaResponse {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<OculariaResponse>;
  return (
    typeof data.success === 'boolean' &&
    !!data.paciente &&
    isSafeString(data.paciente.nombre, 200) &&
    typeof data.paciente.edad === 'number' &&
    isSafeString(data.paciente.sexo, 20) &&
    isSafeString(data.paciente.fecha, 20) &&
    !!data.resultado &&
    isSafeString(data.resultado.diagnostico) &&
    isSafeString(data.resultado.riesgo, 50) &&
    Array.isArray(data.resultado.recomendaciones) &&
    data.resultado.recomendaciones.length <= MAX_RECOMMENDATIONS &&
    data.resultado.recomendaciones.every((r) => isSafeString(r)) &&
    !!data.resultado.puntuacion &&
    typeof data.resultado.puntuacion.total === 'number' &&
    typeof data.resultado.puntuacion.maximo === 'number' &&
    Array.isArray(data.resultado.puntuacion.porPregunta) &&
    !!data.resultado.clasificacion &&
    isSafeString(data.resultado.clasificacion.nivel, 50) &&
    isSafeString(data.resultado.clasificacion.descripcion)
  );
}

export async function evaluarOcularia(payload: OculariaRequest): Promise<OculariaResponse> {
  const safePayload = validateRequest(payload);
  ensureSubmissionLimit();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/diagnostico/tratamiento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(safePayload),
      signal: controller.signal,
    });

    const json = (await response.json()) as unknown;

    if (!response.ok) {
      const apiMessage =
        json &&
        typeof json === 'object' &&
        'error' in json &&
        typeof (json as { error?: unknown }).error === 'string'
          ? (json as { error: string }).error
          : 'No se pudo procesar la evaluacion clinica.';
      throw new Error(apiMessage);
    }

    if (!isValidResponse(json)) {
      throw new Error('La API devolvio un formato inesperado.');
    }

    registerSubmissionUsage();

    return json;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('La solicitud tardo demasiado. Intentalo de nuevo en unos segundos.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function sanitizeStringArray(arr: string[] | undefined, maxItems = 20, maxLen = 200): string[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .slice(0, maxItems)
    .map(s => sanitizeText(String(s)).slice(0, maxLen))
    .filter(Boolean);
}

/**
 * Strips parenthetical drug/item lists before sending to the API to reduce token count.
 * "Antihistamínicos (Loratadina, Clorfenamina...)" → "Antihistamínicos"  (~60 tokens saved worst-case)
 */
function compressForApi(value: string): string {
  return value.replace(/\s*\([^)]+\)/g, '').trim();
}

function isValidImpactoResponse(value: unknown): value is ImpactoFactoresResponse {
  if (!value || typeof value !== 'object') return false;
  const data = value as Partial<ImpactoFactoresResponse>;
  return (
    typeof data.success === 'boolean' &&
    !!data.puntuacion &&
    typeof (data.puntuacion as { total?: unknown }).total === 'number' &&
    typeof (data.puntuacion as { maximo?: unknown }).maximo === 'number' &&
    isSafeString(data.resumen)
  );
}

export async function evaluarImpactoFactores(
  payload: ImpactoFactoresRequest,
): Promise<ImpactoFactoresResponse> {
  const nombre = sanitizeText(payload.nombre);
  if (!nombre || nombre.length > 80) throw new Error('El nombre no es valido.');
  assertNameSafe(nombre, 'nombre');

  if (!Array.isArray(payload.respuestas) || payload.respuestas.length !== QUESTION_COUNT) {
    throw new Error('Se requieren las 6 respuestas del cuestionario.');
  }
  const respuestas = payload.respuestas.map(s => {
    if (!Number.isInteger(s) || s < 0 || s > 4) throw new Error('Cada respuesta debe estar entre 0 y 4.');
    return s;
  });

  const medicamentos = sanitizeStringArray(payload.medicamentos).map(compressForApi);
  const factores_hormonales = sanitizeStringArray(payload.factores_hormonales).map(compressForApi);
  const factores_ambientales = sanitizeStringArray(payload.factores_ambientales).map(compressForApi);
  const enfermedades = sanitizeStringArray(payload.enfermedades).map(compressForApi);
  const antecedentes_oculares = sanitizeStringArray(payload.antecedentes_oculares).map(compressForApi);
  const cirugia_ocular_previa = sanitizeStringArray(payload.cirugia_ocular_previa).map(compressForApi);

  const hasOptional = [
    medicamentos, factores_hormonales, factores_ambientales,
    enfermedades, antecedentes_oculares, cirugia_ocular_previa,
  ].some(a => a.length > 0);
  if (!hasOptional) throw new Error('Selecciona al menos un factor para el análisis de impacto.');

  const body: Record<string, unknown> = { nombre, respuestas };
  if (medicamentos.length) body.medicamentos = medicamentos;
  if (factores_hormonales.length) body.factores_hormonales = factores_hormonales;
  if (factores_ambientales.length) body.factores_ambientales = factores_ambientales;
  if (enfermedades.length) body.enfermedades = enfermedades;
  if (antecedentes_oculares.length) body.antecedentes_oculares = antecedentes_oculares;
  if (cirugia_ocular_previa.length) body.cirugia_ocular_previa = cirugia_ocular_previa;

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/diagnostico/impacto-factores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const json = (await response.json()) as unknown;

    if (!response.ok) {
      const apiMessage =
        json && typeof json === 'object' && 'error' in json &&
        typeof (json as { error?: unknown }).error === 'string'
          ? (json as { error: string }).error
          : 'No se pudo procesar el análisis de factores.';
      throw new Error(apiMessage);
    }

    if (!isValidImpactoResponse(json)) {
      throw new Error('La API devolvio un formato inesperado en el análisis de factores.');
    }

    return json;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('La solicitud tardó demasiado. Inténtalo de nuevo.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
