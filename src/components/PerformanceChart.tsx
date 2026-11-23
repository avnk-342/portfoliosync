import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export interface PerformancePoint{
  date: string,
  value: number
}

interface props{
  initialData: PerformancePoint[]
}

type TimeRange = '1W' | '1M' | '6M' | '1Y' | 'ALL';

const PerformanceChart = ({initialData}: props) => {
  const [activeRange, setActiveRange] = useState<TimeRange>('1M');
  const [activeTooltipPoint, setActiveTooltipPoint] = useState<PerformancePoint | null>(null);

  const getFilteredData = () => {
    const totalPoints = initialData.length;
    let sliceCount = totalPoints;
    switch(activeRange){
      case '1W': sliceCount = 7; break;
      case '1M': sliceCount = 30; break;
      case '6M': sliceCount = 180; break;
      case '1Y': sliceCount = 365; break;
      case 'ALL': sliceCount = totalPoints; break; 
    }
    return initialData.slice(-Math.min(sliceCount, totalPoints));
  };

  const chartData = getFilteredData();
  const startVal = chartData[0]?.value || 0;
  const latestVal = chartData[chartData.length -1]?.value || 0;

  const displayedVal = activeTooltipPoint ? activeTooltipPoint.value : latestVal;
  const priceChange = displayedVal - startVal;
  const percentChange = startVal ? ((priceChange / startVal) * 100).toFixed(2) : '0.00';
  const isPositive = priceChange >= 0;
  
  return (
   <div className="bg-(--bg) border border-(--border) rounded-xl p-6 shadow-sm w-full">
      {/* Header & Metrics */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase text-(--text) tracking-wider">
            {activeTooltipPoint ? `Valuation on ${activeTooltipPoint.date}` : 'Current Valuation'}
          </p>
          <div className="flex items-baseline gap-3 mt-1">
            <h2 className="text-3xl font-bold text-(--text-h)">
              ₹{displayedVal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </h2>
            <span className={`text-sm font-semibold px-2 py-0.5 rounded ${
              isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {isPositive ? '+' : ''}₹{priceChange.toLocaleString('en-IN')} ({percentChange}%)
            </span>
          </div>
        </div>

        {/* Range Switcher Buttons */}
        <div className="flex bg-(--code-bg) p-1 rounded-lg border border-(--border) gap-1">
          {(['1W', '1M', '6M', '1Y', 'ALL'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeRange === r
                  ? 'bg-(--accent) text-white shadow-sm'
                  : 'text-(--text) hover:text-(--text-h)'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            onMouseMove={(state) => {
              const activePayload = (state as unknown as {
                activePayload?: Array<{ payload?: PerformancePoint }>;
              } | null)?.activePayload;
              const point = activePayload?.[0]?.payload;
              if (point) {
                setActiveTooltipPoint(point);
              }
            }}
            onMouseLeave={() => setActiveTooltipPoint(null)}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0.4} />
                <stop offset="95%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af" 
              fontSize={12} 
              tickLine={false} 
              axisLine={{ stroke: 'var(--border)' }}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12} 
              tickLine={false} 
              axisLine={{ stroke: 'var(--border)' }}
              domain={['auto', 'auto']}
              tickFormatter={(val) => `₹${val / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? '#10b981' : '#f43f5e'} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Custom Tooltip Component styled to match your design tokens
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-(--code-bg) border border-(--border) p-3 rounded-lg shadow-lg text-xs">
        <p className="text-(--text) mb-1">{data.date}</p>
        <p className="font-bold text-(--text-h) text-sm">
          ₹{data.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
}
export default PerformanceChart

