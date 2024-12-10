import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, CircularProgress, Grid, Paper, Divider, Stack } from '@mui/material';
import { format } from 'date-fns'; // Thư viện để xử lý ngày tháng

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

  useEffect(() => {
    if (!bannerDetail) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found. Please log in.');
        navigate('/login');  // Chuyển hướng đến trang đăng nhập nếu không có token
        return;
      }

      setLoading(true);
      const bannerId = state?.banner?.id;
      if (!bannerId) {
        setError('No banner ID available.');
        setLoading(false);
        return;
      }

      fetchBannerDetail(bannerId, token);
    }
  }, [bannerDetail, state?.banner?.id, navigate]); // Đảm bảo 'navigate' được bao gồm trong dependencies

  const fetchBannerDetail = async (bannerId: string, token: string) => {
    try {
      const response = await fetch(`https://api.localtour.space/api/Banner/GetDetail?id=${bannerId}`, {
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

    const newStatus = currentStatus === 'Active' ? 'Hide' : 'Active';

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No authentication token found. Please log in.');
      setUpdating(null);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(
        `https://api.localtour.space/api/Banner/UpdateHistoryStatus?bannerHistoryId=${historyId}&status=${newStatus}`,
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
        console.log(errorData); // Log the error data
        throw new Error(errorData.message || 'Error updating status');
      }

      // Cập nhật lại trạng thái của bannerDetail
      if (bannerDetail) {
        setBannerDetail((prev) => ({
          ...prev!,
          bannerHistories: prev!.bannerHistories.map((history) =>
            history.id === historyId ? { ...history, status: newStatus } : history
          ),
        }));
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating status');
    } finally {
      setUpdating(null);
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
            <Grid item>
              <Button variant="contained" onClick={() => { /* Thêm logic xử lý cho nút Run ở đây */ }}>
                Run Banner
              </Button>
            </Grid>

            <Grid item xs={12} textAlign="center" sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <Typography variant="h5" gutterBottom>
                Banner Details
              </Typography>
              <img src={bannerDetail.bannerUrl} alt={bannerDetail.bannerName} style={{ width: '100%', borderRadius: 8 }} />
            </Grid>

            <Grid item xs={12} container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  src={bannerDetail.authorProfileImage}
                  alt={bannerDetail.authorName}
                  sx={{ width: 56, height: 56, border: '2px solid', borderColor: 'primary.main' }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{bannerDetail.authorName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {format(new Date(bannerDetail.createdDate), 'PPpp')} |{' '}
                  {format(new Date(bannerDetail.updatedDate), 'PPpp')}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ width: '100%' }} />

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Banner History
              </Typography>
              {bannerDetail.bannerHistories.length === 0 ? (
                <Typography variant="body1">No history available.</Typography>
              ) : (
                <Stack spacing={2}>
                  {bannerDetail.bannerHistories.map((history) => (
                    <Box key={history.id} sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
                      <Typography variant="body1" color="textSecondary">
                        Time Start: {format(new Date(history.timeStart), 'PPpp')}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Time End: {format(new Date(history.timeEnd), 'PPpp')}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Status:</strong> {history.status}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        onClick={() => handleStatusChange(history.id, history.status)}
                        disabled={updating === history.id}
                      >
                        {updating === history.id ? 'Updating...' : 'Change Status'}
                      </Button>
                    </Box>
                  ))}
                </Stack>
              )}
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate(-1)}>
                Back to list
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}

export default BannerDetailPage;
