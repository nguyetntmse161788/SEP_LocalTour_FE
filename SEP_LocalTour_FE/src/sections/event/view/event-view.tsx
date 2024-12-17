import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import axiosInstance from 'src/utils/axiosInstance';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import type { EventProps } from 'src/sections/event/event-table-row';
import { EventTableRow } from 'src/sections/event/event-table-row';
import { EventTableHead } from 'src/sections/event/event-table-head';
import { EventTableToolbar } from 'src/sections/event/event-table-toolbar';
import { TableEmptyRows } from '../table-empty-rows';
import { TableNoData } from '../table-no-data';
import { emptyRows, applyFilter, getComparator } from '../utils';





// ----------------------------------------------------------------------

// Hàm fetchEvents hỗ trợ phân trang
const fetchEvents = async (pageNumber = 1, rowsPerPage = 5, languageCode = 'vi') => {
  const token = localStorage.getItem('accessToken');
  console.log('Access Token:', token);  // Kiểm tra token
  
  if (!token) {
    console.error('No access token found');
    return { items: [], totalCount: 0 };  // Trả về dữ liệu rỗng nếu không có token
  }

  try {
    const response = await axiosInstance.get(`https://api.localtour.space/api/Event/getallevent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        LanguageCode: languageCode,
        Page: pageNumber,
        Size: rowsPerPage
      }
    });
    console.log('API Response:', response.data);  // Kiểm tra dữ liệu trả về
    return {
      items: response.data.items,  // Danh sách events
      totalCount: response.data.totalCount,  // Tổng số bản ghi
    };
  } catch (error) {
    console.error("Error fetching events", error);
    return { items: [], totalCount: 0 };  // Trả về dữ liệu rỗng nếu có lỗi
  }
};
const updateEventStatus = async (placeId: number, eventId: number, status: string) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found');
    return null;
  }

  try {
    const response = await axiosInstance.put(
      `https://api.localtour.space/api/Event/changeStatusEvent`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { placeid: placeId, eventid: eventId, status },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating event status:', error);
    return null;
  }
};
export function EventView() {
  const [events, setEvents] = useState<EventProps[]>([]);  // Danh sách sự kiện
  const [totalCount, setTotalCount] = useState<number>(0);  // Tổng số lượng sự kiện
  const [filterName, setFilterName] = useState('');
  const [languageCode, setLanguageCode] = useState<string>('vi'); // Ngôn ngữ mặc định là Vietnamese
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);  // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Số dòng mỗi trang

  // Lấy dữ liệu sự kiện khi component được render lần đầu
  useEffect(() => {
    const fetchData = async () => {
      const { items, totalCount: fetchedTotalCount } = await fetchEvents(pageNumber, rowsPerPage, languageCode);  // Lấy dữ liệu sự kiện theo phân trang
      setEvents(items);  // Cập nhật danh sách sự kiện
      setTotalCount(fetchedTotalCount);  // Cập nhật tổng số sự kiện
    };
    fetchData();
  }, [pageNumber, rowsPerPage, languageCode, totalCount]);  // Chạy lại khi các giá trị này thay đổi

  const table = useTable();

  const dataFiltered: EventProps[] = applyFilter({
    inputData: events,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterStatus,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Events
        </Typography>
      </Box>

      <Card>
        <EventTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          onFilterStatus={(status: string | null) => setFilterStatus(status)} 
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EventTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={events.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked: boolean) =>
                  table.onSelectAllRows(
                    checked,
                    events.map((event) => event.id.toString())
                  )
                }
                headLabel={[
                  { id: 'eventName', label: 'Event Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'placeName', label: 'Place Name' },
                  { id: 'startDate - endDate', label: 'Start Date - End Date' },
                  { id: 'status', label: 'Status' },
                  { id: 'actions', label: 'Actions' },
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
                    onUpdateStatus={async (status) => {
                      const result = await updateEventStatus(row.placeId, row.id, status);
                      if (result) {
                        setEvents((prevEvents) =>
                          prevEvents.map((event) =>
                            event.id === row.id ? { ...event, eventStatus: status } : event
                          )
                        );
                      }
                    }}
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
          page={pageNumber - 1}  // Chỉnh lại pageNumber để bắt đầu từ 0
          count={totalCount}  // Sử dụng totalCount thay vì events.length
          rowsPerPage={rowsPerPage}
          onPageChange={(event, newPage) => setPageNumber(newPage + 1)}  // Chỉnh lại pageNumber để bắt đầu từ 1
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));  // Cập nhật số dòng mỗi trang
            setPageNumber(1);  // Reset trang về 1 khi thay đổi số dòng
          }}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('eventName');
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
