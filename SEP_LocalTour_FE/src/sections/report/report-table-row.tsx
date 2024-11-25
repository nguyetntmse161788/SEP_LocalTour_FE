import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import { TableCell } from '@mui/material';

export type ReportProps = {
    id: number;
    userReportId: string;
    userId: string;
    content: string;
    reportDate: string;
    status: string;
    profilePictureUrl?: string; // Optional for user avatars
    role?: string; // Optional for user roles
  };

type ReportTableHeadProps = {
  row: ReportProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ReportTableRow({ row, selected, onSelectRow }: ReportTableHeadProps) {
    const navigate = useNavigate();
    return (
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.userReportId}</TableCell>
        <TableCell>{row.userId}</TableCell>
        <TableCell>{row.content}</TableCell>
        <TableCell>{new Date(row.reportDate).toLocaleString()}</TableCell>
        <TableCell>{row.status}</TableCell>
      </TableRow>
    );
  }
  
