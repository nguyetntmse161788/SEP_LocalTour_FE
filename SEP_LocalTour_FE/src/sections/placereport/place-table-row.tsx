import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Thêm hook useNavigate từ React Router
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import axiosInstance from 'src/utils/axiosInstance';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// ----------------------------------------------------------------------

export type PlaceReportProps = {
  id: string;
  userReportId: string;
  placeId: string;
  reportDate: string;
  status: string;
  content: string;
  userReport: { userName : string}
};

type UserTableRowProps = {
  row: PlaceReportProps;
  selected: boolean;
  onSelectRow: () => void;
  onRefresh: () => void;
};
const fetchPlaceName = async (placeId: string) => {
  const token = localStorage.getItem('accessToken'); // Lấy accessToken
  if (!token) {
    console.error('No access token found');
    return '';
  }

  try {
    const response = await axiosInstance.get(
      `https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${placeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Tìm name trong placeTranslations với languageCode = 'vi'
    const placeTranslations = response.data?.placeTranslations || [];
    const translation = placeTranslations.find(
      (t: { languageCode: string }) => t.languageCode === 'vi'
    );

    return translation?.name || 'N/A'; // Trả về name hoặc thông báo
  } catch (error) {
    console.error(`Error fetching name for placeId ${placeId}`, error);
    return 'Lỗi tải tên';
  }
};
const fetchPlaceDetails = async (id: string) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found');
    return null;
  }

  try {
    const response = await axiosInstance.get(
      `https://api.localtour.space/api/PlaceReport/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.place;
  } catch (error) {
    console.error(`Error fetching details for placeId ${id}`, error);
    return null;
  }
};

export function PlaceTableRow({ row, selected, onSelectRow, onRefresh }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [placeName, setPlaceName] = useState<string>('');
  const navigate = useNavigate();  // Hook điều hướng
  const [openBanDialog, setOpenBanDialog] = useState(false); // State để mở dialog xác nhận ban
  const [openUnBanDialog, setOpenUnBanDialog] = useState(false); // State để mở dialog xác nhận ban
  const [loading, setLoading] = useState(false); // State để xử lý loading trong button
  const [placeDetails, setPlaceDetails] = useState<any | null>(null);


  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

 // Hàm điều hướng khi bấm vào mũi tên ngang (IconButton)
 const handleNavigateToDetail = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation(); // Ngăn không cho sự kiện điều hướng khi nhấn mũi tên
  navigate(`/placeReport/${row.id}`);  // Điều hướng tới trang chi tiết của Place
};

// Hàm xử lý sự kiện khi bấm vào dòng bảng
const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
  if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement) {
    // Nếu click vào checkbox hoặc button thì không điều hướng
    return;
  }
  navigate(`/placeReport/${row.id}`);  // Điều hướng tới trang chi tiết của Place
};

useEffect(() => {
  const getPlaceName = async () => {
    const name = await fetchPlaceName(row.placeId); // Gọi API để lấy name
    setPlaceName(name);
  };

  if (row.placeId) getPlaceName(); // Chỉ gọi nếu placeId tồn tại
}, [row.placeId]);

