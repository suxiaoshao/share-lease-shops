import { ThemeOption } from 'echarts/types/src/util/types';
import { Theme } from '@material-ui/core';

export const darkTheme = (MuiTheme: Theme): ThemeOption => {
  const contrastColor = '#eee';
  const axisCommon = {
    axisLine: {
      lineStyle: {
        color: contrastColor,
      },
    },
    axisTick: {
      lineStyle: {
        color: contrastColor,
      },
    },
    axisLabel: {
      textStyle: {
        color: contrastColor,
      },
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#aaa',
      },
    },
    splitArea: {
      areaStyle: {
        color: contrastColor,
      },
    },
  };

  const colorPalette = [
    '#dd6b66',
    '#759aa0',
    '#e69d87',
    '#8dc1a9',
    '#ea7e53',
    '#eedd78',
    '#73a373',
    '#73b9bc',
    '#7289ab',
    '#91ca8c',
    '#f49f42',
  ];
  const theme: ThemeOption = {
    color: colorPalette,
    backgroundColor: MuiTheme.palette.background.paper,
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: contrastColor,
        },
        crossStyle: {
          color: contrastColor,
        },
      },
    },
    legend: {
      textStyle: {
        color: contrastColor,
      },
    },
    textStyle: {
      color: contrastColor,
    },
    title: {
      textStyle: {
        color: contrastColor,
      },
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: contrastColor,
        },
      },
    },
    dataZoom: {
      textStyle: {
        color: contrastColor,
      },
    },
    timeline: {
      lineStyle: {
        color: contrastColor,
      },
      itemStyle: {
        normal: {
          color: colorPalette[1],
        },
      },
      label: {
        normal: {
          textStyle: {
            color: contrastColor,
          },
        },
      },
      controlStyle: {
        normal: {
          color: contrastColor,
          borderColor: contrastColor,
        },
      },
    },
    timeAxis: axisCommon,
    logAxis: axisCommon,
    valueAxis: axisCommon,
    categoryAxis: axisCommon,

    line: {
      symbol: 'circle',
    },
    graph: {
      color: colorPalette,
    },
    gauge: {
      title: {
        textStyle: {
          color: contrastColor,
        },
      },
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: '#FD1050',
          color0: '#0CF49B',
          borderColor: '#FD1050',
          borderColor0: '#0CF49B',
        },
      },
    },
  };
  theme.categoryAxis.splitLine.show = false;
  return theme;
};
