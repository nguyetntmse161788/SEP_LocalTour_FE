import { useState, useEffect } from 'react';  
import { useParams, useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import axios from 'axios';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { NewEventForm } from './new-event-form'; // Import NewEventForm

export function PlaceDetailView() {
  const { id } = useParams(); // Lấy ID từ URL
  const [place, setPlace] = useState<any>(null); // Chứa dữ liệu place
  const [placeEvents, setPlaceEvents] = useState<any[]>([]); // Chứa danh sách sự kiện của place
  const [loading, setLoading] = useState<boolean>(true); // Kiểm tra trạng thái loading
  const [openNewEventForm, setOpenNewEventForm] = useState(false); // Mở form tạo sự kiện
  const navigate = useNavigate(); // Hook điều hướng

  // Hàm xử lý sự kiện sau khi tạo thành công
  const handleEventCreated = (newEvent: any) => {
    setPlaceEvents((prevEvents) => [...prevEvents, newEvent]); // Thêm sự kiện mới vào danh sách
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

          {place.placeTranslations.length > 1 && (
            <Card sx={{ mt: 3, p: 3, boxShadow: 3 }}>
              <Typography variant="h6" mb={2}>Other Translations:</Typography>
              {place.placeTranslations.map((translation: any, index: number) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">Name: {translation.name}</Typography>
                  <Typography variant="body1">Description: {translation.description}</Typography>
                  <Typography variant="body1">Address: {translation.address}</Typography>
                  <Typography variant="body1">Contact: {translation.contact}</Typography>
                </Box>
              ))}
            </Card>
          )}
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
          <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Box position="relative" mb={2}>
              {event.eventPhotoDisplay ? (
                <img
                  src={event.eventPhotoDisplay}
                  alt={event.eventName || "Event"}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: "100%",
                    height: 200,
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
