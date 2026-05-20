import React, { useState } from 'react';
import { Download, BookOpen, Share2 } from 'lucide-react';

interface NotebookViewerProps {
  googleDriveLink: string;
  googleColabLink: string;
  kaggleDatasetLink: string;
  notebookTitle: string;
  description: string;
}

export const NotebookViewer: React.FC<NotebookViewerProps> = ({
  googleDriveLink,
  googleColabLink,
  kaggleDatasetLink,
  notebookTitle,
  description
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadNotebook = async () => {
    try {
      // Crear un archivo .ipynb básico de descarga
      const notebookContent = {
        cells: [
          {
            cell_type: 'markdown',
            metadata: {},
            source: [
              '# Análisis Exploratorio de Datos — Countries of the World\n',
              '**Autor:** José Gellida  \n',
              '**Dataset:** [Countries of the World — Kaggle](https://www.kaggle.com/datasets/fernandol/countries-of-the-world)  \n',
              '**Herramientas:** Python · Pandas · Seaborn · SciPy · Plotly  \n',
              '\n',
              '---\n',
              '> Este análisis forma parte del portfolio de Data Science'
            ]
          }
        ],
        metadata: {
          kernelspec: {
            display_name: 'Python 3',
            language: 'python',
            name: 'python3'
          },
          language_info: {
            name: 'python',
            version: '3.10.0'
          }
        },
        nbformat: 4,
        nbformat_minor: 4
      };

      const element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(notebookContent, null, 2))
      );
      element.setAttribute('download', 'EDA_paises_del_mundo.ipynb');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error descargando notebook:', error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 shadow-2xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">{notebookTitle}</h2>
        </div>
        <p className="text-slate-300">{description}</p>
      </div>

      {/* Acciones principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Google Colab */}
        <a
          href={googleColabLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 p-4 bg-slate-700 hover:bg-yellow-600 rounded-lg transition-all duration-300 border border-slate-600 hover:border-yellow-400"
        >
          <div className="w-10 h-10 rounded bg-yellow-400 flex items-center justify-center text-slate-900 font-bold group-hover:scale-110 transition-transform">
            ▶
          </div>
          <div>
            <div className="font-semibold text-white">Ejecutar en Google Colab</div>
            <div className="text-sm text-slate-300">Código interactivo y en vivo</div>
          </div>
        </a>
 
      </div>

      {/* Opciones adicionales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {/* Descargar */}
        <button
          onClick={downloadNotebook}
          className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-emerald-600 rounded-lg transition-colors border border-slate-600 hover:border-emerald-400 text-white font-medium"
        >
          <Download className="w-4 h-4" />
          Descargar .ipynb
        </button>

        {/* Copiar Colab */}
        <button
          onClick={() => copyToClipboard(googleColabLink, 'colab')}
          className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-orange-600 rounded-lg transition-colors border border-slate-600 hover:border-orange-400 text-white font-medium"
        >
          <Share2 className="w-4 h-4" />
          {copied === 'colab' ? 'Copiado!' : 'Copiar enlace'}
        </button>

        {/* Dataset Kaggle */}
        <a
          href={kaggleDatasetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-purple-600 rounded-lg transition-colors border border-slate-600 hover:border-purple-400 text-white font-medium"
        >
            <BookOpen className="w-4 h-4" />
            Ver dataset en Kaggle
        </a>
      </div>

      {/* Info */}
      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-white">Nota:</span> Este análisis combina una visualización interactiva con acceso al notebook completo. 
          Puedes explorar los gráficos aquí o ir al notebook para ver todo el código Python paso a paso.
        </p>
      </div>
    </div>
  );
};
