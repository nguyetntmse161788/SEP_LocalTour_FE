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
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { NewEventForm } from './new-event-form';
import { UpdateEventForm } from './update-event-form';


export function PlaceDetailView() {
  const { id } = useParams(); // Lấy ID từ URL
  const [place, setPlace] = useState<any>(null); // Chứa dữ liệu place
  const [placeEvents, setPlaceEvents] = useState<any[]>([]); // Chứa danh sách sự kiện của place
  const [loading, setLoading] = useState<boolean>(true); // Kiểm tra trạng thái loading
  const [openNewEventForm, setOpenNewEventForm] = useState(false); // Mở form tạo sự kiện
  const navigate = useNavigate(); // Hook điều hướng
  const [openEditEventForm, setOpenEditEventForm] = useState(false); // Hiển thị form chỉnh sửa
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Dữ liệu event được chọn
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any>(null); 

  // Hàm xử lý sự kiện sau khi tạo thành công
  const handleEventCreated = async (newEvent: any) => {
    await fetchPlaceEvents();
  };

  // Fetch dữ liệu Place từ API
  useEffect(() => {
    const fetchPlaceDetail = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await axios.get(`https://api.localtour.space/api/Place/getPlaceById?languageCode=vi&placeid=${id}`, {
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

    fetchPlaceDetail();
  }, [id]); // Khi ID thay đổi, sẽ gọi lại API

  // Fetch dữ liệu Place Events từ API
  useEffect(() => {
    const fetchPlaceEvents = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await axios.get(`https://api.localtour.space/api/Event/getall?placeid=${id}&languageCode=vi`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Place events data:', response.data.items); 
        setPlaceEvents(response.data.items); // Lưu dữ liệu sự kiện
      } catch (error) {
        console.error("Error fetching place events", error);
      }
    };

    if (id) {
      fetchPlaceEvents();
    }
  }, [id]); // Khi ID thay đổi, sẽ gọi lại API lấy sự kiện

  const fetchPlaceEvents = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }
  
    try {
      const response = await axios.get(`https://api.localtour.space/api/Event/getall?placeid=${id}&languageCode=vi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Updated place events data:', response.data.items);
      setPlaceEvents(response.data.items); // Cập nhật lại danh sách sự kiện mới
    } catch (error) {
      console.error("Error fetching place events", error);
    }
  };
  
  // Hàm xử lý khi sự kiện được cập nhật
  const handleEventUpdated = async (updatedEvent: any) => {
    // Sau khi sự kiện được cập nhật, gọi lại API để lấy danh sách sự kiện mới nhất
    await fetchPlaceEvents();
    setOpenEditEventForm(false); // Đóng form sau khi cập nhật
  };
  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      await axios.delete(`https://api.localtour.space/api/Event/delete?placeid=${id}&eventid=${eventToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaceEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventToDelete.id)); // Cập nhật lại danh sách sự kiện
      setOpenDeleteDialog(false); // Đóng dialog
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  const handleOpenDeleteDialog = (event: any) => {
    setEventToDelete(event);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setEventToDelete(null);
  };

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
          onClick={() => navigate('/owner/event')}
        >
          Back to List
        </Button>
        <Typography variant="h4">Place Detail</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Iconify icon="mingcute:edit-line" />}
        >
          Edit
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <Box mb={2} display="flex" justifyContent="center">
              <img 
                src={place.photoDisplay} 
                alt={place.placeTranslations[0]?.name} 
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">Place Events</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => setOpenNewEventForm(true)}
            >
              Create Event
            </Button>
          </Box>
          {placeEvents.length > 0 ? (
  <Box mt={4}>
    <Grid container spacing={3}>
      {placeEvents.map((event: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
          <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2, height: "100%" }}>
            <Box position="relative" mb={2}>
              {event.eventPhotoDisplay ? (
                <img
                  src={event.eventPhotoDisplay}
                  alt={event.eventName || "Event"}
                  style={{
                    width: "100%", // Chiều rộng chiếm hết card
                    height: "200px", // Đặt chiều cao cố định
                    borderRadius: "8px", // Bo góc (nếu muốn)
                    objectFit: "cover", // Đảm bảo ảnh hiển thị đẹp mà không méo
                  }}
                />
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "8px",
                    backgroundColor: "#f0f0f0",
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "#888",
                  }}
                >
                  {event.eventName?.charAt(0)}
                </Box>
              )}
            </Box>

            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              mb={1}
            >
              {event.eventName}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={1}>
              Start Date: {event.startDate}
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={1}>
              End Date: {event.endDate}
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button variant="outlined" size="small" color="primary">
                View
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                startIcon={<Iconify icon="eva:edit-outline" />}
                onClick={() => {
                  setSelectedEvent(event); // Lưu event được chọn
                  setOpenEditEventForm(true); // Mở form chỉnh sửa
                  console.log(event);
                }}
              >
                Edit
              </Button>
              <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleOpenDeleteDialog(event)} 
                >
                  <Iconify icon="eva:trash-2-outline" />
                </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
) : (
  <Typography variant="body1" color="text.secondary" mt={3}>
    No events found for this place.
  </Typography>
)}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteEvent} color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
{openEditEventForm && (
  <UpdateEventForm
    open={openEditEventForm}
    onClose={() => setOpenEditEventForm(false)}
    initialData={selectedEvent} // Truyền dữ liệu event để chỉnh sửa
    onEventUpdated={handleEventUpdated}
    placeId={id || ''} 
    eventId={selectedEvent?.id || ''} 
  />
)}



      {/* Hiển thị form tạo sự kiện */}
      <NewEventForm
        open={openNewEventForm}
        onClose={() => setOpenNewEventForm(false)}
        onEventCreated={handleEventCreated}
        placeId={id || ''} 
      />
    </DashboardContent>
  );
}
