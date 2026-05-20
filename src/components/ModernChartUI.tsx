import React from 'react'; 

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  gradient: string;
  highlight?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  gradient,
  highlight = false
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
        highlight
          ? `bg-gradient-to-br ${gradient} border border-white/20 shadow-2xl`
          : 'bg-white/5 border border-white/10 hover:border-white/20'
      }`}
    >
      {/* Efecto de luz de fondo */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none`} />

      {/* Contenido */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">{icon}</div>
        </div>

        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-1">{title}</h3>
        <div className="text-4xl font-bold text-white mb-2">{value}</div>
        <p className="text-xs text-white/60 leading-relaxed">{subtitle}</p>
      </div>

      {/* Línea decorativa */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
    </div>
  );
};

interface ChartContainerProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  children,
  title,
  description,
  icon
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-8 hover:border-white/20 transition-all duration-300 group">
      {/* Efecto de luz movible en el fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl bg-gradient-to-br from-blue-400 to-purple-400" />
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          {icon && <div className="text-blue-400">{icon}</div>}
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {description && <p className="text-sm text-white/60 mt-1">{description}</p>}
          </div>
        </div>

        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

interface StatGridProps {
  items: {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down';
  }[];
}

export const StatGrid: React.FC<StatGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 rounded-xl blur transition-opacity" />
          <div className="relative rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold text-white/60 uppercase mb-2">{item.label}</p>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-white">{item.value}</div>
              {item.trend && (
                <div className={`text-xs font-semibold ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.trend === 'up' ? '↑' : '↓'} {item.change}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface InsightBannerProps {
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorGradients = {
  blue: 'from-blue-600/40 to-blue-400/20 border-blue-500/30',
  green: 'from-green-600/40 to-green-400/20 border-green-500/30',
  purple: 'from-purple-600/40 to-purple-400/20 border-purple-500/30',
  orange: 'from-orange-600/40 to-orange-400/20 border-orange-500/30'
};

const colorIcons = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400'
};

export const InsightBanner: React.FC<InsightBannerProps> = ({
  title,
  description,
  metric,
  icon,
  color
}) => {
  return (
    <div
      className={`rounded-2xl border backdrop-blur-xl bg-gradient-to-r ${colorGradients[color]} p-6 flex items-start gap-4 hover:border-opacity-100 transition-all duration-300`}
    >
      <div className={`p-3 rounded-xl bg-white/10 flex-shrink-0 ${colorIcons[color]}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-white/70 mb-3">{description}</p>
        <div className={`text-xl font-bold ${colorIcons[color]}`}>{metric}</div>
      </div>
    </div>
  );
};
