

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { COLORS, TOOLTIP_STYLE} from '../../../Types/types';
import type { BaseChartProps } from '../../../Types/types';

const HalfDoughnutChart: React.FC<BaseChartProps> = ({ data, options = {} }) => {
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
      legend: {
        top: 0,
        left: 'center',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: '#6b7280', fontSize: 12 },
      },
      series: [
        {
          type: 'pie',
          // startAngle 180 → 0 gives the top half (semicircle)
          startAngle: 180,
          endAngle: 360,
          radius: ['45%', '75%'],
          center: ['50%', '75%'],
          data: seriesData,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}',
            fontSize: 11,
            color: '#6b7280',
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
            lineStyle: { color: '#d1d5db' },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0,0,0,0.2)',
            },
            scaleSize: 5,
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

export default HalfDoughnutChart;