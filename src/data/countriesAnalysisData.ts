/**
 * Datos procesados del análisis EDA: Countries of the World
 * Dataset original: https://www.kaggle.com/datasets/fernandol/countries-of-the-world
 */

export interface VariableStats {
  name: string;
  label: string;
  type: 'quantitative' | 'categorical' | 'binary';
  mean?: number;
  median?: number;
  std?: number;
  min?: number;
  max?: number;
  mode?: number | string;
  variance?: number;
  range?: number;
  shapiroWilk?: { statistic: number; pValue: number };
  kolmogorovSmirnov?: { statistic: number; pValue: number };
}

export interface CorrelationPair {
  var1: string;
  var2: string;
  label1: string;
  label2: string;
  pearson: { r: number; pValue: number };
  description: string;
}

export interface ContingencyTable {
  var1: string;
  var2: string;
  chi2: number;
  pValue: number;
  degreesOfFreedom: number;
  contingency: number;
  cramersV: number;
  significant: boolean;
}

// Variables cuantitativas principales
export const quantitativeVariables: VariableStats[] = [
  {
    name: 'GDP ($ per capita)',
    label: 'GDP per cápita',
    type: 'quantitative',
    mean: 8965.4,
    median: 5000,
    std: 15233.8,
    min: 500,
    max: 103600,
    variance: 231769145,
    range: 103100,
    shapiroWilk: { statistic: 0.6234, pValue: 0.0001 },
    kolmogorovSmirnov: { statistic: 0.2156, pValue: 0.0001 }
  },
  {
    name: 'Literacy (%)',
    label: 'Alfabetización (%)',
    type: 'quantitative',
    mean: 75.4,
    median: 82.0,
    std: 23.8,
    min: 17.6,
    max: 100,
    variance: 566.44,
    range: 82.4,
    shapiroWilk: { statistic: 0.9102, pValue: 0.0001 },
    kolmogorovSmirnov: { statistic: 0.1634, pValue: 0.0001 }
  },
  {
    name: 'Infant mortality (per 1000 births)',
    label: 'Mortalidad infantil',
    type: 'quantitative',
    mean: 42.8,
    median: 35.5,
    std: 39.2,
    min: 2.7,
    max: 192,
    variance: 1536.64,
    range: 189.3,
    shapiroWilk: { statistic: 0.8945, pValue: 0.0001 },
    kolmogorovSmirnov: { statistic: 0.1892, pValue: 0.0001 }
  },
  {
    name: 'Phones (per 1000)',
    label: 'Teléfonos/1000 habitantes',
    type: 'quantitative',
    mean: 214.5,
    median: 174,
    std: 232.1,
    min: 0.2,
    max: 1256,
    variance: 53870.41,
    range: 1255.8,
    shapiroWilk: { statistic: 0.7634, pValue: 0.0001 },
    kolmogorovSmirnov: { statistic: 0.1867, pValue: 0.0001 }
  },
  {
    name: 'Birthrate',
    label: 'Tasa de natalidad',
    type: 'quantitative',
    mean: 22.3,
    median: 21.5,
    std: 9.8,
    min: 7.3,
    max: 51.0,
    variance: 96.04,
    range: 43.7,
    shapiroWilk: { statistic: 0.9456, pValue: 0.0012 },
    kolmogorovSmirnov: { statistic: 0.0934, pValue: 0.0234 }
  }
];

// Correlaciones principales
export const correlations: CorrelationPair[] = [
  {
    var1: 'GDP ($ per capita)',
    var2: 'Phones (per 1000)',
    label1: 'GDP per cápita',
    label2: 'Teléfonos/1000',
    pearson: { r: 0.831, pValue: 0.0001 },
    description: 'Relación fuerte entre riqueza y acceso tecnológico. Países ricos tienen más teléfonos disponibles.'
  },
  {
    var1: 'GDP ($ per capita)',
    var2: 'Literacy (%)',
    label1: 'GDP per cápita',
    label2: 'Alfabetización (%)',
    pearson: { r: 0.769, pValue: 0.0001 },
    description: 'Correlación positiva moderada-alta: mayor educación se asocia con mayor riqueza (capital humano).'
  },
  {
    var1: 'Birthrate',
    var2: 'Infant mortality (per 1000 births)',
    label1: 'Tasa de natalidad',
    label2: 'Mortalidad infantil',
    pearson: { r: 0.623, pValue: 0.0001 },
    description: 'Patrón de transición demográfica: países con mayor mortalidad infantil tienden a tener natalidad más alta.'
  }
];

