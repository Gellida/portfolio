import React from 'react';
import { TrendingUp, BarChart3, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  highlight = false
}) => {
  return (
    <div
      className={`rounded-lg p-6 border transition-all duration-300 ${
        highlight
          ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-400 shadow-lg shadow-blue-500/20'
          : 'bg-slate-800 border-slate-700 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-white text-sm uppercase tracking-wider">{title}</h3>
        {icon && <div className="text-blue-400">{icon}</div>}
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <p className="text-sm text-slate-300">{description}</p>
    </div>
  );
};

interface InsightCardProps {
  title: string;
  metric: string;
  description: string;
  type: 'correlation' | 'association' | 'ttest' | 'chisquare' | 'distribution';
}

const typeConfig = {
  correlation: {
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-900/20'
  },
  association: {
    icon: BarChart3,
    color: 'text-orange-400',
    bg: 'bg-orange-900/20'
  },
  ttest: {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-900/20'
  },
  chisquare: {
    icon: CheckCircle2,
    color: 'text-purple-400',
    bg: 'bg-purple-900/20'
  },
  distribution: {
    icon: BarChart3,
    color: 'text-blue-400',
    bg: 'bg-blue-900/20'
  }
};

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  metric,
  description,
  type
}) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="rounded-lg p-6 bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${config.bg}`}>
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <div className={`font-mono text-lg font-bold ${config.color} mb-2`}>{metric}</div>
          <p className="text-sm text-slate-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  title?: string;
}

export const DataTable: React.FC<DataTableProps> = ({ headers, rows, title }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
      {title && (
        <div className="px-6 py-4 bg-slate-700/50 border-b border-slate-700">
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-700/30">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left font-semibold text-slate-300 whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`border-b border-slate-700 ${rowIdx % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'}`}
              >
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-6 py-3 text-slate-200">
                    {typeof cell === 'number' ? cell.toFixed(2) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  title
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
      {title && (
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-300">{title}</span>
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className={`language-${language} text-sm text-slate-300 leading-relaxed`}>
          {code}
        </code>
      </pre>
    </div>
  );
};
