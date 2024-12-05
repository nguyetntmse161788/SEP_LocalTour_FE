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

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  address: string;
  description: string;
  status: string;
  photoDisplay: string;
  wardName: string;
  placeTranslation: [
    { name: string, address: string, description: string },
  ],
  isVerified: boolean;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function PlaceTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();  // Hook điều hướng

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
  navigate(`/place/${row.id}`);  // Điều hướng tới trang chi tiết của Place
};

// Hàm xử lý sự kiện khi bấm vào dòng bảng
const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
  if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement) {
    // Nếu click vào checkbox hoặc button thì không điều hướng
    return;
  }
  navigate(`/place/${row.id}`);  // Điều hướng tới trang chi tiết của Place
};

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
          <Avatar alt={row.placeTranslation[0]?.name || 'N/A'} src={row.photoDisplay} />
          {row.placeTranslation[0]?.name || 'N/A'}
        </Box>
      </TableCell>

      <TableCell>{row.placeTranslation[0]?.address || 'N/A'}</TableCell>

      <TableCell>{row.placeTranslation[0]?.description || 'N/A'}</TableCell>
      <TableCell>{row.wardName || 'N/A'}</TableCell>

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


      {/* Cột mũi tên điều hướng */}
      <TableCell align="right">
        <IconButton onClick={handleNavigateToDetail}> {/* Khi nhấn vào mũi tên, điều hướng */}
          <Iconify icon="eva:arrow-forward-outline" width={22} />
        </IconButton>
      </TableCell>
      
      {/* Cột menu dấu 3 chấm */}
      <TableCell align="right">
        <IconButton onClick={handleOpenPopover}> {/* Khi nhấn vào dấu 3 chấm, mở menu */}
          <Iconify icon="eva:more-vertical-fill" width={22} />
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
        <MenuItem onClick={handleClosePopover}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </Popover>
  </>
);
}