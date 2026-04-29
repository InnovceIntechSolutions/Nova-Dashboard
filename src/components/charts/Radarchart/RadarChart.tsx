

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import {  COLORS, BASE_TEXT_STYLE, TOOLTIP_STYLE, LEGEND_STYLE } from '../../../Types/types';
import type { BaseChartProps } from '../../../Types/types';


const RadarChart: React.FC<BaseChartProps> = ({ data, options = {} }) => {
  const axisMax = useMemo(() => {
    return data.labels.map((_, axisIdx) => {
      const vals = data.datasets.map((ds) => ds.data[axisIdx] ?? 0);
      return Math.ceil(Math.max(...vals) * 1.2);
    });
  }, [data]);

  const echartsOption = useMemo(() => {
    const indicators = data.labels.map((label, i) => ({
      name: label,
      max: axisMax[i],
    }));

    const series = data.datasets.map((ds, i) => ({
      name: ds.label ?? `Series ${i + 1}`,
      type: 'radar',
      data: [
        {
          value: ds.data,
          name: ds.label ?? `Series ${i + 1}`,
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            color: (ds.borderColor as string) ?? COLORS[i % COLORS.length],
          },
          areaStyle: {
            color:
              (ds.backgroundColor as string) ??
              `${COLORS[i % COLORS.length]}26`,
          },
        },
      ],
      lineStyle: {
        color: (ds.borderColor as string) ?? COLORS[i % COLORS.length],
        width: 2,
      },
    }));

    return {
      color: COLORS,
      tooltip: { ...TOOLTIP_STYLE, trigger: 'item' },
      legend: LEGEND_STYLE,
      radar: {
        indicator: indicators,
        axisNameGap: 8,
        axisName: { ...BASE_TEXT_STYLE, formatter: '{value}' },
        splitLine: { lineStyle: { color: '#e5e7eb' } },
        splitArea: { show: false },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
      },
      series,
      ...options,
    };
  }, [data, axisMax, options]);
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

export default RadarChart;