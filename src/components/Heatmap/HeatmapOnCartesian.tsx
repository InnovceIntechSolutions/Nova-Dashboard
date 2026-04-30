import React from "react";
import ReactECharts from "echarts-for-react";

interface HeatmapProps {
  data: any;
}

const HeatmapChart: React.FC<HeatmapProps> = ({ data }) => {
  console.log("Heatmap data:", data);

  let days: string[] = data?.days || [];
  let hours: string[] = data?.hours || [];
  let heatmapData: [number, number, number][] = [];

  // 🔥 CASE 1: Apache format already ([x, y, value])
  if (Array.isArray(data) || data?.flatData) {
    const raw = data?.flatData || data;

    heatmapData = raw.map((item: any) => [
      item[1], // x
      item[0], // y
      item[2] || "-"
    ]);

    // Auto fallback axis if not provided
    if (!hours.length) {
      hours = Array.from({ length: 24 }, (_, i) => `${i}h`);
    }
    if (!days.length) {
      days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
  }

  // 🔥 CASE 2: Your existing matrix format
  else if (data?.values) {
    const values: number[][] = data.values;

    days = days.length ? days : values.map((_: any, i: number) => `Row ${i + 1}`);
    hours =
      hours.length && values[0]
        ? hours
        : (values[0] || []).map((_: any, i: number) => `Col ${i + 1}`);

    values.forEach((row: number[], rowIndex: number) => {
      row.forEach((val: number, colIndex: number) => {
        heatmapData.push([colIndex, rowIndex, val]);
      });
    });
  }

  const maxValue = Math.max(...heatmapData.map((d) => d[2] || 0), 10);

  const option = {
    tooltip: {
      position: "top",
      formatter: (params: any) => {
        const [x, y, value] = params.data;
        return `${days[y]} - ${hours[x]} : ${value}`;
      }
    },
    grid: {
      height: "60%",
      top: "10%"
    },
    xAxis: {
      type: "category",
      data: hours,
      splitArea: { show: true }
    },
    yAxis: {
      type: "category",
      data: days,
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: maxValue,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "5%",
      inRange: {
        color: ["#e3f2fd", "#64b5f6", "#2196f3", "#0d47a1"]
      }
    },
    series: [
      {
        name: "Heatmap",
        type: "heatmap",
        data: heatmapData,
        label: { show: true },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.5)"
          }
        }
      }
    ]
  };
// if (data.length === 0 || heatmapData.length === 0 ||data?.flatData.length === 0) {
//     return (
//       <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
//         No data available
//       </div>
//     );
//   }
  return (
    <div style={{ width: "100%", height: "350px" }}> {/* 🔥 FIX HEIGHT */}
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
};

export default HeatmapChart;