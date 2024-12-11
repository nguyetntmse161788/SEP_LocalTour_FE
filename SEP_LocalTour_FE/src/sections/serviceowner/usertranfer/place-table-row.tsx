import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';  // Thêm hook useNavigate từ React Router
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axiosInstance from 'src/utils/axiosInstance';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import axios from 'axios';
import { Autocomplete, FormControl, InputLabel, Select, TextField, Typography } from '@mui/material';


// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  address: string;
  description: string;
  status: string;
  photoDisplay: string;
  
  placeTranslation: [
    { name: string, address: string, description: string },
  ],
  isVerified: boolean;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onDeletePlace: any;
  onUpdatePlace: any;
};
type User = {
  id: string;
  username: string;
  fullname: string;
};
export function PlaceTableRow({ row, selected, onSelectRow, onDeletePlace, onUpdatePlace }: UserTableRowProps) {
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [users, setUsers] = useState<User[]>([]); // Danh sách người dùng
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Người dùng được chọn
  const [searchTerm, setSearchTerm] = useState(''); // Từ khoá tìm kiếm
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);  
  const navigate = useNavigate(); 

  const userId = localStorage.getItem('userId'); // ID người dùng hiện tại

  // Mở Dialog
  const handleOpenTransferDialog = async () => {
    setOpenTransferDialog(true);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.get('https://api.localtour.space/api/User/getListByRole?roleName=Service%20Owner', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const allUsers = response.data;

        // Lọc người dùng hiện tại ra khỏi danh sách
        const usersWithoutCurrentUser = allUsers.filter((user: User) => user.id !== userId);
        setUsers(usersWithoutCurrentUser);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Đóng Dialog
  const handleCloseTransferDialog = () => {
    setOpenTransferDialog(false);
    setSelectedUser(null);
  };

  // Xử lý chuyển quyền
  const handleTransfer = async () => {
    if (!selectedUser) {
      alert('Please select a user to transfer ownership.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.put(
        `https://api.localtour.space/api/Place/transferAuthor?placeid=${row.id}&userIdTransfer=${selectedUser.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert('Ownership transferred successfully.');
        handleCloseTransferDialog(); // Đóng dialog
        onUpdatePlace(response.data); // Cập nhật danh sách
      }
    } catch (error) {
      console.error('Error transferring ownership:', error);
      alert('Failed to transfer ownership.');
    }
  };
  const handleNavigateToDetail = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/owner/place/${row.id}`);
  };
  const handleOpenConfirmDialog = () => {
    if (!selectedUser) {
      alert('Please select a user to transfer ownership.');
    return;
    }
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmTransfer = () => {
    setOpenConfirmDialog(false);
    handleTransfer();  // Proceed with transfer if confirmed
  };


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.placeTranslation[0]?.name || 'N/A'} src={row.photoDisplay} />
            {row.placeTranslation[0]?.name || 'N/A'}
          </Box>
        </TableCell>
        <TableCell>{row.placeTranslation[0]?.address || 'N/A'}</TableCell>
        <TableCell>{row.placeTranslation[0]?.description || 'N/A'}</TableCell>
        <TableCell align="center">
          {row.status === 'Pending' ? '-' : <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />}
        </TableCell>
        <TableCell>
          <Label color={row.status === 'Pending' ? 'warning' : row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'error' : 'default'}>
            {row.status}
          </Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleNavigateToDetail}>
            <Iconify icon="eva:arrow-forward-outline" width={22} />
          </IconButton>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleOpenTransferDialog}
          >
            User Transfer
          </Button>
        </TableCell>
      </TableRow>

      {/* Dialog chuyển quyền */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Transfer</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to transfer this place to another user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmTransfer} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog chuyển quyền */}
      <Dialog open={openTransferDialog} onClose={handleCloseTransferDialog}>
        <DialogTitle>Transfer Ownership</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={users}
            getOptionLabel={(option) => `${option.username}`}
            value={selectedUser}
            onChange={(_, newValue) => setSelectedUser(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select User"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            filterOptions={(options, state) => {
              return options.filter(
                (option) =>
                  option.username.toLowerCase().includes(state.inputValue.toLowerCase())
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransferDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOpenConfirmDialog} color="primary" variant="contained">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}