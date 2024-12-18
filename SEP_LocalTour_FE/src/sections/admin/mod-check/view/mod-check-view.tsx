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

import { ModCheckTableRow } from '../mod-check-table-row';
import { ModCheckTableHead } from '../mod-check-table-head';
import { ModCheckTableToolbar } from '../mod-check-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { ModCheckProps } from '../mod-check-table-row';
import { TableEmptyRows } from '../../user/table-empty-rows';
import { TableNoData } from '../../user/table-no-data';

// ----------------------------------------------------------------------

export function ModCheckView() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<ModCheckProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filterName, setFilterName] = useState('');
  const table = useTable(); 

  const [selectedDetail, setSelectedDetail] = useState<ModCheckProps | null>(null);

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
      navigate('/sign-in');
      return;
    }

    fetchModcheckplaces(token);
  }, [navigate]);

  const fetchModcheckplaces = async (token: string) => {
    try {
      const response = await axios.get('https://api.localtour.space/api/ModCheckPlace/GetAll', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched check places :', response.data);
      setUsers([...response.data.items]);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch mod check places');
    } finally {
      setLoading(false);
    }
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <ModCheckTableToolbar
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
              <ModCheckTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                headLabel={[
                  { id: 'modId', label: 'Mod ID' },
                  { id: 'modName', label: 'Mod Name' },
                  { id: 'placeId', label: 'Place ID' },
                  { id: 'placeName', label: 'Place Name' },
                  { id: 'placeMediums', label: 'Place Mediums' },
                  { id: 'modeCheckImages', label: 'Check Images' },
                  { id: 'action', label: 'Action' },
                ]}
              />

              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">Loading...</TableCell>
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
                    <ModCheckTableRow
                      key={row.placeId}
                      row={row}
                      selected={table.selected.includes(row.placeId)}
                      onSelectRow={() => table.onSelectRow(row.placeId)}
                    />
                  ))
                }
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
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}