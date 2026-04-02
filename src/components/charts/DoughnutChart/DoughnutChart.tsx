
import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import {  COLORS, TOOLTIP_STYLE, LEGEND_STYLE } from '../../../Types/types';
import type { BaseChartProps } from '../../../Types/types';

const DoughnutChart: React.FC<BaseChartProps> = ({ data, options = {} }) => {
  const dataset = data.datasets[0] ?? { data: [] };

  const total = useMemo(
    () => dataset.data.reduce((sum, v) => sum + (v ?? 0), 0),
    [dataset.data]
  );

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
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '38%',
          style: {
            text: String(total),
            textAlign: 'center',
            fill: '#111827',
            fontSize: 22,
            fontWeight: 'bold',
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '48%',
          style: {
            text: 'Total',
            textAlign: 'center',
            fill: '#9ca3af',
            fontSize: 12,
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['45%', '68%'],
          center: ['50%', '45%'],
          data: seriesData,
          label: { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 12,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.25)',
            },
            scaleSize: 5,
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
        },
      ],
      ...options,
    };
  }, [data, dataset, total, options]);

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

export default DoughnutChart;