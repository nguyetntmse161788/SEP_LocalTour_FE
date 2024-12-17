import { useState, useEffect } from 'react';  
import { useParams, useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axiosInstance from 'src/utils/axiosInstance';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { NewActivityForm } from './new-activity-form'; // Import NewEventForm



export function PlaceDetailView() {
  const { id } = useParams(); // Lấy ID từ URL
  const [place, setPlace] = useState<any>(null); // Chứa dữ liệu place
  const [loading, setLoading] = useState<boolean>(true); // Kiểm tra trạng thái loading
  const [openNewActivityForm, setOpenNewActivityForm] = useState(false); // Mở form tạo sự kiện
  const navigate = useNavigate(); // Hook điều hướng
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Trạng thái của dialog
  const [activityToDelete, setActivityToDelete] = useState<any>(null); // Lưu hoạt động cần xóa

  // Hàm mở dialog khi nhấn vào thùng rác
  const handleOpenDeleteDialog = (activity: any) => {
    setActivityToDelete(activity); // Lưu hoạt động cần xóa
    setOpenDeleteDialog(true); // Mở dialog
  };

  // Hàm đóng dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Đóng dialog
  };

  // Hàm xóa hoạt động
  const handleDeleteActivity = async () => {
    if (activityToDelete) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found');
          return;
        }

        const response = await axiosInstance.delete(
          `https://api.localtour.space/api/PlaceActivity/delete?placeid=${place.id}&activityid=${activityToDelete.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        console.log('Activity deleted', response.data);
        await fetchPlaceDetail();
        setOpenDeleteDialog(false); // Đóng dialog sau khi xóa thành công
        // Cập nhật lại state hoặc thực hiện các hành động khác nếu cần
      } catch (error) {
        console.error("Error deleting activity", error);
      }
    }
  };

  // Hàm xử lý sự kiện sau khi tạo thành công
  const handleActivityCreated = async () => {
    await fetchPlaceDetail(); // Fetch the updated data from the server
    setOpenNewActivityForm(false); // Close the form after successful creation
  };

  const fetchPlaceDetail = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await axiosInstance.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlace(response.data); // Lưu dữ liệu place
      setLoading(false); // Đặt loading thành false khi đã lấy dữ liệu
    } catch (error) {
      console.error("Error fetching place details", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaceDetail();
  }, [id]);

  if (loading) {
    return (
      <DashboardContent>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
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

  const isPending = place.status === '0';  // Pending
  const isApproved = place.status === '1';  // Approved
  const isRejected = place.status === '2';  // Rejected

  return (
    <DashboardContent>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={() => navigate('/owner/activity')}
        >
          Back to List
        </Button>
        <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>
    Place Detail
  </Typography>
        {/* <Button
          variant="contained"
          color="secondary"
          startIcon={<Iconify icon="mingcute:edit-line" />}
        >
          Edit
        </Button> */}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <Box mb={2} display="flex" justifyContent="center">
            <img 
              src={place.photoDisplay || '/placeholder.png'} 
              alt={place.placeTranslations[0]?.name || 'No name available'} 
              style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }} 
            />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h5" mb={2}>{place.placeTranslations[0]?.name}</Typography>
            <Typography variant="body1" mb={2}>Address: {place.placeTranslations[0]?.address}</Typography>
            <Typography variant="body1" mb={2}>Description: {place.placeTranslations[0]?.description}</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Opening Time: {place.timeOpen}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Closing Time: {place.timeClose}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Longitude: {place.longitude}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Latitude: {place.latitude}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Status: {place.status === 'Approved' ? 'Approved' : place.status === 'Rejected' ? 'Rejected' : 'Pending'}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h5" mb={3} display="flex" justifyContent="space-between" alignItems="center">
      <span>Place Activity</span>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => setOpenNewActivityForm(true)}
      >
        Create Activity
      </Button>
    </Typography>
      {place.placeActivities?.length > 0 && (
  <Box mt={4}>
    {/* <Typography variant="h5" mb={3} display="flex" justifyContent="space-between" alignItems="center">
      <span>Place Activity</span>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => setOpenNewActivityForm(true)}
      >
        Create Activity
      </Button>
    </Typography> */}

    <Grid container spacing={3}>
      {place.placeActivities.map((activity: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={activity.id}>
          <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {activity.photoDisplay ? (
                <img 
                  src={activity.photoDisplay} 
                  alt={place.placeTranslations[0]?.name || 'Unnamed Place'} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <Typography
                  variant="h3"
                  style={{
                    color: '#fff',
                    backgroundColor: '#3f51b5',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {place.placeTranslations[0]?.name?.charAt(0).toUpperCase() || 'N'}
                </Typography>
              )}
            </Box>

            <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
              {activity.placeActivityTranslations[0]?.activityName}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleOpenDeleteDialog(activity)}
              startIcon={<Iconify icon="eva:trash-2-fill" />} // Biểu tượng thùng rác
              sx={{ marginLeft: 'auto', display: 'block' }} // Đẩy nút về phía bên phải
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)}


      <NewActivityForm
        open={openNewActivityForm}
        onClose={() => setOpenNewActivityForm(false)}
        onActivityCreated={handleActivityCreated}
        placeId={id || ''} 
      />
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Are you sure you want to delete this activity?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            This action cannot be undone. Please confirm if you want to delete this activity.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteActivity} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
