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
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import axiosInstance from 'src/utils/axiosInstance';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { EditTagForm } from './view/edit-tag';

// ----------------------------------------------------------------------

export type TagProps = {
  id: string;
  tagName: string;
  tagVi: string;
  tagPhotoUrl: string;
};

type UserTableRowProps = {
  row: TagProps;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteTag: any;
  onUpdateTag:any;
};
interface Tag {
  id: string;
  tagName: string;
  tagVi: string;
  tagPhotoUrl: string;
};

export function PlaceTableRow({ row, selected, onSelectRow,onDeleteTag,onUpdateTag }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();  // Hook điều hướng
  const [tagIdToEdit, setTagIdToEdit] = useState<string>('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TagProps | null>(null);
  const [originalTag, setOriginalTag] = useState<TagProps | null>(null);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleOpenEditDialog = (tagId: string) => {
    setTagIdToEdit(tagId);
    setSelectedTag(row);
    setOpenEditDialog(true);
    handleClosePopover();
  };

  const handleDeleteTag = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      await axiosInstance.delete(`https://api.localtour.space/api/Tag/delete?tagid=${row.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      onDeleteTag(row.id);
    } catch (error) {
      console.error("Error deleting place:", error);
    }
    setOpenConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };
  const handleTagUpdated = (updatedtag: TagProps) => {
    onUpdateTag(updatedtag);
    setOpenEditDialog(false);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedTag(null);
  };

return (
  <>
    <TableRow 
      hover 
      tabIndex={-1} 
      role="checkbox" 
      selected={selected} 
    >
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
      </TableCell>

      <TableCell component="th" scope="row">
        <Box gap={2} display="flex" alignItems="center">
          <Avatar alt={row.tagName || 'N/A'} src={row.tagPhotoUrl} />
          {row.tagName || 'N/A'}
        </Box>
      </TableCell>

      <TableCell>{row.tagVi || 'N/A'}</TableCell>
      <TableCell align="left" sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
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
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this tag?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTag} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <EditTagForm
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        tag={selectedTag}
        onTagUpdated={handleTagUpdated}
      />
  </>
);
}