// Pruebas chi-cuadrado
export const contingencyTests: ContingencyTable[] = [
  {
    var1: 'Region',
    var2: 'nivel_desarrollo',
    chi2: 156.82,
    pValue: 0.0001,
    degreesOfFreedom: 8,
    contingency: 0.582,
    cramersV: 0.619,
    significant: true
  },
  {
    var1: 'Region',
    var2: 'nivel_alfabetizacion',
    chi2: 89.34,
    pValue: 0.0001,
    degreesOfFreedom: 8,
    contingency: 0.452,
    cramersV: 0.451,
    significant: true
  },
  {
    var1: 'nivel_desarrollo',
    var2: 'nivel_alfabetizacion',
    chi2: 124.56,
    pValue: 0.0001,
    degreesOfFreedom: 4,
    contingency: 0.501,
    cramersV: 0.444,
    significant: true
  }
];

// Información del dataset
export const datasetInfo = {
  title: 'Countries of the World',
  source: 'https://www.kaggle.com/datasets/fernandol/countries-of-the-world',
  author: 'Fernando Lasso',
  year: 2008,
  totalCountries: 227,
  totalVariables: 19,
  description: 'Base de datos con información demográfica, económica y social de 227 países e islas independientes del mundo.',
  purpose: 'Identificar patrones económicos y demográficos globales, explorar relaciones entre indicadores de desarrollo.'
};

// Estadísticas clave por región (simplificado)
export const regionStats = [
  { region: 'Western Europe', countries: 12, avgGDP: 28450, devIndex: 'Alto' },
  { region: 'Eastern Europe', countries: 11, avgGDP: 8920, devIndex: 'Medio' },
  { region: 'Asia', countries: 34, avgGDP: 6750, devIndex: 'Medio' },
  { region: 'Africa', countries: 54, avgGDP: 1620, devIndex: 'Bajo' },
  { region: 'Latin Amer. & Carib', countries: 45, avgGDP: 4560, devIndex: 'Bajo-Medio' },
  { region: 'Northern America', countries: 5, avgGDP: 35420, devIndex: 'Alto' },
  { region: 'Oceania', countries: 13, avgGDP: 15340, devIndex: 'Medio-Alto' }
];

// Hallazgos clave
export const keyFindings = [
  {
    title: 'GDP vs Tecnología',
    metric: 'r = 0.83',
    description: 'Correlación fuerte entre riqueza y acceso a teléfonos. La tecnología sigue siendo un lujo en países pobres.',
    type: 'correlation'
  },
  {
    title: 'Brecha Sanitaria',
    metric: 'φ ≈ -0.70',
    description: 'Países desarrollados tienen mortalidad infantil significativamente menor. Diferencia estructural clara.',
    type: 'association'
  },
  {
    title: 'Diferencia de Medias GDP',
    metric: 't = -19.39, p < 0.001',
    description: 'La diferencia entre países desarrollados y no desarrollados es estadísticamente muy significativa.',
    type: 'ttest'
  },
  {
    title: 'Dependencia Regional',
    metric: "Cramér's V = 0.619",
    description: 'La región geográfica explica gran parte de la variación en el nivel de desarrollo.',
    type: 'chisquare'
  },
  {
    title: 'Distribución Asimétrica',
    metric: 'Mediana vs Media',
    description: 'El GDP no es normal (Shapiro-Wilk p<0.001). La mediana ($5k) es mejor indicador que la media ($8.9k).',
    type: 'distribution'
  }
];

// Notebooks y recursos
export const notebookResources = {
  title: 'Countries of the World - EDA',
  description: 'Análisis Exploratorio de Datos — Economía y Desarrollo Global',
  author: 'José Gellida',
  year: 2024,
  links: {
    googleDrive: 'https://drive.google.com/file/d/1I-1FhdQT8k-qnWK31sI9de0U6JB9ko-D/view?usp=sharing',
    googleColab: 'https://colab.research.google.com/drive/1I-1FhdQT8k-qnWK31sI9de0U6JB9ko-D',
    kaggleDataset: 'https://www.kaggle.com/datasets/fernandol/countries-of-the-world'
  }
};

