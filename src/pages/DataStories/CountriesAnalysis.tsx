import { useState } from 'react';
import Seo from '../../components/Seo';
import { NotebookViewer } from '../../components/NotebookViewer';
import { 
  StatCard, 
  InsightCard, 
  DataTable, 
  CodeBlock 
} from '../../components/DataStoryComponents';
import {
  InteractiveScatterPlot,
  CorrelationHeatmap,
  AnimatedBarChart,
  WorldMap
} from '../../components/InteractiveCharts';
import {
  MetricCard,
  ChartContainer,
  InsightBanner
} from '../../components/ModernChartUI';
import {
  quantitativeVariables,
  correlations,
  contingencyTests,
  datasetInfo,
  regionStats,
  keyFindings,
  notebookResources,
  scatterPlotData,
  correlationMatrix,
  correlationVariables,
  regionChartData,
  worldMapData
} from '../../data/countriesAnalysisData';
import { BookOpen, Globe, BarChart3, Activity, Target, Zap, TrendingUp } from 'lucide-react';

export default function CountriesAnalysis() {
  const [activeTab, setActiveTab] = useState<'story' | 'graphics' | 'notebook'>('story');

  return (
    <>
      <Seo
        title="Análisis de Datos - Countries of the World | José Gellida"
        description="Análisis exploratorio de datos de 227 países del mundo. Explora patrones de desarrollo económico, educación y tecnología con visualizaciones interactivas y código Python."
        keywords="Data Science, EDA, Python, Análisis de Datos, Economía Global, Visualización de Datos"
        canonical="https://josegellida.com/data-stories/countries-analysis"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex items-start gap-3 mb-6">
              <Globe className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm uppercase tracking-widest text-blue-400 font-semibold">Análisis Exploratorio de Datos</div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 leading-tight">
                  Desigualdad Global: Lo que 227 países revelan sobre economía y desarrollo
                </h1>
              </div>
            </div>
            <p className="text-lg text-slate-300 max-w-3xl">
              Un viaje de descubrimiento a través de datos económicos, demográficos y sociales que muestran 
              las verdades incómodas de nuestro mundo desigual.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                📊 227 países
              </span>
              <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                🔬 19 variables
              </span>
              <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                📅 Dataset 2008
              </span>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="sticky top-16 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('story')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'story'
                    ? 'text-blue-400 border-blue-400'
                    : 'text-slate-400 border-transparent hover:text-slate-300'
                }`}
              >
                📖 Data Story
              </button>
              <button
                onClick={() => setActiveTab('graphics')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'graphics'
                    ? 'text-blue-400 border-blue-400'
                    : 'text-slate-400 border-transparent hover:text-slate-300'
                }`}
              >
                ✨ Gráficas Interactivas
              </button>
              <button
                onClick={() => setActiveTab('notebook')}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'notebook'
                    ? 'text-blue-400 border-blue-400'
                    : 'text-slate-400 border-transparent hover:text-slate-300'
                }`}
              >
                <BookOpen className="w-5 h-5 inline-block mr-2" />
                Notebook Completo
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            {activeTab === 'story' ? (
              <div className="space-y-16">
                {/* Sección 1: Contexto */}
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-400 pl-6">
                    <h2 className="text-3xl font-bold text-white mb-2">1. El Contexto: Conociendo los Datos</h2>
                    <p className="text-slate-300">
                      Nuestro análisis comienza con un dataset de Kaggle que agrupa información de 227 países. 
                      Es un corte histórico (2008) pero contiene patrones que siguen siendo relevantes hoy.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                      title="Países Analizados"
                      value={datasetInfo.totalCountries}
                      description="Cobertura global completa"
                      icon={<Globe className="w-5 h-5" />}
                      highlight
                    />
                    <StatCard
                      title="Variables"
                      value={datasetInfo.totalVariables}
                      description="Económicas, demográficas, sociales"
                      icon={<BarChart3 className="w-5 h-5" />}
                    />
                    <StatCard
                      title="Año del Dataset"
                      value={datasetInfo.year}
                      description="Corte histórico de referencia"
                    />
                    <StatCard
                      title="Variables Analizadas"
                      value="5 principales"
                      description="Cuantitativas y sus relaciones"
                    />
                  </div>
                </div>

                {/* Sección 2: Variables clave */}
                <div className="space-y-6">
                  <div className="border-l-4 border-green-400 pl-6">
                    <h2 className="text-3xl font-bold text-white mb-2">2. Cinco Variables bajo el Microscopio</h2>
                    <p className="text-slate-300">
                      Examinamos a fondo los indicadores clave que definen la desigualdad global.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {quantitativeVariables.map((variable, idx) => (
                      <div key={idx} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-4">{variable.label}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-slate-400">Media</div>
                            <div className="text-2xl font-bold text-white">
                              {variable.mean?.toFixed(1) ?? 'N/A'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Mediana</div>
                            <div className="text-2xl font-bold text-white">
                              {variable.median?.toFixed(1) ?? 'N/A'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Desv. Std</div>
                            <div className="text-2xl font-bold text-white">
                              {variable.std?.toFixed(1) ?? 'N/A'}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Rango</div>
                            <div className="text-2xl font-bold text-white">
                              {variable.range?.toFixed(0) ?? 'N/A'}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                          Mín: {variable.min?.toFixed(1)} | Máx: {variable.max?.toFixed(1)}
                        </p>
                        <div className="bg-red-900/20 border border-red-700/50 rounded p-3">
                          <p className="text-sm text-slate-200">
                            <strong>⚠️ No es normal:</strong> Shapiro-Wilk p={variable.shapiroWilk?.pValue.toFixed(4)}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Implicación: Usar métodos robustos o transformaciones logarítmicas en futuros modelos.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sección 3: Patrones ocultos */}
                <div className="space-y-6">
                  <div className="border-l-4 border-orange-400 pl-6">
                    <h2 className="text-3xl font-bold text-white mb-2">3. Patrones Ocultos: Las Correlaciones Revelan la Verdad</h2>
                    <p className="text-slate-300">
                      Cuando relacionamos variables económicas, emergen patrones sorprendentes sobre cómo funciona el mundo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {correlations.map((corr, idx) => (
                      <div key={idx} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                              {corr.label1} ↔ {corr.label2}
                            </h3>
                            <p className="text-slate-300">{corr.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-green-400">r = {corr.pearson.r.toFixed(3)}</div>
                            <div className="text-xs text-slate-400">p &lt; 0.001</div>
                          </div>
                        </div>

                        <CodeBlock
                          language="python"
                          code={`# Cálculo de correlación de Pearson
