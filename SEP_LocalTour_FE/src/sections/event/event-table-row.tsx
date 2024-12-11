import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type EventProps = {
  id: number;
  placeId: number;
  placeName: string;
  eventName: string;
  description: string;
  startDate: string;
  endDate: string;
  eventStatus: string;
  createdAt: string;
  updatedAt: string;
};

type EventTableRowProps = {
  row: EventProps;
  selected: boolean;
  onSelectRow: () => void;
  onUpdateStatus: (status: string) => void;
};

export function EventTableRow({ row, selected, onSelectRow,onUpdateStatus }: EventTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate(); // Hook điều hướng

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Hàm điều hướng đến trang chi tiết Event
  const handleNavigateToDetail = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click vào nút View Details
    navigate(`/event/${row.id}`); // Điều hướng đến trang chi tiết Event
  };

  // Hàm xử lý sự kiện click vào dòng bảng
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    if (
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLInputElement
    ) {
      // Nếu click vào checkbox hoặc button, không thực hiện điều hướng
      return;
    }
    navigate(`/event/${row.id}`); // Điều hướng đến trang chi tiết Event
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        onClick={handleRowClick} // Xử lý click cho toàn bộ dòng
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar
              alt={row.eventName || 'N/A'}
              src={`/static/mock-images/events/event-${row.id}.jpg`} // Giả sử bạn có ảnh mẫu
            />
            {row.eventName || 'N/A'}
          </Box>
        </TableCell>

        <TableCell>{row.description || 'N/A'}</TableCell>
        <TableCell>{row.placeName || 'N/A'}</TableCell>
        <TableCell>
          {new Date(row.startDate).toLocaleDateString()} -{' '}
          {new Date(row.endDate).toLocaleDateString()}
        </TableCell>

              <TableCell align="center">
        <Label
          color={
            row.eventStatus === 'Pending' 
              ? 'warning'          
              : row.eventStatus === 'Approved'   
              ? 'success'         
              : row.eventStatus === 'Rejected' 
              ? 'error'                 
              : 'default'                  
          }
        >
          {row.eventStatus}
        </Label>
      </TableCell>


      <TableCell align="center">
  {/* Sử dụng Box để sắp xếp các nút */}
  <Box display="flex" gap={1} justifyContent="center">
    {/* Nút Approve */}
    <Button
      variant="contained"
      color="success"
      size="small"
      disabled={row.eventStatus === 'Approved'} // Disable nếu trạng thái là Approved
      onClick={() => onUpdateStatus('Approved')}
    >
      Approve
    </Button>
    {/* Nút Reject */}
    <Button
      variant="contained"
      color="error"
      size="small"
      disabled={row.eventStatus === 'Rejected'} // Disable nếu trạng thái là Rejected
      onClick={() => onUpdateStatus('Rejected')}
    >
      Reject
    </Button>
  </Box>
</TableCell>
      </TableRow>

      {/* Menu Popover */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
      </Popover>
    </>
  );
}
