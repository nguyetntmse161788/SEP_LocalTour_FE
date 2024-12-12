
// ----------------------------------------------------------------------

import { Card, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Scrollbar } from "src/components/scrollbar";
import { TableEmptyRows } from "../../user/table-empty-rows";
import { ModTableHead } from "../mod-table-head";
import { ModTableToolbar } from "../mod-table-toolbar";
import { applyFilter, getComparator, emptyRows } from "../utils";
import { TableNoData } from "../../user/table-no-data";
import { ModProps, ModTableRow } from "../mod-table-row";

export function ModView() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<ModProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filterName, setFilterName] = useState('');
  const table = useTable(); 

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

    fetchUsers(token);
  }, [navigate]);

  const fetchUsers = async (token: string) => {
    try {
      const response = await axios.get('https://api.localtour.space/api/User/getListByRole?roleName=Moderator', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched Users:', response.data);
      setUsers([...response.data]);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Filtered data based on search input
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
        <ModTableToolbar
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
              <ModTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                headLabel={[
                  { id: 'avatar', label: 'Avatar' },
                  { id: 'userId', label: 'User ID' },
                  { id: 'username', label: 'User Name' },
                  { id: 'fullName', label: 'Full Name' },
                  { id: 'button', label: 'Action' }
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
                    <ModTableRow
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
