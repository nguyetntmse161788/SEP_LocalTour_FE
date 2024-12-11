import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { ReportProps, ReportTableRow } from '../report-table-row';
import { applyFilter2, getComparator } from '../../user/utils';
import { useTable } from '../../user/view';

export function ReportUserView() {
  const [userReports, setUserReports] = useState<ReportProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filterName, setFilterName] = useState('');
  const table = useTable();

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No access token found. Please log in.');
      return;
    }

    fetchUserReports(token);
  }, []);  // Only fetch reports on component mount

  const fetchUserReports = async (token: string) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.localtour.space/api/UserReport/GetAll', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserReports(response.data);
    } catch (err) {
      setError('Failed to fetch user reports');
    } finally {
      setLoading(false);
    }
  };

  // Callback to update the report list when status is updated
  const handleStatusUpdate = async (updatedReports: ReportProps[]) => {
    setUserReports(updatedReports);
    // Re-fetch user reports after updating status
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserReports(token);
    }
  };

  const dataFiltered = applyFilter2({
    reportData: userReports,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          User Reports
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate('/create-report')}
        >
          New Report
        </Button>
      </Box>

      <Card>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableBody>
              {error && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: 'error.main' }}>
                    {error}
                  </TableCell>
                </TableRow>
              )}

              {dataFiltered
                .slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage)
                .map((row) => (
                  <ReportTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.userId)}
                    onSelectRow={() => table.onSelectRow(row.userId)}
                    onStatusUpdate={handleStatusUpdate}  // Pass status update handler
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          page={table.page}
          count={userReports.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}
