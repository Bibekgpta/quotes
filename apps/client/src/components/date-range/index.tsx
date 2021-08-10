import { memo, useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import sub from 'date-fns/sub';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    maxWidth: 300,
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface IDateRangeProps {
  start?: Date;
  end?: Date;
  onChange: (start: Date, end: Date) => void;
  onClose: () => void;
}

interface IRangeItem {
  label: string;
  period: number;
}

const rangeData: IRangeItem[] = [
  { label: '3M', period: 3 },
  { label: '6M', period: 6 },
  { label: 'YTD', period: 0 },
  { label: '1Y', period: 12 },
  { label: '2Y', period: 24 },
  { label: '3Y', period: 36 },
  { label: '5Y', period: 60 },
];

export const DateRange = memo(
  ({ start, end, onChange, onClose }: IDateRangeProps) => {
    const classes = useStyles();
    const [selectedDates, setSelectedDates] = useState<{
      start: Date;
      end: Date;
    }>({
      start: start || new Date(),
      end: end || new Date(),
    });

    const handleDateChange = (key: string) => (date: Date | null) => {
      setSelectedDates({ ...selectedDates, [key]: date });
    };
    const handleClick = (item: IRangeItem) => () => {
      const end = new Date();
      const start =
        item.label === 'YTD'
          ? new Date(end.getFullYear(), 0, 1)
          : sub(end, { months: item.period });

      setSelectedDates({ start, end });
    };
    return (
      <Paper className={classes.root}>
        {rangeData.map((item) => (
          <Chip
            key={item.label}
            className={classes.chip}
            label={item.label}
            onClick={handleClick(item)}
          />
        ))}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            autoOk
            disableFuture
            variant="inline"
            margin="normal"
            label="Start Date"
            format="dd/MM/yyyy"
            value={selectedDates.start}
            onChange={handleDateChange('start')}
          />
          <KeyboardDatePicker
            disableToolbar
            autoOk
            disableFuture
            variant="inline"
            margin="normal"
            label="End Date"
            format="dd/MM/yyyy"
            value={selectedDates.end}
            onChange={handleDateChange('end')}
          />
        </MuiPickersUtilsProvider>
        <div className={classes.action}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onChange(selectedDates.start, selectedDates.end)}
          >
            Apply
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Paper>
    );
  }
);
