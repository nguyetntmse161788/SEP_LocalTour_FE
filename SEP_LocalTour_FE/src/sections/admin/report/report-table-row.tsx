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

type ReportTableHeadProps = {
  row: ReportProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function ReportTableRow({ row, selected, onSelectRow }: ReportTableHeadProps) {
  const navigate = useNavigate();

  // Hàm cập nhật trạng thái
  const updateReportStatus = async (id: number, newStatus: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No access token found. Please log in.');
      return;
    }

    try {
      // Tạo đối tượng payload với tất cả các trường, chỉ thay đổi status
      const updatedData = {
        id: row.id,
        userReportId: row.userReportId,
        userId: row.userId,
        content: row.content,
        reportDate: row.reportDate,
        status: newStatus, // Cập nhật trạng thái
      };

      await axiosInstance.put(
        // https://api.localtour.space/api/UserReport
        `https://api.localtour.space/api/UserReport/${id}`,
        updatedData, // Gửi tất cả dữ liệu nhưng thay đổi status
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Report has been updated to: ${newStatus}`);
      // Có thể gọi lại dữ liệu sau khi cập nhật nếu cần thiết.
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
      {/* <TableCell>{row.userReportId}</TableCell> */}
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
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => updateReportStatus(row.id, 'Rejected')}
          style={{ marginLeft: '8px' }}
        >
          Reject
        </Button>
      </TableCell>
    </TableRow>
  );
}
