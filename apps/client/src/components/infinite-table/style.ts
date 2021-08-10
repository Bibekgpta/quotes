import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core';
import { ToggleButtonGroup } from '@material-ui/lab';

export const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    '& .ReactVirtualized__Table__headerRow, & .ReactVirtualized__Table__row': {
      display: 'flex',
    },
    '& > * ': {
      outline: 'none',
    },
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
    padding: theme.spacing(1),
  },
}));

export const useHeaderToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      border: `1px solid ${theme.palette.divider}`,
      position: 'absolute',
      width: '100%',
      height: 50,
      left: 0,
      zIndex: 10,
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
    right: {
      position: 'absolute',
      right: 0,
    },
  })
);

export const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);
