interface SparklineProps {
  data?: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  title?: string;
}

export default function Sparkline({
  data,
  width = 240,
  height = 56,
  strokeWidth = 2,
  title = 'Downloads history',
}: SparklineProps) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const stepX = width / (data.length - 1);

  const points = data.map((y, i) => {
    const x = i * stepX;
    const ny = height - ((y - min) / range) * height;
    return `${x},${ny}`;
  });

  return (
    <svg width={width} height={height} role="img" aria-label={title}>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        points={points.join(' ')}
      />
    </svg>
  );
}
