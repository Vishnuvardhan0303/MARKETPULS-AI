import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from 'recharts';
import { format } from 'date-fns';
import { HistoricalDataPoint } from '../types/stock';
import { motion } from 'framer-motion';

interface StockChartProps {
  data: HistoricalDataPoint[];
  symbol: string;
  color?: string;
  height?: number;
  showControls?: boolean;
  fullWidth?: boolean;
}

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'All';

const StockChart: React.FC<StockChartProps> = ({
  data,
  symbol,
  color = '#3b82f6',
  height = 300,
  showControls = true,
  fullWidth = true
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (!data || data.length === 0) return [];
    
    const now = new Date();
    let filterDate = new Date();
    
    switch (timeRange) {
      case '1D':
        filterDate.setDate(now.getDate() - 1);
        break;
      case '1W':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '1M':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        filterDate.setMonth(now.getMonth() - 3);
        break;
      case '1Y':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'All':
        return data;
    }
    
    return data.filter(point => new Date(point.timestamp) >= filterDate);
  };
  
  const filteredData = getFilteredData();
  
  // Calculate if chart is trending up or down
  const isUp = filteredData.length > 1 
    ? filteredData[filteredData.length - 1].close > filteredData[0].close 
    : true;
  
  const chartColor = isUp ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
  const fillColor = isUp ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  
  const renderTimeRangeButtons = () => {
    if (!showControls) return null;
    
    const timeRanges: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y', 'All'];
    
    return (
      <div className="flex space-x-2 mb-4">
        {timeRanges.map((range) => (
          <button
            key={range}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors
                      ${timeRange === range 
                        ? `bg-${isUp ? 'green' : 'red'}-100 text-${isUp ? 'green' : 'red'}-700 dark:bg-${isUp ? 'green' : 'red'}-900/30 dark:text-${isUp ? 'green' : 'red'}-400` 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>
    );
  };

  const formatTooltipDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (timeRange === '1D') {
      return format(date, 'HH:mm');
    } else if (timeRange === '1W' || timeRange === '1M') {
      return format(date, 'MMM dd');
    } else {
      return format(date, 'MMM dd, yyyy');
    }
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium">{formatTooltipDate(label)}</p>
          <p className="text-gray-700 dark:text-gray-300">
            Open: <span className="font-medium">${payload[0].payload.open.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Close: <span className="font-medium">${payload[0].payload.close.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            High: <span className="font-medium">${payload[0].payload.high.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Low: <span className="font-medium">${payload[0].payload.low.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Format x-axis ticks
  const formatXAxis = (timestamp: number) => {
    const date = new Date(timestamp);
    if (timeRange === '1D') {
      return format(date, 'HH:mm');
    } else if (timeRange === '1W') {
      return format(date, 'EEE');
    } else if (timeRange === '1M') {
      return format(date, 'dd');
    } else {
      return format(date, 'MMM dd');
    }
  };

  return (
    <motion.div 
      className={`${fullWidth ? 'w-full' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderTimeRangeButtons()}
      
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={filteredData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          className="animate-chart-transition"
        >
          <defs>
            <linearGradient id={`colorStock${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxis}
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            className="dark:stroke-gray-600"
          />
          <YAxis 
            domain={['dataMin', 'dataMax']}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
            stroke="#9ca3af"
            className="dark:stroke-gray-600"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="close" 
            stroke={chartColor} 
            fillOpacity={1}
            fill={`url(#colorStock${symbol})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default StockChart;