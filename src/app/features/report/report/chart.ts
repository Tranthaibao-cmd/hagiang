export const chart = {
  legendVisible: {
    width: '100%',
    enablePages: false,
    textStyle: { textAlignment: 'Center' },
    visible: true,
  },
  legendHidden: {
    width: '100%',
    enablePages: false,
    textStyle: { textAlignment: 'Center' },
    visible: false,
  },
  primaryXAxis: {
    valueType: 'Category',
    labelRotation: -45,
    labelFormat: 'y',
    intervalType: 1,
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
  },
  primaryXDateTimeAxis: {
    valueType: 'DateTime',
    // labelRotation: -45,
    labelFormat: 'MM-y',
    // intervalType: 1,
    // edgeLabelPlacement: 'Shift',
    interval: 1,
    intervalType: 'Months',

    rangePadding: 'Additional',
    labelIntersectAction: 'Rotate90',
    // majorGridLines: { width: 0 },
  },
  primaryXMonthTimeAxis: {
    valueType: 'DateTime',
    
    labelFormat: 'MM',

    interval: 1,
    intervalType: 'Months',
    rangePadding: 'Additional',
    labelIntersectAction: 'Rotate90',

    // valueType: 'Category',
    
    // labelFormat: 'MM',
    // interval: 1,
    // minimum:1,
    // maximum:12,
    // majorGridLines: { width: 0 },
  },
  primaryYAxis: {
    labelFormat: '{value}',
    rangePadding: 'None',
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    titleStyle: {
      display: 'block',
    },
  },
  chartArea: {
    border: {
      width: 0,
    },
  },
  marker: {
    visible: true,
    height: 10,
    width: 10,
  },
  indiMarker: {
    dataLabel: {
      visible: true,
      position: 'Top',
      font: { fontWeight: '600', color: '#ffffff' },
    },
  },
  zoomSettings: {
    mode: 'X',
    enableMouseWheelZooming: true,
    enablePinchZooming: true,
    enableSelectionZooming: true,
    enableScrollbar: true,
  },
  tooltip: {
    enable: true,
  },
  chartType: [
    { text: 'Biểu đồ đường', value: 'Line' },
    { text: 'Biểu đồ miền', value: 'StackingArea100' },
    { text: 'Biểu đồ cột', value: 'Column' },
  ],
};
