import React, { useEffect, useRef } from 'react';

interface ScatterDataPoint {
  x: number;
  y: number;
  label: string;
  region?: string;
}

interface InteractiveScatterProps {
  data: ScatterDataPoint[];
  xLabel: string;
  yLabel: string;
  title: string;
  correlation: number;
}

export const InteractiveScatterPlot: React.FC<InteractiveScatterProps> = ({
  data,
  xLabel,
  yLabel,
  title,
  correlation
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = React.useState<ScatterDataPoint | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 60;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Encontrar rangos
    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;

    // Funciones de mapeo
    const mapX = (x: number) => padding + ((x - xMin) / xRange) * width;
    const mapY = (y: number) => canvas.height - padding - ((y - yMin) / yRange) * height;

    // Limpiar canvas
    ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gradiente de fondo
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(30, 41, 59, 0.8)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * width;
      const y = padding + (i / 10) * height;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Ejes
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Línea de tendencia
    if (data.length > 1) {
      const sumX = data.reduce((a, d) => a + d.x, 0);
      const sumY = data.reduce((a, d) => a + d.y, 0);
      const sumXY = data.reduce((a, d) => a + d.x * d.y, 0);
      const sumX2 = data.reduce((a, d) => a + d.x * d.x, 0);
      const n = data.length;

      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      const x1 = xMin;
      const y1 = slope * x1 + intercept;
      const x2 = xMax;
      const y2 = slope * x2 + intercept;
      ctx.moveTo(mapX(x1), mapY(y1));
      ctx.lineTo(mapX(x2), mapY(y2));
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Puntos
    data.forEach((point) => {
      const x = mapX(point.x);
      const y = mapY(point.y);
      const isHovered = hoveredPoint === point;

      // Círculo
      ctx.beginPath();
      ctx.arc(x, y, isHovered ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? 'rgba(34, 197, 94, 1)' : 'rgba(59, 130, 246, 0.7)';
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Etiquetas de ejes
    ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, canvas.width / 2, canvas.height - 10);

    ctx.textAlign = 'right';
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();

    // Tooltip
    if (hoveredPoint) {
      const x = mapX(hoveredPoint.x);
      const y = mapY(hoveredPoint.y);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
      ctx.lineWidth = 1;

      const text = `${hoveredPoint.label}`;
      const textMetrics = ctx.measureText(text);
      const tooltipWidth = Math.max(100, textMetrics.width + 10);
      const tooltipHeight = 30;

      const tooltipX = Math.max(padding, Math.min(x - tooltipWidth / 2, canvas.width - padding - tooltipWidth));
      const tooltipY = Math.max(padding, y - tooltipHeight - 10);

      ctx.beginPath();
      ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = 'rgba(203, 213, 225, 1)';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(text, tooltipX + tooltipWidth / 2, tooltipY + 18);
    }
  }, [data, hoveredPoint, xLabel, yLabel]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = 60;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;

    const mapX = (px: number) => padding + ((px - xMin) / xRange) * width;
    const mapY = (py: number) => canvas.height - padding - ((py - yMin) / yRange) * height;

    let found: ScatterDataPoint | null = null;
    for (const point of data) {
      const px = mapX(point.x);
      const py = mapY(point.y);
      const distance = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      if (distance < 10) {
        found = point;
        break;
      }
    }

    setHoveredPoint(found);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-300">
            Correlación de Pearson: <span className="font-mono text-green-400">r = {correlation.toFixed(3)}</span>
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPoint(null)}
        className="w-full rounded-lg cursor-crosshair bg-slate-900 border border-slate-700"
      />
    </div>
  );
};

interface CorrelationHeatmapProps {
  variables: string[];
  correlations: number[][];
  title: string;
}

export const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({
  variables,
  correlations,
  title
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = 50;
    const padding = 100;
    const width = variables.length * cellSize + padding * 2;
    const height = variables.length * cellSize + padding * 2;

    canvas.width = width;
    canvas.height = height;

    // Fondo
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(30, 41, 59, 0.9)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Función para obtener color basado en correlación
    const getColor = (value: number) => {
      if (value > 0.7) return 'rgba(34, 197, 94, 0.8)'; // Verde
      if (value > 0.4) return 'rgba(59, 130, 246, 0.8)'; // Azul
      if (value > 0) return 'rgba(168, 85, 247, 0.6)'; // Púrpura
      return 'rgba(107, 114, 128, 0.5)'; // Gris
    };

    // Celdas
    for (let i = 0; i < variables.length; i++) {
      for (let j = 0; j < variables.length; j++) {
        const x = padding + j * cellSize;
        const y = padding + i * cellSize;
        const value = correlations[i][j];

        ctx.fillStyle = getColor(value);
        ctx.fillRect(x, y, cellSize, cellSize);

        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellSize, cellSize);

        // Valor en la celda
        ctx.fillStyle = value > 0.5 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(203, 213, 225, 0.8)';
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value.toFixed(2), x + cellSize / 2, y + cellSize / 2);
      }
    }

    // Etiquetas X
    ctx.fillStyle = 'rgba(203, 213, 225, 0.9)';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < variables.length; i++) {
      const x = padding + i * cellSize + cellSize / 2;
      ctx.save();
      ctx.translate(x, 20);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(variables[i], 0, 0);
      ctx.restore();
    }

    // Etiquetas Y
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < variables.length; i++) {
      const y = padding + i * cellSize + cellSize / 2;
      ctx.fillText(variables[i], padding - 10, y);
    }
  }, [variables, correlations]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <canvas ref={canvasRef} className="w-full rounded-lg bg-slate-900 border border-slate-700" />
    </div>
  );
};

