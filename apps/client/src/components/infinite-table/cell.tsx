import { TableCell, TableCellProps } from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './style';
import { AnyObject, ChildComponent, ICololumnConfig } from './type';

const CellWrapper = ({
  children,
  isNumeric,
  rowHeight = 50,
  ...props
}: {
  rowHeight?: number;
  isNumeric: boolean;
  children: ChildComponent | string;
} & TableCellProps) => {
  const classes = useStyles();

  return (
    <TableCell
      component="div"
      style={{ height: rowHeight }}
      className={clsx(classes.tableCell, classes.flexContainer)}
      align={isNumeric ? 'right' : 'left'}
      {...props}
    >
      {children}
    </TableCell>
  );
};

interface CellRendererProps {
  column: ICololumnConfig;
  rowHeight?: number;
  item: AnyObject;
}

export const CellRenderer = ({
  rowHeight = 50,
  column,
  item,
}: CellRendererProps & TableCellProps) => {
  const { isNumeric, key, render } = column;
  const value = item[key] as string;

  return (
    <CellWrapper variant="body" isNumeric={!!isNumeric} rowHeight={rowHeight}>
      {render ? render(item) : value}
    </CellWrapper>
  );
};

interface HeaderCellRendererProps {
  column: ICololumnConfig;
  rowHeight?: number;
}

export const HeaderCellRenderer = ({
  rowHeight,
  column,
}: HeaderCellRendererProps & TableCellProps) => {
  const { isNumeric } = column;
  return (
    <CellWrapper variant="head" isNumeric={!!isNumeric} rowHeight={rowHeight}>
      <span>{column.label}</span>
    </CellWrapper>
  );
};
