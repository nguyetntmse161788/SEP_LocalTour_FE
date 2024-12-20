import { useState, useEffect } from 'react';  
import { useParams, useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import axiosInstance from 'src/utils/axiosInstance';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export function PlaceReportDetailView() {
  const { id } = useParams(); 
  const [place, setPlace] = useState<any>(null); 
  const [report, setReport] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate(); 
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleConfirmBan = () => {
    handleChangeStatus('Banned'); // Gọi hàm cập nhật trạng thái
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`https://api.localtour.space/api/PlaceReport/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlace(response.data.data.place);
        setReport(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching place details');
        setLoading(false);
      }
    };

    fetchPlaceDetail();
  }, [id]);

  const handleChangeStatus = async (status: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found');
      return;
    }

    try {
      const response = await axiosInstance.put(
        `https://api.localtour.space/api/Place/changeStatusPlace?placeid=${place.id}&status=${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setReport((prevPlaceReport: any) => ({ ...prevPlaceReport, status }));
      }
    } catch (error) {
      setError('Error changing status');
    }
    try {
      const response = await axiosInstance.put(
        `https://api.localtour.space/api/PlaceReport/changeStatusPlaceReport?placereportid=${report.id}&status=Approved`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setPlace((prevPlace: any) => ({ ...prevPlace, status }));
      }
    } catch (error) {
      setError('Error changing status');
    }
  };

  if (loading) {
    return (
      <DashboardContent>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>Loading...</Typography>
        </Box>
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h5" color="error">{error}</Typography>
        </Box>
      </DashboardContent>
    );
  }

  if (!place) {
    return (
      <DashboardContent>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h5">Place not found</Typography>
        </Box>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      {/* Header Section */}
      <Box mb={4} display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={() => navigate('/placeReport')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" sx={{ textAlign: 'center', flexGrow: 1 }}>
          Place Report Detail
        </Typography>
      </Box>

      {/* Report Information Section */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, mb: 2 }}>
            <Typography variant="h6" mb={2}>Reported By</Typography>
            <Typography variant="body1"><strong>User:</strong> {report?.userReport.userName || 'N/A'}</Typography>
            <Typography variant="body2"><strong>Email:</strong> {report?.userReport.email || 'N/A'}</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3, mb: 2 }}>
            <Typography variant="h6" mb={2}>Report Information</Typography>
            <Typography variant="body1"><strong>Report Date:</strong> {new Date(report.reportDate).toLocaleString()}</Typography>
            {/* <Typography variant="body1"><strong>Status:</strong> {report.status}</Typography> */}
            <Typography variant="body1"><strong>Content:</strong> {report.content}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Place Information Section */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, boxShadow: 3, mb: 2 }}>
            <Box display="flex" justifyContent="center">
              <img 
                src={place.photoDisplay} 
                alt={place.placeTranslations[0]?.name} 
                style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} 
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, boxShadow: 3, mb: 2 }}>
            <Typography variant="h5" mb={2}>{place.placeTranslations[0]?.name}</Typography>
            <Typography variant="body1" mb={2}><strong>Address:</strong> {place.placeTranslations[0]?.address}</Typography>
            <Typography variant="body1" mb={2}><strong>Description:</strong> {place.placeTranslations[0]?.description}</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6"><strong>Opening Time:</strong> {place.timeOpen}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6"><strong>Closing Time:</strong> {place.timeClose}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6"><strong>Longitude:</strong> {place.longitude}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6"><strong>Latitude:</strong> {place.latitude}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6"><strong>Status:</strong> {place.status === 'Approved' ? 'Approved' : place.status === 'Rejected' ? 'Rejected': place.status === 'Banned' ? 'Banned' : 'Pending'}</Typography>
              </Grid>
            </Grid>

            <Box mt={3} display="flex" gap={2} justifyContent="right">
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenDialog}
                disabled={place.status === 'Banned'}
                sx={{
                  minWidth: '100px',
                  width: 'auto', 
                  padding: '6px 12px',
                }}
              >
                Ban
              </Button>
            </Box>
            <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="confirm-dialog-title"
          >
            <DialogTitle id="confirm-dialog-title">Confirm Action</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to ban this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="inherit">
                Cancel
              </Button>
              <Button onClick={handleConfirmBan} color="error">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
