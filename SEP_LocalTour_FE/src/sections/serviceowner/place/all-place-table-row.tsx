import { useState, useCallback, useRef,useEffect  } from 'react';
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
import { toast } from 'react-toastify';

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
  onPaymentPlace : any;
};

export function PlaceTableRow({ row, selected, onSelectRow, onDeletePlace,onUpdatePlace, onPaymentPlace }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);  // State for confirmation dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);  // State for the edit dialog
  const [placeIdToEdit, setPlaceIdToEdit] = useState<string>('');
  const navigate = useNavigate();  // Hook for navigation
  const [places, setPlaces] = useState<UserProps[]>([]);
  const [openPayDialog, setOpenPayDialog] = useState(false);
  const [placeNameToPay, setplaceNameToPay] = useState<string>('');
  const [openPaymentUrlDialog, setopenPaymentUrlDialog] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const iframeRef = useRef(null);
  const [placeIdToPay, setPlaceIdToPay] = useState<string>('');
  const [processedRows, setProcessedRows] = useState<Record<string, boolean>>({});
  const [processedPlaceId, setProcessedPlaceId] = useState<string | null>(null);
  console.log('Component Rendered');
  useEffect(() => {
    if (!placeIdToPay) return;
    const channel = new BroadcastChannel('payment-status');
  
    channel.onmessage = (event) => {
      console.log('Component Rendered', event.data.placeId);
      console.log('Component ', event.data.status);
      console.log('placeIdToPay ', placeIdToPay);
      if (event.data.placeId && event.data.placeId === placeIdToPay) {
        setProcessedPlaceId(event.data.placeId);
        
        if (event.data.status === 'cancel') {
          setopenPaymentUrlDialog(false);
          setIframeUrl('');
          toast.error(`Payment has been canceled`, {
            position: 'top-right',
            autoClose: 5000,
          });
        } else if (event.data.status === 'success') {
          setopenPaymentUrlDialog(false);
          toast.success(`Payment successful!`, {
            position: 'top-right',
            autoClose: 5000,
          });
        }
      }
    };
  
    return () => {
      channel.close();
    };
  }, [placeIdToPay]);
  
  
  

// eslint-disable-next-line react-hooks/exhaustive-deps
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
  const handleOpenEditDialog = (placeId: string, event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setPlaceIdToEdit(placeId);
    setOpenEditDialog(true);
    handleClosePopover();
  };

  const handleOpenPayDialog = (placeName: string,placeId : string) => {
    setplaceNameToPay(placeName);
    setOpenPayDialog(true);
    handleClosePopover();
    setPlaceIdToPay(placeId);
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

 // Payment place
 const handlePaymentPlace = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found');
    return;
  }
  try {
    const response = await axiosInstance.get(`https://api.localtour.space/api/Place/GetUrlPlaceRegister?placeId=${placeIdToPay}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.status === 200) {
      const url = response.data; 
      if (url) {
        setIframeUrl(url);
        setopenPaymentUrlDialog(true);
        // const channel = new BroadcastChannel('payment-status');
        // channel.postMessage({ placeId: placeIdToPay, placeName: placeNameToPay, status: 'created' })
        localStorage.setItem('paymentData', JSON.stringify({
          placeIdToPay,
          placeNameToPay,
      }));
      
      } else {
        console.error("URL Error.");
      }
    }
  
  } catch (error) {
    console.error("Error deleting place:", error);
  }
  setOpenPayDialog(false);  // Close the confirmation dialog after deletion
};


  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);  // Close the confirmation dialog
  };
  const handlePlaceUpdated = (updatedPlace: UserProps) => {
    // Khi cập nhật xong, gọi onUpdatePlace để cập nhật lại danh sách
    onUpdatePlace(updatedPlace);
    setOpenEditDialog(false);
  };
  
  const handlePaymentClose = () => {
    setopenPaymentUrlDialog(false);
    // toast.error('Payment failed!', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  }

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
                  {row.status === 'Pending' || row.status === 'Unpaid' ? '-' : row.status === 'Banned' ? <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'error.main' }} /> :  <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />}
                </TableCell>
                <TableCell>
                  <Label color={row.status === 'Pending' ? 'warning' : row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'error': row.status ==='Unpaid' ? 'info': row.status === 'Banned' ? 'default'  : 'default'}>
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
          <MenuItem onClick={(event) => { handleOpenEditDialog(row.id, event); handleClosePopover(); }}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
          <MenuItem onClick={() => { setOpenConfirmDialog(true); handleClosePopover(); }} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
         { 
          (row.status === "Unpaid")  
         && <MenuItem onClick={() => { handleOpenPayDialog(row.name, row.id); handleClosePopover(); }} sx={{ color: 'green' }}>
            <Iconify icon="solar:wallet-money-bold-duotone" />
            Pay
          </MenuItem>}
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
      {/* Pay Dialog */}
      <Dialog open={openPayDialog} onClose={handleCancelDelete}>
        <DialogTitle>Payment Confirmation</DialogTitle>
        <DialogContent>
        {`Are you sure you want to pay to ${row.placeTranslation[0]?.name}?`}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPayDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePaymentPlace} color="success">
            Pay
          </Button>
        </DialogActions>
      </Dialog>
      {/* Payment url Dialog */}
      <Dialog open={openPaymentUrlDialog} onClose={(event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    handlePaymentClose(); 
  }}
   fullWidth maxWidth="md">
        <DialogTitle>Payment page
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <iframe src={iframeUrl} ref={iframeRef} 
          width="100%" height="800" title='Payment page' />
        </DialogContent>
        <DialogActions>
    {/* <Button onClick={handlePaymentClose} color="primary">
      Close
    </Button> */}
  </DialogActions>
      </Dialog>


      {openEditDialog && (
  <UpdatePlaceForm
    open={openEditDialog}
    placeId={placeIdToEdit}
    onClose={() => setOpenEditDialog(false)}
    onPlaceUpdated={handlePlaceUpdated}
  />
)}

    </>
  );
}
