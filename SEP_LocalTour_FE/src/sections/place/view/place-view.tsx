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
import { PlaceTableRow } from '../place-table-row';
import { PlaceTableHead } from '../place-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { PlaceTableToolbar } from '../place-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { UserProps } from '../place-table-row';

// ----------------------------------------------------------------------

// Hàm fetchPlaces không cần truyền filterStatus vào API
const fetchPlaces = async (
  pageNumber = 1,
  rowsPerPage = 5,
  languageCode = 'vi',
  searchTerm = '',
  Status: string | null = '',
  districtIds: number[] = []  // Add districtIds parameter
) => {
  const token = localStorage.getItem('accessToken');
  console.log('Access Token:', token);  // Kiểm tra token
  
  if (!token) {
    console.error('No access token found');
    return { items: [], totalCount: 0 };  // Return empty data if no token
  }

  try {
    // Start building the URL
    let url = `https://api.localtour.space/api/Place/getAllByRole?LanguageCode=${languageCode}&Page=${pageNumber}&Size=${rowsPerPage}&SearchTerm=${encodeURIComponent(searchTerm)}&Status=${Status}&SortOrder=desc`;
    
    // If districtIds is not empty, append the DistrictNCityIds query parameter
    if (districtIds.length > 0) {
      url += `&DistrictNCityIds=${districtIds.join('&DistrictNCityIds=')}`;
    }

    // Make the GET request
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,  // Include token for authentication
      },
    });

    console.log('API Response:', response.data);  // Log the response data

    return {
      items: response.data.items,  // List of places
      totalCount: response.data.totalCount,  // Total count of records
    };
  } catch (error) {
    console.error("Error fetching places", error);
    return { items: [], totalCount: 0 };  // Return empty data if there's an error
  }
};


export function PlaceView() {
  const [places, setPlaces] = useState<UserProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);  // Lưu tổng số lượng bản ghi
  const [filterName, setFilterName] = useState('');
  const [languageCode, setLanguageCode] = useState<string>('vi'); // Ngôn ngữ mặc định là Vietnamese
  const [pageNumber, setPageNumber] = useState(1);  // Lưu trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Sử dụng state để lưu rowsPerPage
  const [filterStatus, setFilterStatus] = useState<string | null>('');
  const [selectedDistricts, setSelectedDistricts] = useState<number[]>([]);  // State to store selected district IDs

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchData = async () => {
      const { items, totalCount: fetchedTotalCount } = await fetchPlaces(pageNumber, rowsPerPage, languageCode,filterName,filterStatus,selectedDistricts);  // Lấy dữ liệu theo trang, số dòng và ngôn ngữ
      setPlaces(items);  // Cập nhật danh sách places
      setTotalCount(fetchedTotalCount);  // Cập nhật totalCount
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3000);  // Fetch every 5 seconds

    // Clear interval when the component is unmounted
    return () => clearInterval(interval);
  }, [pageNumber, rowsPerPage, languageCode, filterName,filterStatus,selectedDistricts]);  // Chạy lại khi các giá trị này thay đổi

  const table = useTable();

  // Áp dụng bộ lọc sau khi cập nhật dữ liệu
  const dataFiltered: UserProps[] = applyFilter({
    inputData: places,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterStatus,  // Lọc trên client
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
              setFilterName(event.target.value); // Cập nhật giá trị tìm kiếm
              setPageNumber(1); // Reset về trang đầu tiên
            }}
            onFilterStatus={(status) => {
              setFilterStatus(status || ''); 
              setPageNumber(1);
            }}
            userId={userId || ''}
            onDistrictSelect={setSelectedDistricts}
            
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
                  { id: 'wardName', label: 'WardName' },
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
          page={pageNumber - 1}  // Sử dụng pageNumber - 1 vì TablePagination bắt đầu từ 0
          count={totalCount}  // Dùng totalCount thay vì places.length
          rowsPerPage={rowsPerPage}  // Sử dụng rowsPerPage
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

  return {
    order,
    orderBy,
    rowsPerPage,
    selected,
    page,
    onSort,
    onSelectAllRows,
    onSelectRow,
    onResetPage: () => setPage(0),
  };
}
