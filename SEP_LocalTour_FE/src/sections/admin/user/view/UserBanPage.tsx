import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function UserBanPage() {
  const { state } = useLocation();
  const { userId, username, endDate } = state || {};
  const [banEndDate, setBanEndDate] = useState(endDate || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No token found');
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBanEndDate(event.target.value);
  };

  const handleBanUser = async () => {
    if (!banEndDate) {
      setError('Ban end date is required.');
      return;
    }

    if (!token) {
      setError('Authentication required. Please log in again.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(
        `https://api.localtour.space/api/User/BanUser?userId=${userId}&endDate=${encodeURIComponent(banEndDate)}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess('User banned successfully!');
        setBanEndDate('');
      } else {
        setError(`Failed to ban user. Server returned status: ${response.status}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to ban user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh"
      bgcolor="#f9f9f9"
      sx={{
        maxWidth: '90vw',
        padding: 2,
      }}
    >
      <Card sx={{ width: 400, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" marginBottom={2}>
            Ban User
          </Typography>

          {error && (
            <Typography color="error" variant="body2" align="center" marginBottom={2}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="success.main" variant="body2" align="center" marginBottom={2}>
              {success}
            </Typography>
          )}

          {userId && username && (
            <>
              <Typography variant="body1" marginBottom={1}>
                <strong>ID:</strong> {userId}
              </Typography>
              <Typography variant="body1" marginBottom={1}>
                <strong>User Name:</strong> {username}
              </Typography>
              <TextField
                label="Ban End Date"
                type="date"
                value={banEndDate}
                onChange={handleDateChange}
                fullWidth
                sx={{ mt: 2, mb: 3 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Box textAlign="center" marginTop={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleBanUser}
                  sx={{ width: '100%' }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Ban User'}
                </Button>
              </Box>
            </>
          )}

          <Box textAlign="center" marginTop={2}>
            <Button variant="text" onClick={() => navigate('/admin/user ')} sx={{ width: '100%' }}>
              Go to Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserBanPage;
