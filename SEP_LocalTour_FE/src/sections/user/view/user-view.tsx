import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Import axios

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

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';

// ----------------------------------------------------------------------

export function UserView() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filterName, setFilterName] = useState('');
  const table = useTable(); // Hook quản lý bảng

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found. Please log in.');
      setLoading(false);
      navigate('/login');
      return;
    }
  
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
  
    if (decodedToken.exp < currentTime) {
      setError('Token has expired. Please log in again.');
      setLoading(false);
      navigate('/login');
      return;
    }
  
    fetchUsers(token);
  }, [navigate]);
  
  const fetchUsers = async (token: string) => {
    try {
      const response = await axios.get('https://api.localtour.space/api/User', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };
  

  // Dữ liệu đã lọc theo tìm kiếm
  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={5}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => navigate('/register')}
        >
          New user
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
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                // onSelectAllRows={(checked) =>
                //   table.onSelectAllRows(checked, users.map((user) => user.id))
                // }
                headLabel={[
                  { id: 'avatar', label: 'Avatar' },
                  // { id: 'id', label: 'Id' },
                  { id: 'username', label: 'Username' },
                  { id: 'email', label: 'Email' },
                  { id: 'fullname', label: 'Full Name' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'DoB', label: 'Date of Birth' },
                  { id: 'address', label: 'Address' },
                  { id: 'button', label: 'Action' },  // Changed to more appropriate label
                ]}
              />

              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">Loading...</TableCell>  {/* Adjusted to cover all columns */}
                  </TableRow>
                )}

                {error && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>
                      {error}
                    </TableCell>
                  </TableRow>
                )}

                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
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
  const [orderBy, setOrderBy] = useState('username');
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
  const onChangePage = useCallback((_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
