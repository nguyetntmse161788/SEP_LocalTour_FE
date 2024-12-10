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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');

        if (!userId || !token) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(
          `https://api.localtour.space/api/User/getProfile?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
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
          <Grid item xs={12} textAlign="center">
            <Avatar
              src={user.userProfileImage}
              alt={user.fullName}
              sx={{
                width: 150,
                height: 150,
                border: '4px solid',
                borderColor: 'primary.main',
                marginBottom: 2,
              }}
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

          {/* Summary Section */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                <strong>Followers:</strong> {user.totalFollowers}
              </Typography>
              <Typography variant="body1">
                <strong>Following:</strong> {user.totalFollowed}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <Typography variant="body1">
                <strong>Posts:</strong> {user.totalPosteds}
              </Typography>
              <Typography variant="body1">
                <strong>Reviews:</strong> {user.totalReviews}
              </Typography>
            </Grid>
          </Grid>

          {/* Button Section */}
          <Grid item xs={12}>
            {/* <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => console.log('Edit Profile Clicked')}
            >
              Edit Profile
            </Button> */}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UserProfile;
