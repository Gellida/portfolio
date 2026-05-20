import { useCallback, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Section from '../../components/Section';
import Seo from '../../components/Seo';
import { useLanguage } from '../../hooks/useLanguage';
import { evaluarOcularia, getOculariaSubmissionLimitState } from '../../services/ocularia.service';
import type { OculariaResponse } from '../../services/ocularia.service';

type Sexo = 'F' | 'M' | 'Otro';
type EstadoEvaluacion = 'idle' | 'loading' | 'success' | 'error';

interface PatientFormData {
  nombre: string;
  apellidos: string;
  edad: string;
  sexo: Sexo;
}

const QUESTIONS_ES = [
  '¿Con que frecuencia ha experimentado sensacion de ardor, picazon o molestia en sus ojos?',
  '¿Ha notado vision borrosa o sensibilidad a la luz?',
  '¿Ha tenido dificultad para leer, usar computadora o realizar actividades que requieren vision sostenida?',
  '¿Sus sintomas oculares le han impedido sentirse comodo en actividades como conducir o ver television?',
  '¿Sus ojos se sienten incomodos en ambientes con aire acondicionado, viento o lugares muy secos?',
  '¿Ha notado que sus sintomas oculares empeoran al estar expuesto a ambientes con humo o contaminacion?',
];

const QUESTIONS_EN = [
  'How often have you experienced burning, itching, or discomfort in your eyes?',
  'Have you noticed blurred vision or sensitivity to light?',
  'Have you had difficulty reading, using a computer, or performing sustained visual tasks?',
  'Have your eye symptoms made you uncomfortable during activities like driving or watching TV?',
  'Do your eyes feel uncomfortable in air-conditioned, windy, or very dry environments?',
  'Have you noticed your eye symptoms worsen in smoky or polluted environments?',
];

const ANSWER_OPTIONS = [
  { value: 0, es: 'Nunca', en: 'Never' },
  { value: 1, es: 'Casi nunca', en: 'Almost never' },
  { value: 2, es: 'A veces', en: 'Sometimes' },
  { value: 3, es: 'Casi siempre', en: 'Almost always' },
  { value: 4, es: 'Siempre', en: 'Always' },
];

function getRiskBadgeClass(riesgo: string): string {
  const risk = riesgo.toLowerCase();
  if (risk === 'alto') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200';
  if (risk === 'medio') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200';
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200';
}

function getTodayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function OcularIA() {
  const { language } = useLanguage();
  const isSpanish = language === 'es';
  const questions = isSpanish ? QUESTIONS_ES : QUESTIONS_EN;

  const [formData, setFormData] = useState<PatientFormData>({
    nombre: '',
    apellidos: '',
    edad: '',
    sexo: 'F',
  });
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [status, setStatus] = useState<EstadoEvaluacion>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState<OculariaResponse | null>(null);
  const [submissionLimit, setSubmissionLimit] = useState(() => getOculariaSubmissionLimitState());
  // Rate limiting: evitar envios multiples rapidamente (OWASP A04)
  const lastSubmitRef = useRef<number>(0);
  const SUBMIT_COOLDOWN_MS = 15_000;

  const unansweredCount = useMemo(() => answers.filter((value) => value < 0).length, [answers]);

  const seo =
    isSpanish
      ? {
          title: 'OcularIA: evaluador de ojo seco con IA',
          description:
            'Cuestionario digital de 6 preguntas que analiza sintomas de ojo seco con IA y devuelve riesgo clinico orientativo y recomendaciones.',
        }
      : {
          title: 'OcularIA: AI-powered dry eye evaluator',
          description:
            '6-question digital questionnaire that analyzes dry-eye symptoms with AI and returns indicative risk and recommendations.',
        };

  const handlePatientChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAnswerChange = (questionIndex: number, score: number) => {
    setAnswers((previous) => {
      const next = [...previous];
      next[questionIndex] = score;
      return next;
    });
  };

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentLimit = getOculariaSubmissionLimitState();
    setSubmissionLimit(currentLimit);
    if (currentLimit.blocked) {
      setStatus('error');
      setErrorMessage(
        isSpanish
          ? `Se alcanzo el limite global de ${currentLimit.max} cuestionarios para esta version.`
          : `The global limit of ${currentLimit.max} questionnaires has been reached for this version.`
      );
      return;
    }

    // Rate limiting: bloquear si no ha pasado el cooldown
    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      const secsLeft = Math.ceil((SUBMIT_COOLDOWN_MS - (now - lastSubmitRef.current)) / 1000);
      setStatus('error');
      setErrorMessage(
        isSpanish
          ? `Por favor espera ${secsLeft} segundo(s) antes de volver a evaluar.`
          : `Please wait ${secsLeft} second(s) before evaluating again.`
      );
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setResult(null);
    lastSubmitRef.current = now;

    const edad = Number(formData.edad);
    if (!formData.nombre.trim() || !formData.apellidos.trim() || !Number.isInteger(edad)) {
      setStatus('error');
      setErrorMessage(isSpanish ? 'Completa nombre, apellidos y edad valida.' : 'Please complete first name, last name, and valid age.');
      return;
    }

    if (unansweredCount > 0) {
      setStatus('error');
      setErrorMessage(
        isSpanish
          ? `Aun faltan ${unansweredCount} pregunta(s) por responder.`
          : `${unansweredCount} question(s) are still unanswered.`
      );
      return;
    }

    try {
      const apiResponse = await evaluarOcularia({
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        edad,
        sexo: formData.sexo,
        fecha: getTodayISODate(),
        respuestas: answers,
      });

      setResult(apiResponse);
      setStatus('success');
      setSubmissionLimit(getOculariaSubmissionLimitState());
    } catch (error) {
      setSubmissionLimit(getOculariaSubmissionLimitState());
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : isSpanish
            ? 'No se pudo completar la evaluacion.'
            : 'The evaluation could not be completed.'
      );
    }
  }, [formData, answers, unansweredCount, isSpanish, SUBMIT_COOLDOWN_MS]);

  return (
    <div>
      <Seo
        title={seo.title}
        description={seo.description}
        path="/projects/ocularia"
        language={language}
        image="/portadaweb.png"
        imageAlt={isSpanish ? 'Proyecto OcularIA con cuestionario de ojo seco' : 'OcularIA project with dry-eye questionnaire'}
        type="article"
      />

      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-16">
        <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">OcularIA</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl">
            {isSpanish
              ? 'Evaluacion orientativa de sintomas de ojo seco con cuestionario estandarizado y analisis de IA.'
              : 'Indicative dry-eye symptom evaluation with a standardized questionnaire and AI analysis.'}
          </p>
        </div>
      </div>

      <Section
        title={isSpanish ? 'Cuestionario clinico (6 preguntas)' : 'Clinical questionnaire (6 questions)'}
        subtitle={
          isSpanish
            ? 'Completa tus datos y responde en una escala de 0 (Nunca) a 4 (Siempre).'
            : 'Complete your details and answer on a scale from 0 (Never) to 4 (Always).'
        }
      >
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          {status === 'error' && (
            <div className="mb-6 rounded-lg border border-red-300 bg-red-50 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200 p-4">
              {errorMessage}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
             
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  {isSpanish ? 'Nombre' : 'First name'}
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handlePatientChange}
                  maxLength={80}
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label htmlFor="apellidos" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  {isSpanish ? 'Apellidos' : 'Last name'}
                </label>
                <input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  value={formData.apellidos}
                  onChange={handlePatientChange}
                  maxLength={120}
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label htmlFor="edad" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  {isSpanish ? 'Edad' : 'Age'}
                </label>
                <input
                  id="edad"
                  name="edad"
                  type="number"
                  min={1}
                  max={120}
                  value={formData.edad}
                  onChange={handlePatientChange}
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label htmlFor="sexo" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  {isSpanish ? 'Sexo' : 'Sex'}
                </label>
                <select
                  id="sexo"
                  name="sexo"
                  value={formData.sexo}
                  onChange={handlePatientChange}
                  disabled={status === 'loading'}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 bg-white dark:bg-slate-900"
                >
                  <option value="F">{isSpanish ? 'Femenino' : 'Female'}</option>
                  <option value="M">{isSpanish ? 'Masculino' : 'Male'}</option>
                  <option value="Otro">{isSpanish ? 'Otro' : 'Other'}</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <fieldset key={question} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                  <legend className="font-semibold mb-3">
                    {isSpanish ? `Pregunta ${index + 1}` : `Question ${index + 1}`}: {question}
                  </legend>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
                    {ANSWER_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option.value}
                          checked={answers[index] === option.value}
                          onChange={() => handleAnswerChange(index, option.value)}
                          disabled={status === 'loading'}
                        />
                        <span>{isSpanish ? option.es : option.en}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>

            {/* Aviso de privacidad antes del envio (OWASP A01 / GDPR) */}
            <p className="text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3">
              {isSpanish
                ? 'Los datos que introduces (nombre, apellidos, edad y sexo) se envian de forma segura a un servidor externo para generar el analisis clinico. No se almacenan de forma persistente.'
                : 'The details you enter (name, surname, age and sex) are sent securely to an external server to generate the clinical analysis. They are not stored persistently.'}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={status === 'loading' || submissionLimit.blocked}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submissionLimit.blocked
                  ? isSpanish
                    ? 'Limite alcanzado'
                    : 'Limit reached'
                  : status === 'loading'
                  ? isSpanish
                    ? 'Evaluando...'
                    : 'Evaluating...'
                  : isSpanish
                    ? 'Evaluar cuestionario'
                    : 'Evaluate questionnaire'}
              </button>

              <button
                type="button"
                disabled={status === 'loading'}
                onClick={() => {
                  setFormData({ nombre: '', apellidos: '', edad: '', sexo: 'F' });
                  setAnswers(Array(questions.length).fill(-1));
                  setStatus('idle');
                  setErrorMessage('');
                  setResult(null);
                }}
                className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSpanish ? 'Limpiar' : 'Reset'}
              </button>
            </div>
          </form>
        </div>
      </Section>

      {status === 'success' && result && (
        <Section
          title={isSpanish ? 'Resultado de OcularIA' : 'OcularIA result'}
          subtitle={isSpanish ? 'Interpretacion orientativa generada con IA clinica.' : 'Indicative interpretation generated with clinical AI.'}
        >
          <div className="grid lg:grid-cols-3 gap-6">
            <article className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <h3 className="text-xl font-bold mb-3">{isSpanish ? 'Diagnostico orientativo' : 'Indicative diagnosis'}</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">{result.resultado.diagnostico}</p>

              <div className="mb-4">
                <span className="text-sm text-slate-500 dark:text-slate-400">{isSpanish ? 'Riesgo' : 'Risk'}:</span>{' '}
                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getRiskBadgeClass(result.resultado.riesgo)}`}>
                  {result.resultado.riesgo}
                </span>
              </div>

              <h4 className="font-semibold mb-2">{isSpanish ? 'Recomendaciones' : 'Recommendations'}</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                {result.resultado.recomendaciones.map((recommendation, idx) => (
                  <li key={idx}>{recommendation}</li>
                ))}
              </ul>
            </article>

            <aside className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <h3 className="text-lg font-bold mb-3">{isSpanish ? 'Puntuacion' : 'Score'}</h3>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {result.resultado.puntuacion.total} / {result.resultado.puntuacion.maximo}
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {result.resultado.clasificacion.nivel} - {result.resultado.clasificacion.descripcion}
              </p>

              <div className="space-y-2">
                {result.resultado.puntuacion.porPregunta.map((score, index) => (
                  <div key={`score-${index + 1}`} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">{isSpanish ? `Pregunta ${index + 1}` : `Question ${index + 1}`}</span>
                    <strong>{score}/4</strong>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            {isSpanish
              ? 'Aviso: este resultado es orientativo y no sustituye una valoracion medica profesional.'
              : 'Notice: this result is indicative and does not replace a professional medical evaluation.'}
          </p>
        </Section>
      )}

      <Section title={isSpanish ? 'Detalle del proyecto' : 'Project details'}>
        <div className="space-y-4">
          <p className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-slate-700 dark:text-slate-300">
            {isSpanish
              ? 'OcularIA integra una API externa con analisis de Claude para transformar respuestas de cuestionario en salida clinica estructurada apta para frontend.'
              : 'OcularIA integrates an external API with Claude analysis to transform questionnaire answers into structured clinical output suitable for frontend consumption.'}
          </p>
          <p className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-slate-700 dark:text-slate-300">
            {isSpanish
              ? 'Se aplican validaciones en cliente, manejo de timeouts y control de errores para reducir fallos de integracion y evitar envios inconsistentes.'
              : 'Client-side validation, request timeouts, and strict error handling reduce integration failures and avoid inconsistent submissions.'}
          </p>
        </div>

        <div className="mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
          >
            {isSpanish ? 'Volver a proyectos' : 'Back to projects'}
          </Link>
        </div>
      </Section>
    </div>
  );
}