// Datos para gráficas interactivas
export const scatterPlotData = {
  gdpVsPhones: [
    { x: 500, y: 10, label: 'Niger', region: 'Africa' },
    { x: 1200, y: 25, label: 'Uganda', region: 'Africa' },
    { x: 2500, y: 80, label: 'Egypt', region: 'Africa' },
    { x: 4500, y: 150, label: 'Mexico', region: 'Latin America' },
    { x: 8000, y: 300, label: 'Brazil', region: 'Latin America' },
    { x: 12000, y: 550, label: 'South Korea', region: 'Asia' },
    { x: 28000, y: 850, label: 'Germany', region: 'Europe' },
    { x: 35000, y: 950, label: 'Japan', region: 'Asia' },
    { x: 45000, y: 1100, label: 'USA', region: 'North America' },
    { x: 52000, y: 1200, label: 'Switzerland', region: 'Europe' }
  ],
  gdpVsLiteracy: [
    { x: 500, y: 15, label: 'Niger', region: 'Africa' },
    { x: 1200, y: 62, label: 'Uganda', region: 'Africa' },
    { x: 3500, y: 61, label: 'Egypt', region: 'Africa' },
    { x: 5000, y: 87, label: 'Mexico', region: 'Latin America' },
    { x: 8500, y: 88, label: 'Brazil', region: 'Latin America' },
    { x: 15000, y: 97, label: 'South Korea', region: 'Asia' },
    { x: 32000, y: 99, label: 'Germany', region: 'Europe' },
    { x: 36000, y: 99, label: 'Japan', region: 'Asia' },
    { x: 43000, y: 99, label: 'USA', region: 'North America' },
    { x: 54000, y: 99, label: 'Switzerland', region: 'Europe' }
  ]
};

// Matriz de correlaciones
export const correlationMatrix = [
  [1.0, 0.83, -0.75, 0.77, -0.62],
  [0.83, 1.0, -0.68, 0.71, -0.55],
  [-0.75, -0.68, 1.0, -0.81, 0.72],
  [0.77, 0.71, -0.81, 1.0, -0.69],
  [-0.62, -0.55, 0.72, -0.69, 1.0]
];

export const correlationVariables = [
  'GDP',
  'Teléfonos',
  'Mortalidad',
  'Alfabetización',
  'Natalidad'
];

// Datos de regiones para gráficos de barras
export const regionChartData = [
  { label: 'W. Europe', value: 28450 },
  { label: 'N. America', value: 35420 },
  { label: 'Oceania', value: 15340 },
  { label: 'E. Europe', value: 8920 },
  { label: 'Asia', value: 6750 },
  { label: 'Latin America', value: 4560 },
  { label: 'Africa', value: 1620 }
];

// Métricas para tarjetas
export const chartMetrics = [
  {
    icon: 'TrendingUp',
    title: 'Correlación GDP↔Tech',
    value: '0.83',
    subtitle: 'Relación tecnología-riqueza muy fuerte',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: 'Activity',
    title: 'Brecha Sanitaria',
    value: '-0.75',
    subtitle: 'GDP inversamente proporcional a mortalidad',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: 'Target',
    title: 'Capital Humano',
    value: '0.77',
    subtitle: 'Educación fuertemente correlacionada con GDP',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: 'Activity',
    title: 'Regiones',
    value: '0.619',
    subtitle: 'Cramér\'s V: geografía predice desarrollo',
    gradient: 'from-purple-500 to-pink-500'
  }
];

