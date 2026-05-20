// Extrae el número del formato "A VECES (2)" → 2
function extractScore(value) {
  if (value === null || value === undefined || value === '') return null;
  const match = String(value).match(/\((\d+)\)/);
  return match ? Number(match[1]) : null;
}

// Califica el nivel de ojo seco según puntuación total (0-24)
function classifyScore(total) {
  if (total <= 4)  return { nivel: 'Normal',    descripcion: 'Sin síntomas significativos de ojo seco.' };
  if (total <= 9)  return { nivel: 'Leve',       descripcion: 'Síntomas leves de ojo seco.' };
  if (total <= 14) return { nivel: 'Moderado',   descripcion: 'Síntomas moderados de ojo seco.' };
  return             { nivel: 'Severo',     descripcion: 'Síntomas severos de ojo seco.' };
}

const PREGUNTAS = [
  '¿Con qué frecuencia ha experimentado sensación de ardor, picazón o molestia en sus ojos?',
  '¿Ha notado visión borrosa o sensibilidad a la luz?',
  '¿Ha tenido dificultad para leer, usar computadora o realizar actividades que requieren visión sostenida?',
  '¿Sus síntomas oculares le han impedido sentirse cómodo en actividades como conducir o ver televisión?',
  '¿Sus ojos se sienten incómodos en ambientes con aire acondicionado, viento o lugares muy secos?',
  '¿Ha notado que sus síntomas oculares empeoran al estar expuesto a ambientes con humo o contaminación?',
];

function buildAnalysisPrompt(patient, scores, total, clasificacion) {
  const respuestasTexto = PREGUNTAS.map((pregunta, i) => {
    const raw = patient.respuestas[i] ?? 'Sin respuesta';
    const score = scores[i] !== null ? scores[i] : '?';
    return `  P${i + 1} (${score}/4): ${pregunta}\n    Respuesta: ${raw}`;
  }).join('\n');

  return `Eres un asistente clínico especializado en salud ocular. Analiza los resultados de un cuestionario de detección de ojo seco y proporciona una interpretación clara en español.

DATOS DEL PACIENTE:
- Nombre: ${patient.nombre} ${patient.apellidos}
- Edad: ${patient.edad} años
- Sexo: ${patient.sexo}
- Fecha: ${patient.fecha}

RESPUESTAS AL CUESTIONARIO (escala 0=Nunca a 4=Siempre):
${respuestasTexto}

PUNTUACIÓN TOTAL: ${total}/24 → ${clasificacion.nivel} (${clasificacion.descripcion})

Por favor proporciona:
1. Una interpretación clínica breve (2-3 oraciones) del perfil sintomático del paciente
2. Los síntomas más relevantes identificados
3. Recomendaciones prácticas (no diagnóstico médico definitivo)
4. Si debe consultar a un oftalmólogo (sí/no y por qué)

Responde de forma clara, empática y en formato de texto plano sin markdown.`;
}

function buildPatientResult(patient, scores, total, clasificacion, analisisIA) {
  return {
    paciente: {
      nombre: `${patient.nombre} ${patient.apellidos}`,
      edad: patient.edad,
      sexo: patient.sexo,
      fecha: patient.fecha,
    },
    puntuacion: {
      total,
      maximo: 24,
      porPregunta: scores,
    },
    clasificacion,
    analisisIA,
  };
}

function buildConcisePrompt(patient, scores, total, clasificacion) {
  const respuestasTexto = patient.respuestas.join(' | ');
  return `Eres un asistente clínico especializado en ojo seco.

PACIENTE: ${patient.nombre} ${patient.apellidos} | ${patient.edad} años | ${patient.sexo}
PUNTUACIÓN: ${total}/24 → ${clasificacion.nivel}
RESPUESTAS: ${respuestasTexto}

Analiza este paciente y devuelve exactamente este JSON (sin markdown):
{
  "diagnostico": "texto breve",
  "riesgo": "bajo|medio|alto",
  "recomendaciones": ["rec1", "rec2", "rec3"]
}
Máximo 3 párrafos en total.`;
}

module.exports = {
  buildAnalysisPrompt,
  buildConcisePrompt,
  buildPatientResult,
  extractScore,
  classifyScore,
};
