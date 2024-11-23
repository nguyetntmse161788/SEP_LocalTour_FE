import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { EventTableRow } from 'src/sections/event/event-table-row'; 
import { EventTableHead } from 'src/sections/event/event-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { EventTableToolbar } from 'src/sections/event/event-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { EventProps } from 'src/sections/event/event-table-row';

// ----------------------------------------------------------------------

// Fetch events instead of places
const fetchEvents = async (languageCode = 'vi') => {
  const token = localStorage.getItem('accessToken');
  console.log('Access Token:', token);  // Kiểm tra token
  
  if (!token) {
    console.error('No access token found');
    return [];
  }

  try {
    const response = await axios.get(`https://api.localtour.space/api/Event/getallevent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log('API Response:', response.data);  // Kiểm tra dữ liệu trả về
    return response.data.items;  // Trả về items chứa danh sách events
  } catch (error) {
    console.error("Error fetching events", error);
    return [];
  }
};

export function EventView() {
  const [events, setEvents] = useState<EventProps[]>([]);  // Renamed to events
  const [filterName, setFilterName] = useState('');
  const [languageCode, setLanguageCode] = useState<string>('vi'); // Ngôn ngữ mặc định là Vietnamese

  // Lấy dữ liệu khi component được render lần đầu
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEvents(languageCode);  // Fetch events from API
      setEvents(data);  // Cập nhật dữ liệu events
    };
    fetchData();
  }, [languageCode]);

  const table = useTable();

  const dataFiltered: EventProps[] = applyFilter({
    inputData: events,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Events  {/* Updated heading */}
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New event  {/* Updated button text */}
        </Button>
      </Box>

      <Card>
        <EventTableToolbar  // Updated to EventTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EventTableHead  // Updated to EventTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={events.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked: boolean) =>
                  table.onSelectAllRows(
                    checked,
                    events.map((event) => event.id.toString())  // Updated to map events
                  )
                }
                headLabel={[
                  { id: 'eventName', label: 'Event Name' },
                  { id: 'desciption', label: 'Description' }, 
                  { id: 'placeName', label: 'Place Name' }, 
                  { id: 'startDate - endDate', label: 'Start Date - End Date' }, 
                  { id: 'status', label: 'Status' },
                  { id: 'View details', label: 'View details' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <EventTableRow  // Updated to EventTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, events.length)}  // Updated to events
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={events.length}  // Updated to events
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('eventName');  // Updated to eventName
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
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
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