const handleChangeStatusReport = async (status: string) => {
  setLoading(true);
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  try {
    const response = await axiosInstance.put(
      `https://api.localtour.space/api/PlaceReport/changeStatusPlaceReport?placereportid=${row.id}&status=${status}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      alert(`Report status changed to: ${status}`);
      if (status === 'Approved') setOpenBanDialog(true); 
      if (status === 'Rejected') setOpenUnBanDialog(true); 
      
    }
    onRefresh();
  } catch (error) {
    console.error('Error changing report status:', error);
  } finally {
    setLoading(false);
  }
};
const handleApproveWithBan = async () => {
  setLoading(true);
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  try {
    // Bước 1: Xác nhận ban place
    const banResponse = await axiosInstance.put(
      `https://api.localtour.space/api/Place/changeStatusPlace?placeid=${row.placeId}&status=Banned`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (banResponse.status === 200) {
      // alert('Place has been banned successfully!');

      // Bước 2: Thay đổi trạng thái report thành Approved
      const reportResponse = await axiosInstance.put(
        `https://api.localtour.space/api/PlaceReport/changeStatusPlaceReport?placereportid=${row.id}&status=Approved`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (reportResponse.status === 200) {
        alert('Report status updated to Approved!');
      }
      
    }
    onRefresh();
  } catch (error) {
    console.error('Error during ban and approval process:', error);
  } finally {
    setLoading(false);
    setOpenBanDialog(false); // Đóng dialog
  }
};
const handleRejected = async () => {
  setLoading(true);
  const token = localStorage.getItem('accessToken');
  if (!token) return;

  try {
    // Bước 1: Xác nhận ban place
    const banResponse = await axiosInstance.put(
      `https://api.localtour.space/api/Place/changeStatusPlace?placeid=${row.placeId}&status=Approved`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (banResponse.status === 200) {
      // alert('Place has been banned successfully!');

      // Bước 2: Thay đổi trạng thái report thành Approved
      const reportResponse = await axiosInstance.put(
        `https://api.localtour.space/api/PlaceReport/changeStatusPlaceReport?placereportid=${row.id}&status=Rejected`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (reportResponse.status === 200) {
        alert('Report status updated to Approved!');
      }
      
    }
    onRefresh();
  } catch (error) {
    console.error('Error during ban and approval process:', error);
  } finally {
    setLoading(false);
    setOpenUnBanDialog(false); // Đóng dialog
  }
};
const handleOpen = async () => {
  const details = await fetchPlaceDetails(row.id);
  setPlaceDetails(details);
  setOpenBanDialog(true);
}


return (
  <>
    <TableRow 
      hover 
      tabIndex={-1} 
      role="checkbox" 
      selected={selected} 
      onClick={handleRowClick}  // Xử lý sự kiện click cho toàn bộ dòng
    >
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
      </TableCell>

      <TableCell component="th" scope="row">
        <Box gap={2} display="flex" alignItems="center">
          {/* <Avatar alt={row.placeTranslation[0]?.name || 'N/A'} src={row.photoDisplay} /> */}
          {row.id || 'N/A'}
        </Box>
      </TableCell>

      <TableCell>{row.userReport.userName || 'N/A'}</TableCell>

      <TableCell>{placeName  || 'N/A'}</TableCell>
      <TableCell>{row.reportDate || 'N/A'}</TableCell>
      <TableCell>{row.content || 'N/A'}</TableCell>

      <TableCell align="center">
        {row.status === 'Pending' ? (
          '-'
        ) : (
          <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
        )}
      </TableCell>

      <TableCell>
  <Label 
    color={
      row.status === 'Pending' ? 'warning' :
      row.status === 'Approved' ? 'success' :
      row.status === 'Rejected' ? 'error' :
      'default'
    }
  >
    {row.status}
  </Label>
</TableCell>
<TableCell align="center">
<Box display="flex" gap={1} justifyContent="center">
  <Button
    variant="contained"
    color="success"
    size="small"
    disabled={row.status === 'Approved'}
    onClick={() => handleOpen()} // Gọi hàm API Approved
  >
    Approve
  </Button>
  <Button
    variant="contained"
    color="error"
    size="small"
    disabled={row.status === 'Rejected'}
    onClick={() => setOpenUnBanDialog(true)} // Gọi hàm API Rejected
  >
    Reject
  </Button>
</Box>

</TableCell>
<Dialog open={openBanDialog} onClose={() => setOpenBanDialog(false)}>
        <DialogTitle>Confirm Ban Place</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to ban this place before approving the report?
            {placeDetails && (
              <Box mt={2}>
                <h3>Place Details</h3>
                <p><strong>Name:</strong> {placeDetails.placeTranslations[0]?.name}</p>
                <p><strong>Address:</strong> {placeDetails.placeTranslations[0]?.address || 'No description available'}</p>
                <p><strong>Description:</strong> {placeDetails.placeTranslations[0]?.description || 'No location available'}</p>
              </Box>
              
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBanDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleApproveWithBan} color="error" disabled={loading}>
            {loading ? 'Processing...' : 'Ban'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUnBanDialog} onClose={() => setOpenUnBanDialog(false)}>
        <DialogTitle>Confirm Ban Place</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to rejected this place report?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnBanDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleRejected} color="error" disabled={loading}>
            {loading ? 'Processing...' : 'Rejected'}
          </Button>
        </DialogActions>
      </Dialog>




      {/* Cột mũi tên điều hướng */}
      <TableCell align="right">
        <IconButton onClick={handleNavigateToDetail}> {/* Khi nhấn vào mũi tên, điều hướng */}
          <Iconify icon="eva:arrow-forward-outline" width={22} />
        </IconButton>
      </TableCell>
    </TableRow>

    <Popover
      open={!!openPopover}
      anchorEl={openPopover}
      onClose={handleClosePopover}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuList
        disablePadding
        sx={{
          p: 0.5,
          gap: 0.5,
          width: 140,
          display: 'flex',
          flexDirection: 'column',
          [`& .${menuItemClasses.root}`]: {
            px: 1,
            gap: 2,
            borderRadius: 0.75,
            [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
          },
        }}
      >
      </MenuList>
    </Popover>
  </>
);
}