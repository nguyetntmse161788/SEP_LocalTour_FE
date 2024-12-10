import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { TableEmptyRows } from '../table-empty-rows';
import { BannerTableToolbar } from '../banner-table-toolbar';
import { BannerTableHead } from '../banner-table-head';
import { BannerTableRow } from '../banner-table-row';
import { emptyRows, applyFilter, getComparator } from '../utils';

export interface BannerProps {
  id: string;
  bannerName: string;
  bannerUrl: string;
  authorId: string;
  authorName: string;
  createdDate: string;
  updatedDate: string;
  bannerHistories: any[];
}

export function BannerView() {
  const [banners, setBanners] = useState<BannerProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filterName, setFilterName] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<string>('bannerName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found. Please log in.');
      setLoading(false);
      return;
    }

    fetchBanners(token);
  }, []);

  const fetchBanners = async (token: string) => {
    try {
      const response = await axios.get('https://api.localtour.space/api/Banner/GetAll', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBanners(response.data);
    } catch (err) {
      setError('Failed to fetch banners.');
    } finally {
      setLoading(false);
    }
  };

  const dataFiltered = applyFilter({
    inputData: banners,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleSelectRow = (): void => {
    throw new Error('Function not implemented.');
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <BannerTableToolbar
          filterName={filterName}
          onFilterName={(e) => setFilterName(e.target.value)}
          numSelected={0}
        />
        <Scrollbar>
          <TableContainer>
            <Table>
              <BannerTableHead
                order={order}
                orderBy={orderBy}
                onSort={(id) => {
                  const isAsc = orderBy === id && order === 'asc';
                  setOrder(isAsc ? 'desc' : 'asc');
                  setOrderBy(id);
                }}
                rowCount={0}
                numSelected={0}
                headLabel={[]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((banner) => (
                    <BannerTableRow
                      key={banner.id}
                      row={banner}
                      selected={false}
                      onSelectRow={handleSelectRow}
                    />
                  ))}
                <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, banners.length)} />
                {notFound && <Typography>No data found</Typography>}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={banners.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </Card>
    </Box>
  );
}
