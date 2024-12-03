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

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableEmptyRows } from 'src/sections/user/table-empty-rows';
import { TableNoData } from 'src/sections/user/table-no-data';
import { UserTableHead } from 'src/sections/admin/user/user-table-head';
import { UserTableToolbar } from 'src/sections/user/user-table-toolbar';
import { applyFilter2, getComparator, emptyRows } from 'src/sections/admin/user/utils';
import { ReportProps, ReportTableRow } from '../report-table-row';

export function ReportUserView() {
  const [userReports, setUserReports] = useState<ReportProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filterName, setFilterName] = useState('');
  const table = useTable();

  const navigate = useNavigate();
  const memoizedNavigate = useCallback(() => navigate('/some-path'), [navigate]);


  const handleAuthError = useCallback((message: string) => {
    setError(message);
    setLoading(false);
    navigate('/sign-in');
  }, [navigate]);
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
  
    if (!token) {
      handleAuthError('No access token found. Please log in.');
      return;
    }
  
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
  
    if (decodedToken.exp < currentTime) {
      handleAuthError('Token has expired. Please log in again.');
      return;
    }
  
    fetchUserReports(token);
  }, [memoizedNavigate, handleAuthError]);  // `handleAuthError` is now stable

  // const handleAuthError = (message: string) => {
  //   setError(message);
  //   setLoading(false);
  //   navigate('/login');
  // };

  const fetchUserReports = async (token: string) => {
    setLoading(true);
    try {
      // https://api.localtour.space/api/UserReport
      // https://localhost:44388/api/UserReport
      const response = await axios.get('https://api.localtour.space/api/UserReport', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserReports(response.data);
    } catch (err) {
      setError('Failed to fetch user reports');
    } finally {
      setLoading(false);
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
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => navigate('/create-report')}
        >
          New Report
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={(e) => {
            setFilterName(e.target.value);
            table.onResetPage();
          }}
          numSelected={0}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={userReports.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                headLabel={[
                  { id: 'id', label: 'ID' },
                  { id: 'userId', label: 'User ID' },
                  { id: 'content', label: 'Content' },
                  { id: 'reportDate', label: 'Report Date' },
                  { id: 'status', label: 'Status' },
                  { id: 'action', label: 'Action' },
                ]}
              />

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
                      key={row.userId}
                      row={row}
                      selected={table.selected.includes(row.userId)}
                      onSelectRow={() => table.onSelectRow(row.userId)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, userReports.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

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

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('userReportId');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback((id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  }, [order, orderBy]);

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      setSelected((prev) =>
        prev.includes(inputValue)
          ? prev.filter((value) => value !== inputValue)
          : [...prev, inputValue]
      );
    },
    []
  );

  const onResetPage = useCallback(() => setPage(0), []);
  const onChangePage = useCallback((_: any, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    onSort,
    onSelectRow,
    onSelectAllRows,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}