r, p_value = stats.pearsonr(df['${corr.var1}'], df['${corr.var2}'])
print(f'r = {r:.3f}, p-valor = {p_value:.6f}')`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sección 4: Asociaciones categóricas */}
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-400 pl-6">
                    <h2 className="text-3xl font-bold text-white mb-2">4. Asociaciones Categóricas: Región vs Desarrollo</h2>
                    <p className="text-slate-300">
                      La geografía y el desarrollo no son independientes. Pruebas chi-cuadrado revelan asociaciones fuertes.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {contingencyTests.map((test, idx) => (
                      <div key={idx} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-4">
                          {test.var1} × {test.var2}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-slate-700/50 rounded p-3">
                            <div className="text-sm text-slate-400">Chi-cuadrado</div>
                            <div className="text-2xl font-bold text-white">{test.chi2.toFixed(2)}</div>
                          </div>
                          <div className="bg-slate-700/50 rounded p-3">
                            <div className="text-sm text-slate-400">p-valor</div>
                            <div className="text-2xl font-bold text-green-400">&lt;0.001</div>
                          </div>
                          <div className="bg-slate-700/50 rounded p-3">
                            <div className="text-sm text-slate-400">Coef. Contingencia</div>
                            <div className="text-2xl font-bold text-white">{test.contingency.toFixed(3)}</div>
                          </div>
                          <div className="bg-slate-700/50 rounded p-3">
                            <div className="text-sm text-slate-400">Cramér's V</div>
                            <div className="text-2xl font-bold text-blue-400">{test.cramersV.toFixed(3)}</div>
                          </div>
                        </div>
                        {test.significant && (
                          <div className="bg-green-900/20 border border-green-700/50 rounded p-3">
                            <p className="text-sm text-slate-200">
                              ✓ <strong>Asociación significativa:</strong> Las variables están relacionadas.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sección 5: Hallazgos clave */}
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-6">
                    <h2 className="text-3xl font-bold text-white mb-2">5. Los 5 Hallazgos Más Importantes</h2>
                    <p className="text-slate-300">
                      Síntesis de descubrimientos con evidencia numérica sólida.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {keyFindings.map((finding, idx) => (
                      <InsightCard
                        key={idx}
                        title={finding.title}
                        metric={finding.metric}
                        description={finding.description}
                        type={finding.type as any}
                      />
                    ))}
                  </div>
                </div>

                {/* Sección 6: Estadísticas por región */}
                <div className="space-y-6">
                  <div className="border-l-4 border-yellow-400 pl-6">
                    <h2 className="text-3xl font-bold text-white mb-2">6. El Mundo por Regiones</h2>
                    <p className="text-slate-300">
                      Visión agregada del desarrollo económico por región geográfica.
                    </p>
                  </div>

                  <DataTable
                    title="Estadísticas por Región"
                    headers={['Región', 'Países', 'GDP Promedio', 'Nivel de Desarrollo']}
                    rows={regionStats.map(r => [r.region, r.countries, `$${r.avgGDP.toLocaleString()}`, r.devIndex])}
                  />
                </div>

                {/* Conclusiones */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-8 border border-blue-700/50">
                  <h2 className="text-2xl font-bold text-white mb-4">Conclusiones</h2>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>La tecnología sigue siendo un indicador de riqueza. GDP y acceso a teléfonos correlacionan fuertemente (r=0.83).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>El desarrollo reduce la mortalidad infantil. Diferencias estructurales muy significativas entre países (p&lt;0.001).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>La geografía importa. Región geográfica predice nivel de desarrollo (Cramér's V = 0.619).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>Capital humano y riqueza están conectados. Mayor educación ↔ Mayor GDP (r=0.77).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>Los datos son altamente asimétricos. Mediana es mejor indicador que media para GDP.</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : activeTab === 'graphics' ? (
              // Tab: Gráficas Interactivas
              <div className="space-y-12">
                {/* Header */}
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-400 pl-6">
                    <h2 className="text-4xl font-bold text-white mb-3">Gráficas Interactivas</h2>
                    <p className="text-lg text-slate-300 max-w-3xl">
                      Visualizaciones modernas que revelan los patrones ocultos en los datos. 
                      Explora correlaciones, distribuciones y tendencias globales de manera interactiva.
                    </p>
                  </div>

                  {/* Métricas clave */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                      icon={<TrendingUp className="w-6 h-6" />}
                      title="GDP ↔ Tecnología"
                      value="0.83"
                      subtitle="Correlación más fuerte del análisis"
                      gradient="from-green-600/40 to-green-400/20"
                      highlight
                    />
                    <MetricCard
                      icon={<Activity className="w-6 h-6" />}
                      title="Mortalidad Infantil"
                      value="-0.75"
                      subtitle="Inversamente proporcional a GDP"
                      gradient="from-orange-600/40 to-orange-400/20"
                    />
                    <MetricCard
                      icon={<Target className="w-6 h-6" />}
                      title="Alfabetización"
                      value="0.77"
                      subtitle="Capital humano y riqueza conectados"
                      gradient="from-blue-600/40 to-blue-400/20"
                    />
                    <MetricCard
                      icon={<Zap className="w-6 h-6" />}
                      title="Significancia"
                      value="p < 0.001"
                      subtitle="Todos los hallazgos estadísticamente válidos"
                      gradient="from-purple-600/40 to-purple-400/20"
                    />
                  </div>
                </div>

                {/* Gráficas de correlaciones */}
                <div className="space-y-8">
                  <div className="border-l-4 border-green-400 pl-6">
                    <h3 className="text-3xl font-bold text-white mb-2">Correlaciones Clave</h3>
                    <p className="text-slate-300">Descubre cómo varían juntas las variables económicas mundiales</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ChartContainer
                      title="GDP per cápita vs Teléfonos"
                      description="¿La tecnología sigue siendo un lujo de ricos?"
                      icon={<TrendingUp className="w-5 h-5" />}
                    >
                      <InteractiveScatterPlot
                        data={scatterPlotData.gdpVsPhones}
                        xLabel="GDP per cápita ($)"
                        yLabel="Teléfonos por 1000"
                        title="Relación Tecnología-Riqueza"
                        correlation={0.831}
                      />
                    </ChartContainer>

                    <ChartContainer
                      title="GDP per cápita vs Alfabetización"
                      description="La educación como factor de desarrollo"
                      icon={<Target className="w-5 h-5" />}
                    >
                      <InteractiveScatterPlot
                        data={scatterPlotData.gdpVsLiteracy}
                        xLabel="GDP per cápita ($)"
                        yLabel="Alfabetización (%)"
                        title="Relación Educación-Riqueza"
                        correlation={0.769}
                      />
                    </ChartContainer>
                  </div>
                </div>

                {/* Matriz de correlaciones */}
                <div className="space-y-8">
                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="text-3xl font-bold text-white mb-2">Matriz de Correlaciones</h3>
                    <p className="text-slate-300">Visualización completa de todas las relaciones entre variables</p>
                  </div>

                  <ChartContainer
                    title="Mapa de Calor"
                    description="Verde oscuro = correlación fuerte | Gris = sin correlación"
                    icon={<Activity className="w-5 h-5" />}
                  >
                    <CorrelationHeatmap
                      variables={correlationVariables}
                      correlations={correlationMatrix}
                      title="Heatmap de Correlaciones"
                    />
                  </ChartContainer>
                </div>

                {/* Gráficas de barras por región */}
                <div className="space-y-8">
                  <div className="border-l-4 border-orange-400 pl-6">
                    <h3 className="text-3xl font-bold text-white mb-2">Desarrollo por Región</h3>
                    <p className="text-slate-300">GDP promedio comparativo entre regiones geográficas</p>
                  </div>

                  <ChartContainer
                    title="GDP Promedio por Región"
                    description="Brecha de desarrollo entre regiones"
                    icon={<Globe className="w-5 h-5" />}
                  >
                    <AnimatedBarChart
                      data={regionChartData}
                      title="GDP per cápita promedio"
                      color="rgb(59, 130, 246)"
                    />
                  </ChartContainer>
                </div>

                {/* Mapa mundial */}
                <div className="space-y-8">
                  <div className="border-l-4 border-cyan-400 pl-6">
                    <h3 className="text-3xl font-bold text-white mb-2">Mapa Global de Desarrollo</h3>
                    <p className="text-slate-300">Visualización geográfica del GDP per cápita por país</p>
                  </div>

                  <ChartContainer
                    title="Mapa Interactivo del Mundo"
                    description="Pasa el cursor sobre los países para ver sus valores exactos"
                    icon={<Globe className="w-5 h-5" />}
                  >
                    <WorldMap
                      data={worldMapData}
                      title="GDP per cápita por País"
                      metric="USD"
                      minValue={1000}
                      maxValue={120000}
                    />
                  </ChartContainer>
                </div>

                {/* Insights destacados */}
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-6">
                    <h3 className="text-3xl font-bold text-white mb-2">Hallazgos Visuales</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InsightBanner
                      title="Brecha Tecnológica"
                      description="Los países ricos tienen 100x más teléfonos que los pobres"
                      metric="r = 0.83***"
                      icon={<TrendingUp className="w-5 h-5" />}
                      color="blue"
                    />
                    <InsightBanner
                      title="Transición Demográfica"
                      description="Mayor desarrollo = menor mortalidad infantil"
                      metric="r = -0.75***"
                      icon={<Activity className="w-5 h-5" />}
                      color="green"
                    />
                    <InsightBanner
                      title="Capital Humano"
                      description="Educación fuerte correlación con PIB nacional"
                      metric="r = 0.77***"
                      icon={<Target className="w-5 h-5" />}
                      color="purple"
                    />
                    <InsightBanner
                      title="Geografía es Destino"
                      description="Tu región predice tu desarrollo (Cramér V = 0.62)"
                      metric="Depende de dónde naces"
                      icon={<Globe className="w-5 h-5" />}
                      color="orange"
                    />
                  </div>
                </div>

                {/* Conclusión visual */}
                <div className="rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 border border-white/10 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">📊 Conclusión Visual</h3>
                  <div className="space-y-3 text-slate-300">
                    <p>
                      Las gráficas revelan una verdad incómoda: <strong className="text-white">la desigualdad global es estructural</strong>. 
                      No es casualidad que los países ricos tengan más tecnología, mejor educación y menor mortalidad. 
                      Todo está interconectado.
                    </p>
                    <p>
                      La geografía importa. Tu región geográfica predice mejor tu futuro que tus habilidades. 
                      Esto no es político, es estadístico.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <NotebookViewer
                  notebookTitle={notebookResources.title}
                  description={notebookResources.description}
                  googleDriveLink={notebookResources.links.googleDrive}
                  googleColabLink={notebookResources.links.googleColab}
                  kaggleDatasetLink={notebookResources.links.kaggleDataset}
                />

                <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4">¿Qué obtendré en el notebook?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">📚 Contenido Completo</h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        <li>✓ Carga y limpieza del dataset</li>
                        <li>✓ Análisis descriptivo detallado</li>
                        <li>✓ Pruebas de normalidad (Shapiro-Wilk, K-S)</li>
                        <li>✓ Matrices de correlación con visualization</li>
                        <li>✓ Análisis chi-cuadrado e independencia</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">💻 Código Reutilizable</h4>
                      <ul className="space-y-2 text-slate-300 text-sm">
                        <li>✓ Funciones de visualización (Seaborn)</li>
                        <li>✓ Tests estadísticos (SciPy)</li>
                        <li>✓ Manipulación de datos (Pandas)</li>
                        <li>✓ Mapa interactivo (Plotly)</li>
                        <li>✓ Estructura reproducible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-slate-800 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              ¿Quieres aprender más sobre Data Science?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Explora más proyectos, artículos y análisis en mi portafolio de Data Science.
            </p>
            <a
              href="/projects"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Ver más proyectos
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
