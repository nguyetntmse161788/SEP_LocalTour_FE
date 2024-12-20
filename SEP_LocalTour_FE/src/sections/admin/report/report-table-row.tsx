import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import axiosInstance from 'src/utils/axiosInstance';

export type ReportProps = {
  id: number;
  userReportId: string;
  userId: string;
  content: string;
  reportDate: string;
  status: string;
};

type ReportTableRowProps = {
  row: ReportProps;
  selected: boolean;
  onSelectRow: () => void;
  onStatusUpdate: (updatedReports: ReportProps[]) => void;  // Callback for status update
};

export function ReportTableRow({ row, selected, onSelectRow, onStatusUpdate }: ReportTableRowProps) {
  const navigate = useNavigate();

  // Hàm cập nhật trạng thái
  const updateReportStatus = async (id: number, newStatus: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No access token found. Please log in.');
      return;
    }

    try {
      const updatedData = {
        id: row.id,
        // userReportId: row.userReportId,
        // userId: row.userId,
        // content: row.content,
        // reportDate: row.reportDate,
        status: newStatus, // Cập nhật trạng thái
      };

      await axiosInstance.put(
        `https://api.localtour.space/api/UserReport`,
        updatedData, 
        { headers: { Authorization: `Bearer ${token} `} }
      );
      alert(`Report has been updated to: ${newStatus}`);
      
      // Re-fetch the report data after update
      const response = await axiosInstance.get('https://api.localtour.space/api/UserReport', {
        headers: { Authorization: `Bearer ${token} `}
      });
      onStatusUpdate(response.data);  // Notify parent to update reports list
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error message:', err.message);
        console.error('Response data:', err.response?.data);
        alert(`Failed to update report: ${err.response?.data?.message || err.message}`);
      } else {
        console.error('Unexpected error', err);
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.userId}</TableCell>
      <TableCell>{row.content}</TableCell>
      <TableCell>{new Date(row.reportDate).toLocaleString()}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={() => updateReportStatus(row.id, 'Accepted')}
          disabled={row.status === 'Accepted'}
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => updateReportStatus(row.id, 'Rejected')}
          style={{ marginLeft: '8px' }}
          disabled={row.status === 'Rejected'}
        >
          Reject
        </Button>
      </TableCell>
    </TableRow>
  );
}