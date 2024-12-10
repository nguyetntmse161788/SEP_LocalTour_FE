import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Box, CircularProgress, Typography, Paper, Grid, Avatar, Divider, Stack, FormControl, InputLabel, Select, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface BannerHistory {
  id: string;
  bannerId: string;
  timeStart: string;
  timeEnd: string;
  status: string;
}

interface BannerDetail {
  id: string;
  bannerName: string;
  bannerUrl: string;
  authorId: string;
  authorName: string;
  authorProfileImage: string;
  createdDate: string;
  updatedDate: string;
  bannerHistories: BannerHistory[];
}

export function BannerDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [bannerDetail, setBannerDetail] = useState<BannerDetail | null>(state?.banner || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [updating, setUpdating] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<{ [key: string]: string }>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false); // state for dialog visibility
  const [timeStart, setTimeStart] = useState<string>('');
  const [timeEnd, setTimeEnd] = useState<string>('');
  const [bannerId, setBannerId] = useState<string>('');

  useEffect(() => {
    if (!bannerDetail) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found. Please log in.');
        navigate('/login');
        return;
      }

      if (state?.banner?.id) {
        setLoading(true);
        fetchBannerDetail(state.banner.id, token); // Use state.banner.id directly
      } else {
        setError('No banner ID available.');
      }
    }
  }, [bannerDetail, state?.banner?.id, navigate]);

  const fetchBannerDetail = async (id: string, token: string) => { // Renamed the parameter to `id`
    try {
      const response = await fetch(`https://api.localtour.space/api/Banner/GetAll?id=${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching banner details');
      }

      const bannerData = await response.json();
      setBannerDetail(bannerData);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (historyId: string, currentStatus: string) => {
    setUpdating(historyId);
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No authentication token found. Please log in.');
      navigate('/login');
      return;
    }
  
    const selectedStatus = newStatus[historyId] || currentStatus;
  
    console.log('historyId:', historyId); // In ra giá trị của historyId
    console.log('selectedStatus:', selectedStatus); // In ra giá trị của selectedStatus
  
    try {
      const response = await fetch(
        `https://api.localtour.space/api/Banner/UpdateHistoryStatus?bannerHistoryId=${historyId}&status=${selectedStatus}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating status');
      }
  
      setBannerDetail((prev) => ({
        ...prev!,
        bannerHistories: prev!.bannerHistories.map((history) =>
          history.id === historyId ? { ...history, status: selectedStatus } : history
        ),
      }));
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating status');
    } finally {
      setUpdating(null);
    }
  };
  

  const handleStatusSelect = (historyId: string, status: string) => {
    setNewStatus((prev) => ({ ...prev, [historyId]: status }));
  };

  const handleRunBanner = () => {
    setOpenDialog(true);
  };

  const handleSubmitBannerHistory = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No authentication token found. Please log in.');
      navigate('/login');
      return;
    }
  
    console.log('bannerId:', bannerId); // In ra bannerId
    console.log('timeStart:', timeStart); // In ra timeStart
    console.log('timeEnd:', timeEnd); // In ra timeEnd
  
    try {
      console.log('Data to send:', { bannerId, timeStart, timeEnd });
      const response = await fetch('https://api.localtour.space/api/Banner/CreateHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bannerId,
          timeStart,
          timeEnd,
        }),
      });
  
      console.log('Response status:', response.status); 
      console.log('Response body:', await response.json()); 
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data:', errorData); // Kiểm tra lỗi từ server
        throw new Error(errorData.message || 'Error creating banner history');
      }
  
      setOpenDialog(false);
      alert('Banner history created successfully!');
    } catch (err: any) {
      console.error('Error occurred:', err); // In ra lỗi nếu có
      setError(err.message || 'An error occurred while creating banner history');
    }
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6" textAlign="center">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh' }}>
      {bannerDetail && (
        <Paper elevation={3} sx={{ maxWidth: 900, mx: 'auto', p: 4, borderRadius: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} textAlign="center">
              <Typography variant="h5" gutterBottom>
                Banner Details
              </Typography>
              <img src={bannerDetail.bannerUrl} alt={bannerDetail.bannerName} style={{ width: '100%', borderRadius: 8 }} />
            </Grid>

            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item>
                <Avatar src={bannerDetail.authorProfileImage} alt={bannerDetail.authorName} sx={{ width: 56, height: 56 }} />
              </Grid>
              <Grid item>
                <Typography variant="h6">{bannerDetail.authorName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {format(new Date(bannerDetail.createdDate), 'PPpp')}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ width: '100%' }} />

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleRunBanner} sx={{ mt: 3 }}>
                Run Banner
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                Banner History
              </Typography>
              {bannerDetail.bannerHistories.length === 0 ? (
                <Typography variant="body1">No history available.</Typography>
              ) : (
                <Stack spacing={2}>
                  {bannerDetail.bannerHistories.map((history) => (
                    <Box
                      key={history.id}
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        p: 2,
                        gap: 2,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant="body1" color="textSecondary">
                        Time Start: {format(new Date(history.timeStart), 'PPpp')}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Time End: {format(new Date(history.timeEnd), 'PPpp')}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Status:</strong> {history.status}
                      </Typography>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={4}>
                          <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                              value={newStatus[history.id] || history.status}
                              onChange={(e) => handleStatusSelect(history.id, e.target.value)}
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Hide">Hide</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3} textAlign="right">
                          <Button
                            variant="contained"
                            onClick={() => handleStatusChange(history.id, history.status)}
                            disabled={updating === history.id}
                            sx={{ minWidth: 120 }}
                          >
                            {updating === history.id ? 'Updating...' : 'Change Status'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Stack>
              )}
            </Grid>


          </Grid>
        </Paper>
      )}

      {/* Dialog for selecting timeStart and timeEnd */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Banner Run Time</DialogTitle>
        <DialogContent>
          <TextField
            label="Time Start"
            type="datetime-local"
            fullWidth
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time End"
            type="datetime-local"
            fullWidth
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitBannerHistory} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
