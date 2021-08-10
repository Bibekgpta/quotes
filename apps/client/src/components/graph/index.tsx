import { memo, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getOptions } from './options';

interface IGraphProps {
  data: any[];
  symbol: string;
  minDate: Date;
}

export const Graph = memo(({ data, symbol, minDate }: IGraphProps) => {
  const [state, setState] = useState(getOptions(data, symbol, minDate));

  useEffect(() => {
    setState(getOptions(data, symbol, minDate));
  }, [data, minDate, symbol]);
  return (
    <div className="area">
      <Chart
        options={state.options}
        series={state.series}
        height={200}
        type="bar"
      />
    </div>
  );
});
