export const getOptions = (data: any[], symbol: string) => ({
  options: {
    xaxis: {
      type: 'datetime',
      min: new Date(2020, 1, 1).getTime(),
      tickAmount: undefined,
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
      },
    ],
    stroke: {
      curve: 'straight',
      width: 1,
    },
    stacked: false,
    dataLabels: {
      enabled: false,
      enabledOnSeries: undefined,
    },
    markers: {
      size: 0,
      style: 'hollow',
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
