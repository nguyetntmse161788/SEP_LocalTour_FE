import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '../user/utils';


// ----------------------------------------------------------------------

type ReportTableHeadProps = {
  orderBy: string;
  rowCount: number;
  numSelected: number;
  order: 'asc' | 'desc';
  onSort: (id: string) => void;
  headLabel: Record<string, any>[];
  onSelectAllRows?  : (checked: boolean) => void;
};

export function ReportTableHead({
  order,
  onSort,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onSelectAllRows,
}: ReportTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>User Avatar</TableCell>
        <TableCell>User ID</TableCell>
        <TableCell>Content</TableCell>
        <TableCell>Report Date</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
  );
}
