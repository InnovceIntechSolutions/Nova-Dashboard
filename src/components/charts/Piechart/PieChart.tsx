
import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import {  COLORS, TOOLTIP_STYLE, LEGEND_STYLE } from '../../../Types/types';
import type { BaseChartProps } from '../../../Types/types';

const PieChart: React.FC<BaseChartProps> = ({ data, options = {} }) => {
  const dataset = data.datasets[0] ?? { data: [] };

  const echartsOption = useMemo(() => {
    const seriesData = data.labels.map((label, i) => ({
      name: label,
      value: dataset.data[i] ?? 0,
    }));

    return {
      color: Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor
        : COLORS,
      tooltip: {
        ...TOOLTIP_STYLE,
        trigger: 'item',
        formatter: '{b}: <b>{c}</b> ({d}%)',
      },
      legend: { ...LEGEND_STYLE, type: 'scroll' },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '45%'],
          data: seriesData,
          label: { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 12,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.25)',
            },
            scaleSize: 6,
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
        },
      ],
      ...options,
    };
  }, [data, dataset, options]);

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

export default PieChart;