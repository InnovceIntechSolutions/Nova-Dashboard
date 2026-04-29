

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { COLORS, BASE_TEXT_STYLE, TOOLTIP_STYLE, LEGEND_STYLE } from '../../../Types/types';
import type { BaseChartProps } from '../../../Types/types';


const LineChart: React.FC<BaseChartProps> = ({ data, options = {} }) => {
  const echartsOption = useMemo(() => {
  const series = (data?.datasets ?? []).map((ds, i) => ({
  name: ds.label ?? `Series ${i + 1}`,
  type: 'line',
  data: ds.data ?? [],
  smooth: ds.tension !== undefined ? ds.tension > 0 : true,
  symbol: 'circle',
  symbolSize: 6,
  lineStyle: {
    color: (ds.borderColor as string) ?? COLORS[i % COLORS.length],
    width: ds.borderWidth ?? 2,
  },
  itemStyle: {
    color: (ds.borderColor as string) ?? COLORS[i % COLORS.length],
  },
  areaStyle:
    ds.fill !== false && ds.backgroundColor
      ? { color: ds.backgroundColor as string }
      : undefined,
}));

    return {
      color: COLORS,
      tooltip: { ...TOOLTIP_STYLE, trigger: 'axis' },
      legend: LEGEND_STYLE,
      grid: { left: 16, right: 16, bottom: 56, top: 16, containLabel: true },
      xAxis: {
        type: 'category',
        data: data.labels,
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisTick: { show: false },
        axisLabel: BASE_TEXT_STYLE,
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLabel: BASE_TEXT_STYLE,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series,
      ...options,
    };
  }, [data, options]);
 if (data.datasets.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
        No data available
      </div>
    );
  }

  return (
    <ReactECharts
      option={echartsOption}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
      notMerge
      lazyUpdate
    />
  );
};

export default LineChart;