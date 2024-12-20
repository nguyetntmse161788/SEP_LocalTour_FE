import React, { useEffect, useState } from 'react';
import {
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Box,
  Paper,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import axios from 'axios';
import { isTokenExpired, refreshAccessToken } from 'src/utils/auth';
import { AnalyticsWidgetSummary } from './analytics-widget-summary';

interface User {
  fullName: string;
  userName: string;
  userProfileImage: string;
  email: string;
  dateOfBirth: string | null;
  gender: string | null;
  address: string | null;
  phoneNumber: string;
  totalSchedules: number;
  totalPosteds: number;
  totalReviews: number;
  totalFollowed: number;
  totalFollowers: number;
  isFollowed: boolean;
  isHasPassword: boolean;
}

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        let token = localStorage.getItem('accessToken');
        if (!token || isTokenExpired(token)) {
          try {
            token = await refreshAccessToken();  // Refresh the access token if it's expired
          } catch (error) {
            console.error('Unable to refresh access token');
            throw new Error('Token refresh failed');
          }
        }

        const response = await axios.get(
          `https://api.localtour.space/api/User/getProfile?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const statsResponse = await axios.get(
          'https://api.localtour.space/api/Statistic/GetTotalPlaceAsync',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography variant="h6" textAlign="center">
        No user data found. Please log in.
      </Typography>
    );
  }
  

  return (
    <Box
      display="flex"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 800, p: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Avatar Section */}
          <Grid item xs={12} md={12}>
  <AnalyticsWidgetSummary
    title="Total expenditure"
    total={stats.totalPrice}
    icon={
      <Avatar
        src={user.userProfileImage}
        alt={user.fullName}
        sx={{
          width: 50,  // Increase the width
          height: 50, // Increase the height
          border: '4px solid',
          borderColor: 'primary.main',
        }}
      />
    }
    chart={{
      series: [],
      categories: [],
    }}
    color="success"
  />
</Grid>



          <Divider sx={{ width: '100%' }} />

          {/* Information Section */}
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography variant="body1">
                <strong>Full Name:</strong> {user.fullName}
              </Typography>
              <Typography variant="body1">
                <strong>User Name:</strong> {user.userName}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email || 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {user.phoneNumber || 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Date of Birth:</strong> {user.dateOfBirth || 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Gender:</strong> {user.gender || 'N/A'}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {user.address || 'N/A'}
              </Typography>
            </Stack>
          </Grid>

          <Divider sx={{ width: '100%' }} />
        </Grid>
      </Paper>
    </Box>
  );
}

export default UserProfile;
