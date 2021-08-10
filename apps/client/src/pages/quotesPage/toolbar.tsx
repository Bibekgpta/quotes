import { memo } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

interface ToolBarProps {
  count: number;
  page: number;
  pageSize: number;
  grid: boolean;
  pagination: boolean;
  className?: string;
  onGridChange: (event: boolean) => void;
  onPaginationChange: (event: boolean) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (pageSize: number) => void;
}
export const ToolBar = memo(
  ({
    count,
    page,
    pageSize,
    className,
    grid,
    pagination,
    onGridChange,
    onPaginationChange,
    onPageChange,
    onRowsPerPageChange,
  }: ToolBarProps) => {
    return (
      <div className={className}>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={count}
            rowsPerPage={pageSize}
            page={page}
            onPageChange={(event, page) => onPageChange(page)}
            onRowsPerPageChange={(event) =>
              onRowsPerPageChange(parseInt(event.target.value, 10))
            }
          />
        )}
        <FormControlLabel
          control={
            <Switch
              checked={grid}
              onChange={(event) => onGridChange(event.target.checked)}
            />
          }
          label="Grid"
        />
        <FormControlLabel
          control={
            <Switch
              checked={pagination}
              onChange={(event) => onPaginationChange(event.target.checked)}
            />
          }
          label="Pagination"
        />
      </div>
    );
  }
);

export default ToolBar;
