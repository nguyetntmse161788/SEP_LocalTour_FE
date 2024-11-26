import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { useState } from 'react';
import { Box, Button, Popover } from '@mui/material';

// ----------------------------------------------------------------------

type PlaceTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStatus: (status: string | null) => void;
};

export function PlaceTableToolbar({ numSelected, filterName, onFilterName, onFilterStatus }: PlaceTableToolbarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (status: string | null) => {
    setActiveFilter(status);
    onFilterStatus(status);
    setAnchorEl(null); // Đóng popover sau khi chọn filter
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search event..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
        <IconButton>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton onClick={handleOpen}>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>

          <Popover
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                <Button
                  key={status}
                  variant={activeFilter === (status === 'All' ? null : status) ? 'contained' : 'outlined'}
                  onClick={() => handleFilterClick(status === 'All' ? null : status)}
                  sx={{
                    color: activeFilter === (status === 'All' ? null : status) ? 'text.primary' : 'text.secondary',
                    borderColor: 'text.secondary',
                  }}
                >
                  {status}
                </Button>
              ))}
            </Box>
          </Popover>
        </>
      )}
    </Toolbar>
  );
}