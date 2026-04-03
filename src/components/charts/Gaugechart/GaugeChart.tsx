

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { COLORS,  TOOLTIP_STYLE } from '../../../Types/types';
import type { BaseChartProps } from '../../../Types/types';



const GaugeChart: React.FC<BaseChartProps> = ({ data, options = {} }) => {
  // For gauge: use first dataset's first value as the gauge value (0–100)
  const value = data.datasets[0]?.data[0] ?? 0;
  const label = data.datasets[0]?.label ?? data.labels[0] ?? 'Value';

  const echartsOption = useMemo(() => ({
    tooltip: {
      ...TOOLTIP_STYLE,
      formatter: '{b}: <b>{c}%</b>',
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          color: COLORS[0],
        },
        progress: {
          show: true,
          width: 14,
        },
        pointer: {
          show: true,
          length: '60%',
          width: 5,
          itemStyle: { color: COLORS[0] },
        },
        axisLine: {
          lineStyle: {
            width: 14,
            color: [[1, '#f3f4f6']],
          },
        },
        axisTick: {
          distance: -22,
          splitNumber: 5,
          lineStyle: { width: 1, color: '#d1d5db' },
        },
        splitLine: {
          distance: -26,
          length: 10,
          lineStyle: { width: 2, color: '#d1d5db' },
        },
        axisLabel: {
          distance: -8,
          color: '#9ca3af',
          fontSize: 10,
          rotate: 'tangential',
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 14,
          itemStyle: {
            borderWidth: 3,
            borderColor: COLORS[0],
            color: '#fff',
          },
        },
        title: {
          show: true,
          offsetCenter: [0, '30%'],
          fontSize: 13,
          color: '#6b7280',
          fontWeight: '500',
        },
        detail: {
          valueAnimation: true,
          fontSize: 28,
          fontWeight: 'bold',
          color: '#111827',
          offsetCenter: [0, '60%'],
          formatter: '{value}%',
        },
        data: [{ value, name: label }],
      },
    ],
    ...options,
  }), [value, label, options]);

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

export default GaugeChart;