import { memo, useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tooltip from '@material-ui/core/Tooltip';
import { DateRange } from '../../components';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  range: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 2),
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
  select: {
    width: 300,
    margin: theme.spacing(0, 3),
  },
}));

export interface IFilter {
  start: Date;
  end: Date;
  symbol?: string;
}

interface ISFilterBarProps extends IFilter {
  onChange: (filter: IFilter) => void;
  showSymbol?: boolean;
}

export const FilterBar = memo(
  ({ onChange, start, end, symbol, showSymbol = false }: ISFilterBarProps) => {
    const classes = useStyles();
    const [state, setState] = useState<IFilter>({ start, end, symbol });
    const [open, setOpen] = useState(false);
    const handleTooltipClose = () => {
      setOpen(false);
    };

    const handleTooltipOpen = () => {
      setOpen(true);
    };
    return (
      <Paper className={classes.root}>
        <div>
          <span>Time Period:</span>
        </div>
        {/* <ClickAwayListener onClickAway={handleTooltipClose}> */}
        <Tooltip
          open={open}
          disableFocusListener
          disableHoverListener
          interactive
          title={
            <DateRange
              onChange={(start, end) => setState({ ...state, start, end })}
              start={state.start}
              end={state.end}
              onClose={handleTooltipClose}
            />
          }
        >
          <span className={classes.range} onClick={handleTooltipOpen}>
            {state.start.toDateString()} - {state.end.toDateString()}{' '}
            <KeyboardArrowDownIcon />
          </span>
        </Tooltip>
        {/* </ClickAwayListener> */}
        {showSymbol && (
          <FormControl className={classes.select}>
            <InputLabel>Select symbol</InputLabel>
            <Select
              value={state.symbol}
              margin="dense"
              variant="outlined"
              onChange={(event) =>
                setState({ ...state, symbol: event.target.value as string })
              }
            >
              <MenuItem value="open">OPEH</MenuItem>
              <MenuItem value="high">HIGH</MenuItem>
              <MenuItem value="low">LOW</MenuItem>
              <MenuItem value="close">CLOSE</MenuItem>
              <MenuItem value="adjClose">ADJ_CLOSE</MenuItem>
            </Select>
          </FormControl>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => onChange(state)}
        >
          Apply
        </Button>
      </Paper>
    );
  }
);
