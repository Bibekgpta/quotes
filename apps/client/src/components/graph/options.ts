export const getOptions = (
  data: any[],
  symbol: string,
  minDate: Date
): { options: ApexCharts.ApexOptions; series: any[] } => ({
  options: {
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: true,
    },
    chart: {
      id: 'area-datetime',
      type: 'area',
      height: 350,
      zoom: {
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      min: minDate.getTime(),
      tickAmount: undefined,
      crosshairs: {
        show: true,
        width: 1,
        position: 'back',
        opacity: 0.9,
        stroke: {
          color: '#b6b6b6',
          width: 0,
          dashArray: 0,
        },

        fill: {
          type: 'solid',
          color: '#B1B9C4',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          blur: 1,
          opacity: 0.4,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FF1654',
        },
        labels: {
          style: {
            colors: '#FF1654',
          },
        },
        title: {
          text: symbol,
          style: {
            color: '#FF1654',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#247BA0',
        },
        labels: {
          style: {
            colors: '#247BA0',
          },
        },
        title: {
          text: 'Volume',
          style: {
            color: '#247BA0',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    ],
    stroke: {
      curve: 'straight',
      width: 1,
    },
    dataLabels: {
      enabled: false,
      enabledOnSeries: undefined,
    },
    markers: {
      size: 0,
    },
  },
  series: [
    {
      name: symbol,
      type: 'area',

      data: data.map((item) => [item.date, item[symbol]]),
    },
    {
      name: 'volume',
      type: 'bar',
      data: data.map((item) => [item.date, item.volume]),
    },
  ],
});
