import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios'; 

export function UserRolePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userId, userName, role } = location.state || {}; // Get user, userId, and role from state
  const [selectedRole, setSelectedRole] = useState(role || ''); // Initialize with current role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('accessToken');  

  useEffect(() => {
    if (!user) {
      setError('No user data found!');
    }
  }, [user]);

  const handleRoleChange = (event: { target: { value: any; }; }) => {
    setSelectedRole(event.target.value);
  };

  const handleSaveRole = async () => {
    if (!token) {
      setError('Authentication required. Please log in again.');
      return;
    }

    try {
      // Construct the API URL
      const url = `https://api.localtour.space/api/User/addRole?userId=${userId}&role=${selectedRole}`;
      
      // Send the data as a POST request with the required parameters and authorization header
      const response = await axios.post(url, {
        userId,
        userName,
        role: selectedRole,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSuccess('Role updated successfully!');
      }
    } catch (err) {
      setError('Failed to update role. Please try again.');
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
            User Role Page
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

          {user && (
            <>
              <Typography variant="body1" marginBottom={1}>
                <strong>ID:</strong> {userId}
              </Typography>
              <Typography variant="body1" marginBottom={1}>
                <strong>User Name:</strong> {userName}
              </Typography>
              <Typography variant="body1" marginBottom={1}>
                <strong>Current Role:</strong> {role}
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel>New Role</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  label="New Role"
                >
                  <MenuItem value="Moderator">Moderator</MenuItem>
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Visitor">Visitor</MenuItem>
                  <MenuItem value="Service Owner">Service Owner</MenuItem>
                </Select>
              </FormControl>

              <Box textAlign="center" marginTop={2}>
                <Button variant="contained" color="primary" onClick={handleSaveRole} sx={{ width: '100%' }}>
                  Save Role
                </Button>
              </Box>
            </>
          )}

          <Box textAlign="center" marginTop={2}>
            <Button variant="text" onClick={() => navigate('/profile')} sx={{ width: '100%' }}>
              Go to Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserRolePage;
