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

export function PlaceDetailView() {
  const { id } = useParams(); // Lấy ID từ URL
  const [place, setPlace] = useState<any>(null); // Chứa dữ liệu place
  const [loading, setLoading] = useState<boolean>(true); // Kiểm tra trạng thái loading
  const navigate = useNavigate(); // Hook điều hướng

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

  const handleChangeStatus = async (status: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      console.log(`Changing status to: ${status}`); // Log trạng thái để kiểm tra
      const response = await axios.put(
        `https://api.localtour.space/api/Place/changeStatusPlace?placeid=${id}&status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(`Status updated to: ${status}`); // Log khi thành công
        setPlace((prevPlace: any) => ({ ...prevPlace, status }));
      }
    } catch (error) {
      console.error("Error changing status", error);
    }
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
          startIcon={<Iconify icon="eva:arrow-back-fill" />}  // Mũi tên quay lại
          onClick={() => navigate('/owner/place')}  // Điều hướng về danh sách Places
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
          {/* Card for Image */}
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
          {/* Card for Place Information */}
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
                <Typography variant="h6">Status: {place.status === '1' ? 'Approved' : place.status === '2' ? 'Rejected' : 'Pending'}</Typography>
              </Grid>
            </Grid>

            
          </Card>

          {/* Additional Translations */}
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
      {place.placeActivities?.length > 0 && (
  <Box mt={4}>
    {/* Tiêu đề Place Activity */}
    <Typography variant="h5" mb={3}>
      Place Activity
    </Typography>

    {/* Danh sách các Activity */}
    <Grid container spacing={3}>
      {place.placeActivities.map((activity: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={activity.id}>
          {/* Card hiển thị thông tin Activity */}
          <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Box position="relative" mb={2}>
              {/* Hình ảnh Activity */}
              <img
                src={activity.photoDisplay}
                alt={activity.placeActivityTranslations[0]?.activityName || "Activity"}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              {/* Badge SALE */}
              {activity.placeActivityTranslations[0]?.discount > 0 && (
                <Box
                  position="absolute"
                  top={8}
                  right={8}
                  bgcolor="error.main"
                  color="white"
                  px={1}
                  py={0.5}
                  borderRadius={1}
                  fontSize="12px"
                  fontWeight="bold"
                >
                  SALE
                </Box>
              )}
            </Box>

            {/* Tên Activity */}
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              mb={1}
            >
              {activity.placeActivityTranslations[0]?.activityName}
            </Typography>

            {/* Giá và thông tin bổ sung */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                {/* Giá Activity */}
                <Typography variant="subtitle1" color="text.secondary">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: activity.placeActivityTranslations[0]?.priceType || 'VND',
                  }).format(activity.placeActivityTranslations[0]?.price)}
                </Typography>
              </Box>

              {/* Trạng thái hoặc nút thêm */}
              <Button
                variant="outlined"
                size="small"
                color="primary"
              >
                View
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)}
    </DashboardContent>
  );
}
