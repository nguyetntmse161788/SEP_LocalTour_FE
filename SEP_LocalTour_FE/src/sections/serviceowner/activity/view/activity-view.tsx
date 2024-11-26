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
import { emptyRows, applyFilter, getComparator, applyFilterPlace } from '../utils';
import type { EventProps } from 'src/sections/event/event-table-row';
import { PlaceTableRow, UserProps } from '../place-table-row';
import { PlaceTableHead } from '../place-table-head';
import { PlaceTableToolbar } from '../place-table-toolbar';

// ----------------------------------------------------------------------

const fetchPlaces = async (pageNumber = 1, rowsPerPage = 5, languageCode = 'vi') => {
  const token = localStorage.getItem('accessToken');
  console.log('Access Token:', token);  // Kiểm tra token
  
  if (!token) {
    console.error('No access token found');
    return { items: [], totalCount: 0 };  // Trả về totalCount là 0 nếu không có token
  }

  try {
    const response = await axios.get(`https://api.localtour.space/api/Place/getAll?LanguageCode=${languageCode}&Page=${pageNumber}&Size=${rowsPerPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log('API Response:', response.data);  // Kiểm tra dữ liệu trả về
    return {
      items: response.data.items,  // Danh sách items
      totalCount: response.data.totalCount,  // Tổng số items
    };
  } catch (error) {
    console.error("Error fetching places", error);
    return { items: [], totalCount: 0 };  // Trả về mảng rỗng và totalCount là 0 nếu có lỗi
  }
};

export function PlaceView() {
  const [places, setPlaces] = useState<UserProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);  // Lưu tổng số lượng bản ghi
  const [filterName, setFilterName] = useState('');
  const [languageCode, setLanguageCode] = useState<string>('vi'); // Ngôn ngữ mặc định là Vietnamese
  const [pageNumber, setPageNumber] = useState(1);  // Lưu trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Sử dụng state để lưu rowsPerPage

  useEffect(() => {
    const fetchData = async () => {
      const { items, totalCount } = await fetchPlaces(pageNumber, rowsPerPage, languageCode);  // Lấy cả items và totalCount
      setPlaces(items);  // Cập nhật danh sách places
      setTotalCount(totalCount);  // Cập nhật totalCount
    };
    fetchData();
  }, [pageNumber, rowsPerPage, languageCode]);  // Thêm rowsPerPage vào dependencies

  const table = useTable();

  const dataFiltered: UserProps[] = applyFilterPlace({
    inputData: places,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Places
        </Typography>
      </Box>

      <Card>
        <PlaceTableToolbar
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
              <PlaceTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={places.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    places.map((place) => place.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'address', label: 'Address' },
                  { id: 'description', label: 'Description' },
                  { id: 'isVerify', label: 'isVerify' },
                  { id: 'status', label: 'Status' },
                  { id: 'View details', label: 'View details' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * rowsPerPage,
                    table.page * rowsPerPage + rowsPerPage
                  )
                  .map((row) => (
                    <PlaceTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, places.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={pageNumber - 1}  // Chỉnh lại để bắt đầu từ trang 0
          count={totalCount}  // Dùng totalCount thay vì places.length
          rowsPerPage={rowsPerPage}  // Cập nhật rowsPerPage
          onPageChange={(event, newPage) => setPageNumber(newPage + 1)}  // Sử dụng pageNumber + 1
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));  // Cập nhật rowsPerPage
            setPageNumber(1);  // Reset trang về 1 khi thay đổi số dòng trên mỗi trang
          }}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
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

