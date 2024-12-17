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

import axiosInstance from 'src/utils/axiosInstance';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableNoData } from '../table-no-data';
import { PlaceTableRow } from '../all-place-table-row';
import { PlaceTableHead } from '../place-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { PlaceTableToolbar } from '../place-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../place-table-row';
import NewPlaceForm from './new-place';


// ----------------------------------------------------------------------

// Hàm fetchPlaces có sử dụng token từ localStorage
const fetchPlaces = async (pageNumber = 1, rowsPerPage = 5, languageCode = 'vi',searchTerm = '',Status:  string | null = '') => {
  const token = localStorage.getItem('accessToken');
  console.log('Access Token:', token);  // Kiểm tra token
  
  if (!token) {
    console.error('No access token found');
    return { items: [], totalCount: 0 };  // Trả về totalCount là 0 nếu không có token
  }

  try {
    const response = await axiosInstance.get(`https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${languageCode}&Page=${pageNumber}&Size=${rowsPerPage}&SearchTerm=${encodeURIComponent(searchTerm)}&Status=${Status}`, {
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

export function PlaceCreatedView() {
  const [places, setPlaces] = useState<UserProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);  // Lưu tổng số lượng bản ghi
  const [filterName, setFilterName] = useState('');
  const [languageCode, setLanguageCode] = useState<string>('vi');
  const [openNewPlaceForm, setOpenNewPlaceForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);  // Lưu trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Sử dụng state để lưu rowsPerPage
  const [filterStatus, setFilterStatus] = useState<string | null>('');

  useEffect(() => {
    const fetchData = async () => {
      const { items, totalCount: fetchedTotalCount } = await fetchPlaces(pageNumber, rowsPerPage, languageCode, filterName, filterStatus);  // Lấy cả items và totalCount
      setPlaces(items);  // Cập nhật danh sách places
      setTotalCount(fetchedTotalCount);  // Cập nhật totalCount
    };
    fetchData();
  }, [pageNumber, rowsPerPage, languageCode,filterName,filterStatus]);  // Thêm rowsPerPage vào dependencies

  const handlePlaceCreated = async (newPlace: UserProps) => {
    const placeWithImageAndStatus = {
      ...newPlace,
      status: newPlace.status ?? '0',  // Default to '0' if status is null/undefined
      isVerified: newPlace.isVerified ?? false,
      photoDisplay: newPlace.photoDisplay
    };
    setPlaces((prevPlaces) => [...prevPlaces, placeWithImageAndStatus ]); // Thêm place mới vào đầu danh sách
    setTotalCount((prevCount) => prevCount + 1); // Tăng tổng số lượng bản ghi
    const { items, totalCount: fetchedTotalCount } = await fetchPlaces(pageNumber, rowsPerPage, languageCode);
    setPlaces(items);  // Cập nhật lại danh sách places
    setTotalCount(fetchedTotalCount); 
  };
  const table = useTable();

  const dataFiltered: UserProps[] = applyFilter({
    inputData: places,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterStatus,
  });
  const handleDeletePlace = (placeId: string) => {
    setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== placeId));
  };
  const handlePlaceUpdated = async (updatedPlace: UserProps) => {
    // Update the place in the list
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.id === updatedPlace.id ? updatedPlace : place
      )
    );
    const { items } = await fetchPlaces(pageNumber, rowsPerPage, languageCode, filterName, filterStatus);
    setPlaces(items); 
  };
  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Places
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenNewPlaceForm(true)} // Hiển thị form khi nhấn
        >
          New place
        </Button>
      </Box>

      <Card>
        <PlaceTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            setPageNumber(1);
          }}
          onFilterStatus={(status) => {
            setFilterStatus(status || ''); 
            setPageNumber(1);
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
                      onDeletePlace={handleDeletePlace}
                      onUpdatePlace={handlePlaceUpdated}
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
      <NewPlaceForm
        open={openNewPlaceForm}
        onClose={() => setOpenNewPlaceForm(false)}
        onPlaceCreated={handlePlaceCreated} // Đóng form
      />
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