interface BarChartProps {
  data: { label: string; value: number }[];
  title: string;
  color?: string;
}

export const AnimatedBarChart: React.FC<BarChartProps> = ({
  data,
  title,
  color = 'rgb(59, 130, 246)'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 0.02, 1));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 40;
    const barWidth = 30;
    const spacing = 15;
    const width = data.length * (barWidth + spacing) + padding * 2;
    const height = 300;

    canvas.width = width;
    canvas.height = height;

    // Fondo
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(30, 41, 59, 0.8)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const maxValue = Math.max(...data.map(d => d.value));
    const chartHeight = height - padding * 2;

    // Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Barras
    data.forEach((item, idx) => {
      const x = padding + idx * (barWidth + spacing) + spacing / 2;
      const barHeight = (item.value / maxValue) * chartHeight * progress;
      const y = height - padding - barHeight;

      // Gradiente para cada barra
      const barGradient = ctx.createLinearGradient(x, y, x, height - padding);
      barGradient.addColorStop(0, color);
      barGradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');

      ctx.fillStyle = barGradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      ctx.fill();

      // Valor
      ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
      ctx.font = 'bold 12px system-ui';
      ctx.textAlign = 'center';
      if (barHeight > 20) {
        ctx.fillText(item.value.toString(), x + barWidth / 2, height - padding - barHeight - 10);
      }

      // Etiqueta
      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.font = '11px system-ui';
      ctx.textBaseline = 'top';
      ctx.save();
      ctx.translate(x + barWidth / 2, height - padding + 10);
      ctx.rotate(Math.PI / 6);
      ctx.fillText(item.label, 0, 0);
      ctx.restore();
    });
  }, [data, progress, color]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <canvas ref={canvasRef} className="w-full rounded-lg bg-slate-900 border border-slate-700" />
    </div>
  );
};

interface CountryMapData {
  name: string;
  lat: number;
  lng: number;
  value: number;
  region: string;
}

