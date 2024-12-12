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
import { PlaceTableRow } from '../tag-table-row';
import { PlaceTableHead } from '../place-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { PlaceTableToolbar } from '../place-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import type { TagProps } from '../tag-table-row';
import { NewTagForm } from './new-tag';

// ----------------------------------------------------------------------

// Hàm fetchPlaces không cần truyền filterStatus vào API
const fetchPlaces = async (
  pageNumber = 1,
  rowsPerPage = 5,
  searchTerm = '',
) => {
  const token = localStorage.getItem('accessToken');
  console.log('Access Token:', token);  // Kiểm tra token
  
  if (!token) {
    console.error('No access token found');
    return { items: [], totalCount: 0 };  // Return empty data if no token
  }

  try {
    // Start building the URL
    let url = `https://api.localtour.space/api/Tag/getAll?Page=${pageNumber}&Size=${rowsPerPage}&SearchTerm=${encodeURIComponent(searchTerm)}`;
  
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
    console.error("Error fetching tags", error);
    return { items: [], totalCount: 0 };  // Return empty data if there's an error
  }
};
export function TagView() {
  const [tags, setTags] = useState<TagProps[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);  // Lưu tổng số lượng bản ghi
  const [filterName, setFilterName] = useState('');
  const [languageCode, setLanguageCode] = useState<string>('vi'); // Ngôn ngữ mặc định là Vietnamese
  const [pageNumber, setPageNumber] = useState(1);  // Lưu trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5);  // Sử dụng state để lưu rowsPerPage
  const [filterStatus, setFilterStatus] = useState<string | null>('');
  const [selectedDistricts, setSelectedDistricts] = useState<number[]>([]);  // State to store selected district IDs
  const [openNewTagForm, setOpenNewTagForm] = useState(false);


  const userId = localStorage.getItem('userId');
  const fetchData = async () => {
    const { items, totalCount: fetchedTotalCount } = await fetchPlaces(pageNumber, rowsPerPage,filterName);  // Lấy dữ liệu theo trang, số dòng và ngôn ngữ
    setTags(items);  // Cập nhật danh sách places
    setTotalCount(fetchedTotalCount);  // Cập nhật totalCount
  };
  useEffect(() => {
    fetchData();
  }, [pageNumber, rowsPerPage, filterName]);  // Chạy lại khi các giá trị này thay đổi

  const table = useTable();

  // Áp dụng bộ lọc sau khi cập nhật dữ liệu
  const dataFiltered: TagProps[] = applyFilter({
    inputData: tags,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterStatus,  // Lọc trên client
  });
  const notFound = !dataFiltered.length && !!filterName;
  const handleDeleteTag = (tagId: string) => {
    setTags(prevPlaces => prevPlaces.filter(tag => tag.id !== tagId));
  };
  const handleUpdateTag = (updatedTag: TagProps) => {
    if (!updatedTag || !updatedTag.id) {
      console.error("Invalid tag data:", updatedTag);
      return;
    }
    setTags((prevPlaces) =>
      (prevPlaces || []).map((tag) =>
        tag.id === updatedTag.id ? updatedTag : tag
      )
    );
       fetchData();
  };
  
  const handleTagCreated = () => {
    fetchData();
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Tags
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenNewTagForm(true)}
        >
          New Banner
        </Button>
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
            
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <PlaceTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={tags.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tags.map((tag) => tag.id)
                  )
                }
                headLabel={[
                  { id: 'tagName', label: 'Name' },
                  { id: 'tagVi', label: 'tên' },
                  { id: 'Action', label: 'Action'},
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
                      onDeleteTag={handleDeleteTag}
                      onUpdateTag={handleUpdateTag}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tags.length)}
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
      <NewTagForm
        open={openNewTagForm}
        onClose={() => setOpenNewTagForm(false)}
        onTagCreated={handleTagCreated}
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
