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
import UpdatePlaceForm from './view/update-place';


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

export function PlaceTableRow({ row, selected, onSelectRow, onDeletePlace,onUpdatePlace }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);  // State for confirmation dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);  // State for the edit dialog
  const [placeIdToEdit, setPlaceIdToEdit] = useState<string>('');
  const navigate = useNavigate();  // Hook for navigation
  const [places, setPlaces] = useState<UserProps[]>([]);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Navigate to detail page
  const handleNavigateToDetail = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/owner/created/${row.id}`);
  };
  const handleOpenEditDialog = (placeId: string) => {
    setPlaceIdToEdit(placeId);
    setOpenEditDialog(true);
    handleClosePopover();
  };
  // Handle Row Click
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement) {
      return;
    }
    navigate(`/owner/created/${row.id}`);
  };

  // Delete place
  const handleDeletePlace = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      await axiosInstance.delete(`https://api.localtour.space/api/Place/delete?placeid=${row.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // Call the parent function to update the state (remove the place)
      onDeletePlace(row.id);
    } catch (error) {
      console.error("Error deleting place:", error);
    }
    setOpenConfirmDialog(false);  // Close the confirmation dialog after deletion
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);  // Close the confirmation dialog
  };
  const handlePlaceUpdated = (updatedPlace: UserProps) => {
    // Khi cập nhật xong, gọi onUpdatePlace để cập nhật lại danh sách
    onUpdatePlace(updatedPlace);
    setOpenEditDialog(false);
  };
  
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={handleRowClick}>
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
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" width={22} />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={!!openPopover} anchorEl={openPopover} onClose={handleClosePopover}>
        <MenuList disablePadding sx={{ p: 0.5, gap: 0.5, width: 140, display: 'flex', flexDirection: 'column' }}>
          <MenuItem onClick={() => { handleOpenEditDialog(row.id); handleClosePopover(); }}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
          <MenuItem onClick={() => { setOpenConfirmDialog(true); handleClosePopover(); }} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this place?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePlace} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <UpdatePlaceForm
        open={openEditDialog}
        placeId={placeIdToEdit}
        onClose={() => setOpenEditDialog(false)}
        onPlaceUpdated={handlePlaceUpdated}
      />
    </>
  );
}
