import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  TableRow,
  TableCell,
} from '@mui/material';

import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../user-table-row';
import { useTable } from 'src/sections/user/view';

export function UserView() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterName, setFilterName] = useState('');
  const table = useTable();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token || isTokenExpired(token)) {
      navigateToLogin('Token is invalid or expired.');
      return;
    }

    fetchUsers(token);
    fetchBannedUsers(token);
  }, [navigate]);

  const isTokenExpired = (token: string): boolean => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp < Math.floor(Date.now() / 1000);
  };

  const navigateToLogin = (message: string) => {
    setError(message);
    setLoading(false);
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const fetchUsers = async (token: string) => {
    try {
      const { data } = await axios.get('https://api.localtour.space/api/User/getlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBannedUsers = async (token: string) => {
    try {
      const { data } = await axios.get('https://api.localtour.space/api/User/getUserBan', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBannedUsers(data.map((user: { userId: string }) => user.userId));
    } catch {
      console.error('Failed to fetch banned users.');
    }
  };

  const filteredData = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
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
                headLabel={[
                  { id: 'avatar', label: 'Avatar' },
                  { id: 'username', label: 'User Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'fullname', label: 'Full Name' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'role', label: 'Role' },
                  { id: 'button', label: 'Action' },
                ]}
              />
              <TableBody>
                {filteredData
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      isBanned={bannedUsers.includes(row.id)}
                      setBannedUsers={setBannedUsers} // Pass it as a prop
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />

                  ))}
                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />
                {!filteredData.length && <TableNoData searchQuery={filterName} />}
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
