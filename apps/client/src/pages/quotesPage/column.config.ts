import { ICololumnConfig } from '../../components/infinite-table';
import { format } from 'date-fns';

export const quotesCulumns: ICololumnConfig[] = [
  {
    width: 100,
    label: 'Date',
    key: 'date',
    flexGrow: 2,
    render: (row) => format(new Date(row.date as string), 'MMM dd, yyyy'),
  },
  {
    width: 120,
    label: 'Open',
    key: 'open',
    isNumeric: true,
  },
  {
    width: 120,
    label: 'High',
    key: 'high',
    isNumeric: true,
  },
  {
    width: 120,
    label: 'Low',
    key: 'low',
    isNumeric: true,
  },
  {
    width: 120,
    label: 'Close',
    key: 'close',
    isNumeric: true,
  },
  {
    width: 120,
    label: 'Adj Close',
    key: 'adjClose',
    isNumeric: true,
  },
  {
    width: 120,
    label: 'Volume',
    key: 'volume',
    isNumeric: true,
  },
];
