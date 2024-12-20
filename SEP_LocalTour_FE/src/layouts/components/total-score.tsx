import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axiosInstance";

export function ModeratorTotalPoints() {
  const [totalPoints, setTotalPoints] = useState<number | null>(null);
  const role = JSON.parse(localStorage.getItem('role') || '[]');
  const token = localStorage.getItem('accessToken');
  

  useEffect(() => {
    const fetchTotalPoints = async () => {
      if (role.includes('Moderator')) {
        try {
          const response = await fetch(`https://api.localtour.space/api/Statistic/GetTotalModApprovedAsync`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          const total = parseInt(data, 10); 
          setTotalPoints(total || 0); // Gán tổng điểm từ API
        } catch (error) {
          console.error('Error fetching moderator points:', error);
        }
      }
    };

    fetchTotalPoints();
    const handleUpdatePoints = () => {
      fetchTotalPoints();
    };
  
    window.addEventListener('updateModeratorPoints', handleUpdatePoints);
  
    // Cleanup listener
    return () => {
      window.removeEventListener('updateModeratorPoints', handleUpdatePoints);
    };
  }, [role]);

  if (!Array.isArray(role) || !role.includes('Moderator')) {
    return null;
  }



  return (
    <Box display="flex" alignItems="center">
      <Card sx={{
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        boxShadow: 3,
        padding: ' 12px',
        paddingTop: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '80px',
        maxWidth: '120px',
      }}>
        <CardContent sx={{ padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body2" fontWeight="bold" color="primary" align="center" sx={{ fontSize: '0.875rem' }}>
            Points
          </Typography>
          <Typography variant="h6" fontWeight="medium" color="secondary" align="center" sx={{ fontSize: '1rem' }}>
            {totalPoints !== null ? `${totalPoints} score` : 'Loading...'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}