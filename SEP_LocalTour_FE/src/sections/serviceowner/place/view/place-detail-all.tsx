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
import axiosInstance from 'src/utils/axiosInstance';

export function PlaceDetailAll() {
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
      const response = await axiosInstance.put(
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
          onClick={() => navigate('/owner/created')}  // Điều hướng về danh sách Places
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
                <Typography variant="h6">Status: {place.status === 'Approved' ? 'Approved' : place.status === 'Rejected' ? 'Rejected' : place.status === 'Unpaid' ? 'Unpaid': place.status === 'Pending' ? 'Pending': 'Banned'}</Typography>
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
      

    </DashboardContent>
  );
}