// Datos para mapa mundial
export const worldMapData = [
  // América del Norte
  { name: 'USA', lat: 37.1, lng: -95.7, value: 69288, region: 'Americas' },
  { name: 'Canada', lat: 60, lng: -106, value: 52052, region: 'Americas' },
  { name: 'Mexico', lat: 23.6, lng: -102.5, value: 9228, region: 'Americas' },

  // América del Sur
  { name: 'Brazil', lat: -10, lng: -55, value: 8917, region: 'Americas' },
  { name: 'Argentina', lat: -35, lng: -64, value: 10421, region: 'Americas' },
  { name: 'Chile', lat: -30, lng: -71, value: 15923, region: 'Americas' },
  { name: 'Colombia', lat: 4, lng: -74, value: 5145, region: 'Americas' },
  { name: 'Peru', lat: -9.2, lng: -75.7, value: 6994, region: 'Americas' },

  // Europa Occidental
  { name: 'Germany', lat: 51.2, lng: 10.5, value: 46445, region: 'Europe' },
  { name: 'France', lat: 46, lng: 2, value: 43259, region: 'Europe' },
  { name: 'UK', lat: 54.5, lng: -3.4, value: 46510, region: 'Europe' },
  { name: 'Italy', lat: 41.9, lng: 12.6, value: 31228, region: 'Europe' },
  { name: 'Spain', lat: 40, lng: -4, value: 30561, region: 'Europe' },
  { name: 'Netherlands', lat: 52.5, lng: 5.3, value: 57106, region: 'Europe' },
  { name: 'Switzerland', lat: 46.9, lng: 8.2, value: 92434, region: 'Europe' },
  { name: 'Sweden', lat: 62, lng: 15, value: 63518, region: 'Europe' },
  { name: 'Norway', lat: 62, lng: 10, value: 89209, region: 'Europe' },

  // Europa Central y Este
  { name: 'Poland', lat: 52, lng: 20, value: 17840, region: 'Europe' },
  { name: 'Czechia', lat: 49.8, lng: 15.5, value: 23711, region: 'Europe' },
  { name: 'Romania', lat: 46.8, lng: 24.9, value: 14862, region: 'Europe' },
  { name: 'Russia', lat: 60, lng: 100, value: 11654, region: 'Europe' },

  // Asia Central y Occidental
  { name: 'Turkey', lat: 39, lng: 35, value: 10626, region: 'Asia' },
  { name: 'Saudi Arabia', lat: 24, lng: 44.2, value: 32327, region: 'Asia' },
  { name: 'UAE', lat: 24, lng: 54, value: 49451, region: 'Asia' },
  { name: 'Israel', lat: 31.5, lng: 34.8, value: 52082, region: 'Asia' },
  { name: 'Iran', lat: 32, lng: 53.7, value: 4700, region: 'Asia' },

  // Asia del Sur y Sureste
  { name: 'China', lat: 35, lng: 105, value: 12556, region: 'Asia' },
  { name: 'Japan', lat: 36.2, lng: 138.3, value: 33816, region: 'Asia' },
  { name: 'South Korea', lat: 37, lng: 127, value: 31947, region: 'Asia' },
  { name: 'India', lat: 20, lng: 78, value: 2389, region: 'Asia' },
  { name: 'Indonesia', lat: -6, lng: 113.4, value: 4654, region: 'Asia' },
  { name: 'Thailand', lat: 13, lng: 101, value: 7233, region: 'Asia' },
  { name: 'Vietnam', lat: 14, lng: 106.7, value: 3995, region: 'Asia' },
  { name: 'Philippines', lat: 11.9, lng: 121.8, value: 3574, region: 'Asia' },
  { name: 'Singapore', lat: 1.3, lng: 103.8, value: 72794, region: 'Asia' },

  // Oriente Medio
  { name: 'Qatar', lat: 25.3, lng: 51.2, value: 116936, region: 'Asia' },
  { name: 'Kuwait', lat: 29.3, lng: 47.5, value: 27544, region: 'Asia' },
  { name: 'Bahrain', lat: 26.1, lng: 50.6, value: 60422, region: 'Asia' },
  { name: 'Oman', lat: 21.4, lng: 55.9, value: 16985, region: 'Asia' },

  // Africa
  { name: 'Nigeria', lat: 9.1, lng: 8.7, value: 2096, region: 'Africa' },
  { name: 'Egypt', lat: 26, lng: 29, value: 3876, region: 'Africa' },
  { name: 'South Africa', lat: -29.6, lng: 22.9, value: 6955, region: 'Africa' },
  { name: 'Kenya', lat: -0.0, lng: 37.9, value: 2048, region: 'Africa' },
  { name: 'Morocco', lat: 31.8, lng: -4.0, value: 3714, region: 'Africa' },
  { name: 'Ethiopia', lat: 9.1, lng: 40.5, value: 1076, region: 'Africa' },
  { name: 'Ghana', lat: 5.6, lng: -0.2, value: 2404, region: 'Africa' },

  // Oceanía
  { name: 'Australia', lat: -25.2, lng: 133.8, value: 63528, region: 'Oceania' },
  { name: 'New Zealand', lat: -40.9, lng: 174.9, value: 48281, region: 'Oceania' }
];
