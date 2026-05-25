import { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import { useLanguage } from '../../hooks/useLanguage';
import { evaluarOcularia, evaluarImpactoFactores, guardarFormulario, getOculariaSubmissionLimitState } from '../../services/ocularia.service';
import type { OculariaResponse, ImpactoFactoresResponse, FormularioCompleto } from '../../services/ocularia.service';

type Sexo = 'F' | 'M' | 'Otro';
type EstadoEvaluacion = 'idle' | 'loading' | 'success' | 'error';

interface PatientFormData {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  codigoPostal: string;
  sexo: Sexo;
}

interface FactorFormData {
  medicamentos: string[];
  antecedentesOculares: string[];
  cirugiaOcularPrevia: string[];
  factoresAmbientales: string[];
  factoresHormonales: string[];
  enfermedades: string[];
  otrosFactores: string;
}

type FactorArrayField = Exclude<keyof FactorFormData, 'otrosFactores'>;

const MEDICAMENTOS_OPTIONS = [
  'Antihistamínicos (Loratadina, Clorfenamina, Cetirizina, Levocetirizina, Desloratadina)',
  'Antidepresivos (Sertralina, Fluoxetina, Citalopram, Venlafaxina, Duloxetina)',
  'Antihipertensivos (Propanolol, Timolol, Enalapril, Amlodipino)',
  'Diuéticos (Hidroclorotiazida, Furosemida)',
  'Isotretinoina',
  'Quimioterapia',
  'Inmunoterapia',
  'Otros',
];

const ANTECEDENTES_OCULARES_OPTIONS = [
  'Uso de lentes de contacto',
  'Cirugía ocular previa',
  'Cáncer ocular',
  'Radiación en la cara / ojo',
];

const CIRUGIA_OCULAR_OPTIONS = ['LASIK', 'Catarata', 'Carnosidad'];

const FACTORES_AMBIENTALES_OPTIONS = [
  'Uso de pantallas más de 6 horas al día',
  'Exposición a aire acondicionado prolongada',
  'Tabaquismo',
  'Trabaja en ambientes secos, calientes o con exposición a viento',
];

const FACTORES_HORMONALES_OPTIONS = [
  'Menopausia',
  'Uso de anticonceptivos orales',
  'Terapia hormonal sustitutiva',
  'Embarazo',
];

const ENFERMEDADES_OPTIONS = [
  'Diabetes mellitus',
  'Artritis reumatoide',
  'Síndrome de Sjögren',
  'Lupus eritematoso sistémico',
  'Hipotiroidismo',
  'Enfermedad de Parkinson',
  'Rosácea',
  'Acné',
  'Otros',
];

const QUESTIONS_ES = [
  '¿Con qué frecuencia ha experimentado sensación de ardor, picazón o molestia en sus ojos?',
  '¿Ha notado visión borrosa o sensibilidad a la luz?',
  '¿Ha tenido dificultad para leer, usar computadora o realizar actividades que requieren visión sostenida?',
  '¿Sus síntomas oculares le han impedido sentirse cómodo en actividades como conducir o ver televisión?',
  '¿Sus ojos se sienten incómodos en ambientes con aire acondicionado, viento o lugares muy secos?',
  '¿Ha notado que sus síntomas oculares empeoran al estar expuesto a ambientes con humo o contaminación?',
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

// Color per frequency option (index = value)
const OPTION_STYLES = [
  {
    base: 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80',
    selected: 'border-slate-500 bg-slate-100 dark:bg-slate-700/60 dark:border-slate-400 text-slate-900 dark:text-white ring-2 ring-slate-300 dark:ring-slate-600',
    dot: 'bg-slate-400',
  },
  {
    base: 'border-sky-200 dark:border-sky-800/60 text-sky-700 dark:text-sky-300 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20',
    selected: 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 dark:border-sky-500 text-sky-900 dark:text-sky-200 ring-2 ring-sky-200 dark:ring-sky-800',
    dot: 'bg-sky-400',
  },
  {
    base: 'border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20',
    selected: 'border-amber-500 bg-amber-50 dark:bg-amber-900/30 dark:border-amber-500 text-amber-900 dark:text-amber-200 ring-2 ring-amber-200 dark:ring-amber-800',
    dot: 'bg-amber-400',
  },
  {
    base: 'border-orange-200 dark:border-orange-800/60 text-orange-700 dark:text-orange-300 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20',
    selected: 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 dark:border-orange-500 text-orange-900 dark:text-orange-200 ring-2 ring-orange-200 dark:ring-orange-800',
    dot: 'bg-orange-400',
  },
  {
    base: 'border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 hover:border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20',
    selected: 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 dark:border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-200 dark:ring-rose-800',
    dot: 'bg-rose-400',
  },
];

function CheckboxItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group py-1">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 transition-all flex items-center justify-center
        ${checked ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-cyan-400'}`}>
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className={`text-sm leading-snug transition-colors ${
        checked
          ? 'text-slate-900 dark:text-white font-medium'
          : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
      }`}>
        {label}
      </span>
    </label>
  );
}

function FactorSection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <svg
            className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-left">{title}</span>
        </div>
        {count > 0 && (
          <span className="ml-2 flex-shrink-0 text-xs font-bold px-1.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300">
            {count}
          </span>
        )}
      </button>
      {open && (
        <div className="px-4 pt-1.5 pb-3 border-t border-slate-100 dark:border-slate-700/40">
          {children}
        </div>
      )}
    </div>
  );
}