interface WorldMapProps {
  data: CountryMapData[];
  title: string;
  metric: string;
  minValue?: number;
  maxValue?: number;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  data,
  title,
  metric,
  minValue,
  maxValue
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCountry, setHoveredCountry] = React.useState<CountryMapData | null>(null);

  // Proyección Mercator simplificada
  const mercatorProject = (lat: number, lng: number, width: number, height: number) => {
    const x = ((lng + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return { x, y };
  };

  const getColor = (value: number) => {
    const min = minValue !== undefined ? minValue : Math.min(...data.map(d => d.value));
    const max = maxValue !== undefined ? maxValue : Math.max(...data.map(d => d.value));
    const range = max - min || 1;
    const normalized = (value - min) / range;

    // Gradiente: rojo (bajo) -> amarillo -> verde (alto)
    if (normalized < 0.33) {
      const t = normalized / 0.33;
      return `rgba(${Math.round(255)}, ${Math.round(69 * t)}, ${Math.round(69)}, 0.8)`;
    } else if (normalized < 0.66) {
      const t = (normalized - 0.33) / 0.33;
      return `rgba(${Math.round(255 - 100 * t)}, ${Math.round(200)}, ${Math.round(69)}, 0.8)`;
    } else {
      const t = (normalized - 0.66) / 0.34;
      return `rgba(${Math.round(100 - 100 * t)}, ${Math.round(200 + 55 * t)}, ${Math.round(69)}, 0.8)`;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Fondo
    ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
    ctx.fillRect(padding, padding, width, height);

    // Líneas de grid (paralelos y meridianos)
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.2)';
    ctx.lineWidth = 1;

    // Líneas horizontales (paralelos)
    for (let lat = -80; lat <= 80; lat += 20) {
      const { y } = mercatorProject(lat, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(padding, padding + y);
      ctx.lineTo(padding + width, padding + y);
      ctx.stroke();
    }

    // Líneas verticales (meridianos)
    for (let lng = -180; lng <= 180; lng += 60) {
      const { x } = mercatorProject(0, lng, width, height);
      ctx.beginPath();
      ctx.moveTo(padding + x, padding);
      ctx.lineTo(padding + x, padding + height);
      ctx.stroke();
    }

    // Dibujar países como círculos
    data.forEach(country => {
      const { x, y } = mercatorProject(country.lat, country.lng, width, height);
      const screenX = padding + x;
      const screenY = padding + y;

      // Tamaño del círculo basado en el valor
      const min = minValue !== undefined ? minValue : Math.min(...data.map(d => d.value));
      const max = maxValue !== undefined ? maxValue : Math.max(...data.map(d => d.value));
      const range = max - min || 1;
      const normalized = (country.value - min) / range;
      const radius = 4 + normalized * 12;

      // Círculo
      ctx.fillStyle = getColor(country.value);
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Borde
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Hover highlight
      if (hoveredCountry === country) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius + 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // Tooltip
    if (hoveredCountry) {
      const { x, y } = mercatorProject(hoveredCountry.lat, hoveredCountry.lng, width, height);
      const screenX = padding + x;
      const screenY = padding + y;

      const tooltipText = `${hoveredCountry.name}: ${hoveredCountry.value.toFixed(1)} ${metric}`;
      ctx.font = '12px system-ui';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';

      const textMetrics = ctx.measureText(tooltipText);
      const tooltipWidth = textMetrics.width + 12;
      const tooltipHeight = 24;
      const tooltipX = screenX - tooltipWidth / 2;
      const tooltipY = screenY - 35;

      ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tooltipText, screenX, tooltipY + tooltipHeight / 2);
    }

    // Etiquetas de ejes
    ctx.fillStyle = 'rgba(203, 213, 225, 0.7)';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // Longitud (X)
    for (let lng = -180; lng <= 180; lng += 60) {
      const { x } = mercatorProject(0, lng, width, height);
      const label = lng > 0 ? `${lng}°E` : lng < 0 ? `${Math.abs(lng)}°W` : '0°';
      ctx.fillText(label, padding + x, padding + height + 15);
    }

    // Latitud (Y)
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let lat = -60; lat <= 60; lat += 30) {
      const { y } = mercatorProject(lat, 0, width, height);
      const label = lat > 0 ? `${lat}°N` : lat < 0 ? `${Math.abs(lat)}°S` : '0°';
      ctx.fillText(label, padding - 10, padding + y);
    }
  }, [data, hoveredCountry, metric, minValue, maxValue]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    const mouseX = (e.clientX - rect.left - padding) / (width / canvas.width);
    const mouseY = (e.clientY - rect.top - padding) / (height / canvas.height);

    let found = null;
    const min = minValue !== undefined ? minValue : Math.min(...data.map(d => d.value));
    const max = maxValue !== undefined ? maxValue : Math.max(...data.map(d => d.value));
    const range = max - min || 1;

    for (const country of data) {
      const { x, y } = mercatorProject(country.lat, country.lng, width, height);
      const screenX = padding + x * (width / canvas.width);
      const screenY = padding + y * (height / canvas.height);

      const normalized = (country.value - min) / range;
      const radius = 4 + normalized * 12;

      const dist = Math.sqrt((mouseX - screenX) ** 2 + (mouseY - screenY) ** 2);
      if (dist < radius + 5) {
        found = country;
        break;
      }
    }

    setHoveredCountry(found);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <canvas
        ref={canvasRef}
        width={800}
        height={480}
        className="w-full rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255, 69, 69, 0.8)' }} />
          <span>Bajo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255, 200, 69, 0.8)' }} />
          <span>Medio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(100, 255, 69, 0.8)' }} />
          <span>Alto</span>
        </div>
      </div>
    </div>
  );
};