function getRiskStyles(riesgo: string): { badge: string; bar: string } {
  const r = riesgo.toLowerCase();
  if (r === 'alto' || r === 'high')
    return { badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800', bar: 'bg-rose-500' };
  if (r === 'medio' || r === 'medium' || r === 'moderate')
    return { badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800', bar: 'bg-amber-500' };
  return { badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800', bar: 'bg-emerald-500' };
}

function getTodayISODate(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getAgeFromBirthDate(birthDateISO: string): number | null {
  if (!birthDateISO) return null;
  const birthDate = new Date(`${birthDateISO}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

// Floating label input
function FloatingInput({
  id, name, type = 'text', value, onChange, label, disabled, required, min, max,
}: {
  id: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string; disabled: boolean; required?: boolean; min?: number | string; max?: number | string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        id={id} name={name} type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        required={required} disabled={disabled} min={min} max={max} autoComplete="off"
        className={`peer w-full px-4 pt-6 pb-2 rounded-xl border text-slate-900 dark:text-white bg-white dark:bg-slate-800/70 transition-all duration-200 outline-none
          ${active ? 'border-cyan-500 dark:border-cyan-400 shadow-[0_0_0_3px_rgba(6,182,212,0.12)]' : 'border-slate-200 dark:border-slate-700'}
          disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      <label htmlFor={id}
        className={`absolute left-4 font-medium pointer-events-none transition-all duration-200 select-none
          ${active ? 'top-2 text-xs text-cyan-500 dark:text-cyan-400' : 'top-4 text-sm text-slate-400 dark:text-slate-500'}`}
      >
        {label}
      </label>
    </div>
  );
}

// Score ring SVG
function ScoreRing({ score, max, riesgo }: { score: number; max: number; riesgo: string }) {
  const r = 45;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? score / max : 0;
  const offset = circ * (1 - pct);
  const riskStyles = getRiskStyles(riesgo);
  const strokeColor =
    riesgo.toLowerCase() === 'alto' || riesgo.toLowerCase() === 'high'
      ? '#f43f5e'
      : riesgo.toLowerCase() === 'medio' || riesgo.toLowerCase() === 'medium' || riesgo.toLowerCase() === 'moderate'
      ? '#f59e0b'
      : '#10b981';
  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-sm">
        <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="8"
          className="text-slate-100 dark:text-slate-700" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={strokeColor} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)' }} />
        <text x="50" y="46" textAnchor="middle" className="fill-slate-900 dark:fill-white"
          style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>
          {score}
        </text>
        <text x="50" y="60" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500"
          style={{ fontSize: 10, fontFamily: 'DM Sans, sans-serif' }}>
          / {max}
        </text>
      </svg>
      <span className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${riskStyles.badge}`}>
        {riesgo}
      </span>
    </div>
  );
}

// Main component
export default function OcularIA() {
  const { language } = useLanguage();
  const isSpanish = language === 'es';
  const questions = isSpanish ? QUESTIONS_ES : QUESTIONS_EN;
  const TOTAL_STEPS = questions.length + 3; // step 0 = patient, 1-6 = questions, 7 = factors, 8 = review

  const [wizardStep, setWizardStep] = useState(0);
  const [formData, setFormData] = useState<PatientFormData>({ nombre: '', apellidos: '', fechaNacimiento: '', codigoPostal: '', sexo: 'F' });
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [status, setStatus] = useState<EstadoEvaluacion>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState<OculariaResponse | null>(null);
  const [submissionLimit, setSubmissionLimit] = useState(() => getOculariaSubmissionLimitState());
  const lastSubmitRef = useRef<number>(0);
  const SUBMIT_COOLDOWN_MS = 15_000;

  const [factorData, setFactorData] = useState<FactorFormData>({
    medicamentos: [], antecedentesOculares: [], cirugiaOcularPrevia: [],
    factoresAmbientales: [], factoresHormonales: [], enfermedades: [], otrosFactores: '',
  });
  const [factorImpact, setFactorImpact] = useState<ImpactoFactoresResponse | null>(null);
  const [factoresConsentidos, setFactoresConsentidos] = useState(false);

  const toggleFactor = (field: FactorArrayField, value: string) => {
    setFactorData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  const unansweredCount = useMemo(() => answers.filter((v) => v < 0).length, [answers]);
  const answeredCount = questions.length - unansweredCount;
  const hasAnyFactor = [
    factorData.medicamentos, factorData.antecedentesOculares, factorData.cirugiaOcularPrevia,
    factorData.factoresAmbientales, factorData.factoresHormonales, factorData.enfermedades,
  ].some(a => a.length > 0) || factorData.otrosFactores.trim().length > 0;

  const handleOtherFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFactorData(prev => ({ ...prev, otrosFactores: e.target.value }));
  };

  const seo = isSpanish
    ? { title: 'OcularIA: evaluador de ojo seco con IA', description: 'Cuestionario digital de 6 preguntas que analiza sintomas de ojo seco con IA y devuelve riesgo clinico orientativo y recomendaciones.' }
    : { title: 'OcularIA: AI-powered dry eye evaluator', description: '6-question digital questionnaire that analyzes dry-eye symptoms with AI and returns indicative risk and recommendations.' };

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (questionIndex: number, score: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[questionIndex] = score;
      return next;
    });
    // Auto-advance after short delay
    setTimeout(() => {
      if (questionIndex + 1 < questions.length) {
        setWizardStep(questionIndex + 2); // step 1-6 maps to questionIndex 0-5
      } else {
        setWizardStep(questions.length + 1); // factors step
      }
    }, 380);
  };

  const handleSubmit = useCallback(async () => {
    const currentLimit = getOculariaSubmissionLimitState();
    setSubmissionLimit(currentLimit);
    if (currentLimit.blocked) {
      setStatus('error');
      setErrorMessage(isSpanish
        ? `Se alcanzo el limite global de ${currentLimit.max} cuestionarios para esta version.`
        : `The global limit of ${currentLimit.max} questionnaires has been reached for this version.`);
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      const secsLeft = Math.ceil((SUBMIT_COOLDOWN_MS - (now - lastSubmitRef.current)) / 1000);
      setStatus('error');
      setErrorMessage(isSpanish
        ? `Por favor espera ${secsLeft} segundo(s) antes de volver a evaluar.`
        : `Please wait ${secsLeft} second(s) before evaluating again.`);
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setResult(null);
    lastSubmitRef.current = now;

    const edad = getAgeFromBirthDate(formData.fechaNacimiento);
    if (!formData.nombre.trim() || !formData.apellidos.trim() || !formData.fechaNacimiento || !formData.codigoPostal.trim() || edad === null || !Number.isInteger(edad)) {
      setStatus('error');
      setErrorMessage(isSpanish
        ? 'Completa nombre, apellidos, fecha de nacimiento y código postal válidos.'
        : 'Please complete first name, last name, valid birth date and postal code.');
      return;
    }
    if (edad < 1 || edad > 120) {
      setStatus('error');
      setErrorMessage(isSpanish
        ? 'La fecha de nacimiento debe corresponder a una edad entre 1 y 120 años.'
        : 'Birth date must correspond to an age between 1 and 120 years.');
      return;
    }
    if (unansweredCount > 0) {
      setStatus('error');
      setErrorMessage(isSpanish ? `Aun faltan ${unansweredCount} pregunta(s) por responder.` : `${unansweredCount} question(s) are still unanswered.`);
      return;
    }

    try {
      const apiResponse = await evaluarOcularia({
        nombre: formData.nombre, apellidos: formData.apellidos, edad,
        sexo: formData.sexo, fecha: getTodayISODate(), respuestas: answers,
        fecha_nacimiento: formData.fechaNacimiento,
        codigo_postal: formData.codigoPostal.trim() || undefined,
      });
      let impactResponse: ImpactoFactoresResponse | null = null;
      const hasFactorsForApi = [
        factorData.medicamentos, factorData.antecedentesOculares, factorData.cirugiaOcularPrevia,
        factorData.factoresAmbientales, factorData.factoresHormonales, factorData.enfermedades,
      ].some(a => a.length > 0) || factorData.otrosFactores.trim().length > 0;
      if (hasFactorsForApi) {
        try {
          impactResponse = await evaluarImpactoFactores({
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            edad,
            sexo: formData.sexo,
            respuestas: answers,
            ...(factorData.medicamentos.length ? { medicamentos: factorData.medicamentos } : {}),
            ...(factorData.factoresHormonales.length ? { factores_hormonales: factorData.factoresHormonales } : {}),
            ...(factorData.factoresAmbientales.length ? { factores_ambientales: factorData.factoresAmbientales } : {}),
            ...(factorData.enfermedades.length ? { enfermedades: factorData.enfermedades } : {}),
            ...(factorData.antecedentesOculares.length ? { antecedentes_oculares: factorData.antecedentesOculares } : {}),
            ...(factorData.cirugiaOcularPrevia.length ? { cirugia_ocular: factorData.cirugiaOcularPrevia } : {}),
            ...(factorData.otrosFactores.trim().length ? { otros_factores: factorData.otrosFactores.trim() } : {}),
          });
        } catch {
          // El análisis de factores es suplementario; ignoramos fallos silenciosamente.
        }
      }

      // Guardar formulario completo en PostgreSQL de forma asincrónica (sin bloquear resultado)
      const formularioCompleto: FormularioCompleto = {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        fecha_nacimiento: formData.fechaNacimiento,
        codigo_postal: formData.codigoPostal.trim() || undefined,
        sexo: formData.sexo,
        respuestas: answers,
        ...(factorData.medicamentos.length ? { medicamentos: factorData.medicamentos } : {}),
        ...(factorData.factoresHormonales.length ? { factores_hormonales: factorData.factoresHormonales } : {}),
        ...(factorData.factoresAmbientales.length ? { factores_ambientales: factorData.factoresAmbientales } : {}),
        ...(factorData.enfermedades.length ? { enfermedades: factorData.enfermedades } : {}),
        ...(factorData.antecedentesOculares.length ? { antecedentes_oculares: factorData.antecedentesOculares } : {}),
        ...(factorData.cirugiaOcularPrevia.length ? { cirugia_ocular_previa: factorData.cirugiaOcularPrevia } : {}),
        ...(factorData.otrosFactores.trim().length ? { otros_factores: factorData.otrosFactores.trim() } : {}),
        fecha_completado: getTodayISODate(),
      };
      // Fire and forget - no esperamos respuesta
      guardarFormulario(formularioCompleto).catch(() => {
        // Error ya logueado en guardarFormulario
      });

      setResult(apiResponse);
      if (impactResponse) setFactorImpact(impactResponse);
      setStatus('success');
      setSubmissionLimit(getOculariaSubmissionLimitState());
    } catch (error) {
      setSubmissionLimit(getOculariaSubmissionLimitState());
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : isSpanish ? 'No se pudo completar la evaluacion.' : 'The evaluation could not be completed.');
    }
  }, [formData, answers, unansweredCount, isSpanish, SUBMIT_COOLDOWN_MS, factorData]);

  const resetAll = () => {
    setFormData({ nombre: '', apellidos: '', fechaNacimiento: '', codigoPostal: '', sexo: 'F' });
    setAnswers(Array(questions.length).fill(-1));
    setFactorData({ medicamentos: [], antecedentesOculares: [], cirugiaOcularPrevia: [], factoresAmbientales: [], factoresHormonales: [], enfermedades: [], otrosFactores: '' });
    setFactoresConsentidos(false);
    setStatus('idle');
    setErrorMessage('');
    setResult(null);
    setFactorImpact(null);
    setWizardStep(0);
  };

  // Current question index (for step 1..6)
  const questionIndex = wizardStep - 1;
  const currentAnswer = questionIndex >= 0 && questionIndex < questions.length ? answers[questionIndex] : -1;

  // Patient info validation for step 0 "continue"
  const patientValid =
    formData.nombre.trim().length > 0 &&
    formData.apellidos.trim().length > 0 &&
    formData.fechaNacimiento.length > 0 &&
    formData.codigoPostal.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Seo
        title={seo.title} description={seo.description} path="/projects/ocularia"
        language={language} image="/portadaweb.png"
        imageAlt={isSpanish ? 'Proyecto OcularIA con cuestionario de ojo seco' : 'OcularIA project with dry-eye questionnaire'}
        type="article"
      />

      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-400/15 dark:bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-400/15 dark:bg-emerald-500/10 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 lg:py-28">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-cyan-600 dark:text-cyan-400 mb-5">
            <span className="w-6 h-px bg-cyan-500 dark:bg-cyan-400" />
            OcularIA
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-[1.05] mb-5">
            {isSpanish ? (
              <>Evaluador de<br /><span className="text-cyan-600 dark:text-cyan-400">ojo seco con IA</span></>
            ) : (
              <>Dry-eye evaluator<br /><span className="text-cyan-600 dark:text-cyan-400">powered by AI</span></>
            )}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            {isSpanish
              ? 'Cuestionario de 6 preguntas. Análisis clínico orientativo generado por IA en segundos.'
              : '6-question clinical questionnaire. AI-generated indicative analysis in seconds.'}
          </p>
        </div>
      </div>

      {/* Wizard content */}
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">

        {/* Results (success) */}
        {status === 'success' && result ? (
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                {isSpanish ? 'Resultado de OcularIA' : 'OcularIA Result'}
              </h2>
              <button onClick={resetAll}
                className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                {isSpanish ? '← Nueva evaluación' : '← New evaluation'}
              </button>
            </div>

            <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
              {/* Score ring + risk */}
              <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40 p-8 flex flex-col items-center gap-4 min-w-[200px]">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {isSpanish ? 'Puntuación' : 'Score'}
                </p>
                <ScoreRing
                  score={result.resultado.puntuacion.total}
                  max={result.resultado.puntuacion.maximo}
                  riesgo={result.resultado.riesgo}
                />
                <div className="w-full pt-2 border-t border-slate-100 dark:border-slate-700 space-y-2">
                  {result.resultado.puntuacion.porPregunta.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500 w-6 shrink-0">P{i + 1}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700">
                        <div className="h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 transition-all duration-700"
                          style={{ width: `${(s / 4) * 100}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-4 text-right">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnosis + classification */}
              <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40 p-8 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    {isSpanish ? 'Clasificación' : 'Classification'}
                  </p>
                  <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {result.resultado.clasificacion.nivel}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{result.resultado.clasificacion.descripcion}</p>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    {isSpanish ? 'Diagnóstico orientativo' : 'Indicative diagnosis'}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{result.resultado.diagnostico}</p>
                </div>
              </div>
            </div>

            {/* Tratamiento final — sección protagonista */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-200 dark:border-cyan-700/60 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-emerald-900/20 shadow-xl shadow-cyan-200/30 dark:shadow-cyan-900/20 p-8">
              {/* Decorative blobs */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-cyan-300/20 dark:bg-cyan-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-emerald-300/20 dark:bg-emerald-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-9 h-9 rounded-2xl bg-cyan-500 dark:bg-cyan-600 shadow-lg shadow-cyan-500/30">
                    <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                      {isSpanish ? 'Plan de tratamiento' : 'Treatment plan'}
                    </p>
                    <p className="text-lg font-display font-bold text-slate-900 dark:text-white leading-tight">
                      {isSpanish ? 'Recomendaciones clínicas' : 'Clinical recommendations'}
                    </p>
                  </div>
                </div>

                <ol className="space-y-3">
                  {result.resultado.recomendaciones.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-white dark:border-slate-700/50 shadow-sm">
                      <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 border border-cyan-200 dark:border-cyan-700/50 flex items-center justify-center text-xs font-bold text-cyan-700 dark:text-cyan-300 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed flex-1">{rec}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {factorImpact && (
              <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-amber-200 dark:border-amber-700/50 shadow-lg shadow-slate-200/40 dark:shadow-slate-900/40 p-8">
                <div className="flex items-center gap-2.5 mb-3">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    {isSpanish ? 'Impacto de factores adicionales' : 'Additional factors impact'}
                  </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{factorImpact.resumen}</p>
              </div>
            )}

            <p className="text-xs text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
              {isSpanish
                ? 'Aviso: este resultado es orientativo y no sustituye una valoracion medica profesional.'
                : 'Notice: this result is indicative and does not replace a professional medical evaluation.'}
            </p>
          </div>

        ) : (
          /* Wizard */
          <div className="max-w-2xl mx-auto">

            {/* Progress bar */}
            {wizardStep > 0 && wizardStep < TOTAL_STEPS - 1 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {isSpanish ? `Pregunta ${wizardStep} de ${questions.length}` : `Question ${wizardStep} of ${questions.length}`}
                  </span>
                  <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    {answeredCount}/{questions.length}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 transition-all duration-500"
                    style={{ width: `${((wizardStep - 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error banner */}
            {status === 'error' && (
              <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-sm animate-fade-in-up">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMessage}
              </div>
            )}

            {/* Step 0: Patient data */}
            {wizardStep === 0 && (
              <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 p-8 animate-fade-in-up">
                <div className="mb-7">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-cyan-600 dark:text-cyan-400 mb-3">
                    <span className="w-4 h-px bg-cyan-500" />
                    {isSpanish ? 'Paso 1 de 4' : 'Step 1 of 4'}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {isSpanish ? 'Datos del paciente' : 'Patient information'}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {isSpanish ? 'Solo se usan para personalizar el análisis. No se almacenan.' : 'Used only to personalise the analysis. Not stored persistently.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput id="nombre" name="nombre" value={formData.nombre}
                      onChange={handlePatientChange} label={isSpanish ? 'Nombre' : 'First name'} disabled={false} required />
                    <FloatingInput id="apellidos" name="apellidos" value={formData.apellidos}
                      onChange={handlePatientChange} label={isSpanish ? 'Apellidos' : 'Last name'} disabled={false} required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput id="fechaNacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento}
                      onChange={handlePatientChange} label={isSpanish ? 'Fecha de nacimiento' : 'Birth date'} disabled={false} required max={getTodayISODate()} />
                    <FloatingInput id="codigoPostal" name="codigoPostal" value={formData.codigoPostal}
                      onChange={handlePatientChange} label={isSpanish ? 'Código postal' : 'Postal code'} disabled={false} required />
                  </div>

                  {/* Gender segmented control */}
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                      {isSpanish ? 'Sexo' : 'Sex'}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {(['F', 'M', 'Otro'] as Sexo[]).map((opt) => (
                        <button key={opt} type="button"
                          onClick={() => setFormData(prev => ({ ...prev, sexo: opt }))}
                          className={`py-2.5 rounded-xl border text-sm font-medium transition-all duration-200
                            ${formData.sexo === opt
                              ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 ring-2 ring-cyan-200 dark:ring-cyan-800'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'}`}
                        >
                          {opt === 'F' ? (isSpanish ? 'Femenino' : 'Female') : opt === 'M' ? (isSpanish ? 'Masculino' : 'Male') : (isSpanish ? 'Otro' : 'Other')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={!patientValid}
                    onClick={() => setWizardStep(1)}
                    className="group mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:shadow-none"
                  >
                    {isSpanish ? 'Continuar' : 'Continue'}
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Steps 1-6: Questions */}
            {wizardStep >= 1 && wizardStep <= questions.length && (
              <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 p-8 animate-fade-in-up" key={`q-${wizardStep}`}>
                <div className="mb-7">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-cyan-600 dark:text-cyan-400 mb-3">
                    <span className="w-4 h-px bg-cyan-500" />
                    {isSpanish ? `Paso 2 de 4 · Pregunta ${wizardStep}` : `Step 2 of 4 · Question ${wizardStep}`}
                  </span>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {questions[questionIndex]}
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {ANSWER_OPTIONS.map((opt) => {
                    const styles = OPTION_STYLES[opt.value];
                    const isSelected = currentAnswer === opt.value;
                    return (
                      <button key={opt.value} type="button"
                        onClick={() => handleAnswerChange(questionIndex, opt.value)}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border text-left transition-all duration-200 ${isSelected ? styles.selected : styles.base}`}
                      >
                        <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                        <span className="flex-1 text-sm font-medium">{isSpanish ? opt.es : opt.en}</span>
                        {isSelected && (
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setWizardStep(s => s - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    {isSpanish ? 'Anterior' : 'Back'}
                  </button>
                  {currentAnswer >= 0 && (
                    <button type="button"
                      onClick={() => setWizardStep(s => s < questions.length ? s + 1 : questions.length + 1)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 transition-all duration-200">
                      {isSpanish ? 'Siguiente' : 'Next'}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Step 7: Factores adicionales */}
            {wizardStep === questions.length + 1 && (
              <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 p-8 animate-fade-in-up">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-cyan-600 dark:text-cyan-400">
                      <span className="w-4 h-px bg-cyan-500" />
                      {isSpanish ? 'Paso 3 de 4 · Factores' : 'Step 3 of 4 · Factors'}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                      {isSpanish ? 'Opcional' : 'Optional'}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {isSpanish ? 'Factores adicionales' : 'Additional factors'}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {isSpanish
                      ? 'Expande las secciones que apliquen. Permiten un análisis más personalizado.'
                      : 'Expand the sections that apply. They enable a more personalised analysis.'}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <FactorSection
                    title={isSpanish ? 'Medicamentos' : 'Medications'}
                    count={factorData.medicamentos.length}
                  >
                    {MEDICAMENTOS_OPTIONS.map(opt => (
                      <CheckboxItem key={opt} label={opt}
                        checked={factorData.medicamentos.includes(opt)}
                        onChange={() => toggleFactor('medicamentos', opt)} />
                    ))}
                  </FactorSection>

                  <FactorSection
                    title={isSpanish ? 'Antecedentes oculares' : 'Ocular history'}
                    count={factorData.antecedentesOculares.length + factorData.cirugiaOcularPrevia.length}
                  >
                    {ANTECEDENTES_OCULARES_OPTIONS.map(opt => (
                      <CheckboxItem key={opt} label={opt}
                        checked={factorData.antecedentesOculares.includes(opt)}
                        onChange={() => toggleFactor('antecedentesOculares', opt)} />
                    ))}
                    {factorData.antecedentesOculares.includes('Cirugía ocular previa') && (
                      <div className="ml-4 mt-2 pl-3 border-l-2 border-cyan-200 dark:border-cyan-800/50">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                          {isSpanish ? 'Tipo de cirugía' : 'Surgery type'}
                        </p>
                        {CIRUGIA_OCULAR_OPTIONS.map(opt => (
                          <CheckboxItem key={opt} label={opt}
                            checked={factorData.cirugiaOcularPrevia.includes(opt)}
                            onChange={() => toggleFactor('cirugiaOcularPrevia', opt)} />
                        ))}
                      </div>
                    )}
                  </FactorSection>

                  <FactorSection
                    title={isSpanish ? 'Factores ambientales y estilo de vida' : 'Environmental & lifestyle factors'}
                    count={factorData.factoresAmbientales.length}
                  >
                    {FACTORES_AMBIENTALES_OPTIONS.map(opt => (
                      <CheckboxItem key={opt} label={opt}
                        checked={factorData.factoresAmbientales.includes(opt)}
                        onChange={() => toggleFactor('factoresAmbientales', opt)} />
                    ))}
                  </FactorSection>

                  <FactorSection
                    title={isSpanish ? 'Factores hormonales' : 'Hormonal factors'}
                    count={factorData.factoresHormonales.length}
                  >
                    {FACTORES_HORMONALES_OPTIONS.map(opt => (
                      <CheckboxItem key={opt} label={opt}
                        checked={factorData.factoresHormonales.includes(opt)}
                        onChange={() => toggleFactor('factoresHormonales', opt)} />
                    ))}
                  </FactorSection>

                  <FactorSection
                    title={isSpanish ? 'Enfermedades sistémicas' : 'Systemic diseases'}
                    count={factorData.enfermedades.length}
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {ENFERMEDADES_OPTIONS.map(opt => (
                        <CheckboxItem key={opt} label={opt}
                          checked={factorData.enfermedades.includes(opt)}
                          onChange={() => toggleFactor('enfermedades', opt)} />
                      ))}
                    </div>
                  </FactorSection>

                  <div className="pt-1">
                    <FloatingInput
                      id="otrosFactores"
                      name="otrosFactores"
                      value={factorData.otrosFactores}
                      onChange={handleOtherFactorChange}
                      label={isSpanish ? 'Otros (especificar)' : 'Other (specify)'}
                      disabled={false}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setWizardStep(s => s - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    {isSpanish ? 'Anterior' : 'Back'}
                  </button>
                  <button type="button" onClick={() => setWizardStep(TOTAL_STEPS - 1)} disabled={!factoresConsentidos}
                    className="group flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:shadow-none">
                    {isSpanish ? 'Continuar' : 'Continue'}
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50">
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={factoresConsentidos}
                      onChange={() => setFactoresConsentidos(prev => !prev)}
                      className="sr-only"
                    />
                    <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 transition-all flex items-center justify-center
                      ${factoresConsentidos ? 'border-cyan-500 bg-cyan-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-cyan-400'}`}>
                      {factoresConsentidos && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm leading-snug text-slate-600 dark:text-slate-300">
                      {isSpanish
                        ? 'Entiendo y quiero continuar. Acepto que la información ingresada se usa para este análisis orientativo y no reemplaza una valoración médica profesional.'
                        : 'I understand and want to continue. I accept that the information entered is used for this indicative analysis and does not replace a professional medical evaluation.'}
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 8: Review + submit */}
            {wizardStep === TOTAL_STEPS - 1 && (
              <div className="bg-white dark:bg-slate-800/60 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 p-8 animate-fade-in-up">
                <div className="mb-7">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-cyan-600 dark:text-cyan-400 mb-3">
                    <span className="w-4 h-px bg-cyan-500" />
                    {isSpanish ? 'Paso 4 de 4 · Revisión' : 'Step 4 of 4 · Review'}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {isSpanish ? 'Revisa tu cuestionario' : 'Review your questionnaire'}
                  </h2>
                </div>

                {/* Patient summary */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/50">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    {isSpanish ? 'Paciente' : 'Patient'}
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    {formData.nombre} {formData.apellidos} · {formData.fechaNacimiento} · {formData.codigoPostal} · {formData.sexo === 'F' ? (isSpanish ? 'Femenino' : 'Female') : formData.sexo === 'M' ? (isSpanish ? 'Masculino' : 'Male') : (isSpanish ? 'Otro' : 'Other')}
                  </p>
                </div>

                {/* Answers summary */}
                <div className="space-y-2 mb-6">
                  {questions.map((q, i) => {
                    const ans = answers[i];
                    const opt = ANSWER_OPTIONS.find(o => o.value === ans);
                    const styles = ans >= 0 ? OPTION_STYLES[ans] : null;
                    return (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">{i + 1}</span>
                        <p className="flex-1 text-sm text-slate-600 dark:text-slate-400 leading-snug">{q}</p>
                        {opt && styles ? (
                          <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border ${styles.selected}`}>
                            {isSpanish ? opt.es : opt.en}
                          </span>
                        ) : (
                          <span className="flex-shrink-0 text-xs font-medium text-red-500 px-2.5 py-1">
                            {isSpanish ? 'Sin responder' : 'Unanswered'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Privacy notice */}
                {hasAnyFactor && (
                  <div className="mb-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/50">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                      {isSpanish ? 'Factores seleccionados' : 'Selected factors'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        ...factorData.medicamentos,
                        ...factorData.antecedentesOculares,
                        ...factorData.cirugiaOcularPrevia,
                        ...factorData.factoresAmbientales,
                        ...factorData.factoresHormonales,
                        ...factorData.enfermedades,
                        ...(factorData.otrosFactores.trim().length ? [factorData.otrosFactores.trim()] : []),
                      ].map((f, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-800/40">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-6">
                  {isSpanish
                    ? 'Los datos que introduces se envian de forma segura a un servidor externo para generar el analisis clinico. No se almacenan de forma persistente.'
                    : 'The details you enter are sent securely to an external server to generate the clinical analysis. They are not stored persistently.'}
                </p>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setWizardStep(s => s - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    {isSpanish ? 'Anterior' : 'Back'}
                  </button>

                  <button
                    disabled={status === 'loading' || submissionLimit.blocked || unansweredCount > 0}
                    onClick={handleSubmit}
                    className="group flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:shadow-none"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {isSpanish ? 'Evaluando...' : 'Evaluating...'}
                      </>
                    ) : submissionLimit.blocked ? (
                      isSpanish ? 'Límite alcanzado' : 'Limit reached'
                    ) : (
                      <>
                        {isSpanish ? 'Evaluar cuestionario' : 'Evaluate questionnaire'}
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Project details */}
        <div className="max-w-2xl mx-auto mt-16 space-y-4">
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            {isSpanish ? 'Detalle del proyecto' : 'Project details'}
          </h3>
          <div className="space-y-3">
            <p className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 p-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isSpanish
                ? 'OcularIA integra una API externa con analisis de Claude para transformar respuestas de cuestionario en salida clinica estructurada apta para frontend.'
                : 'OcularIA integrates an external API with Claude analysis to transform questionnaire answers into structured clinical output suitable for frontend consumption.'}
            </p>
            <p className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 p-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isSpanish
                ? 'Se aplican validaciones en cliente, manejo de timeouts y control de errores para reducir fallos de integracion y evitar envios inconsistentes.'
                : 'Client-side validation, request timeouts, and strict error handling reduce integration failures and avoid inconsistent submissions.'}
            </p>
          </div>
          <div className="pt-2">
            <Link to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
              {isSpanish ? '← Volver a proyectos' : '← Back to projects'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
