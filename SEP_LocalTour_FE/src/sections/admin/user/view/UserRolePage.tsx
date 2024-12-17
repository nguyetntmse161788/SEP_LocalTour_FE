import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

export function UserRolePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userId, username, roles } = location.state || {}; // Get user, userId, and role from state
  const [selectedRole, setSelectedRole] = useState(roles || ''); // Initialize with current role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userRoles, setUserRoles] = useState(roles || []);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!user) {
      setError('No user data found!');
    }
  }, [user]);

  const handleRoleChange = (event: { target: { value: any; }; }) => {
    setSelectedRole(event.target.value);
  };

  const handleRemoveRole = async (roleToRemove: any) => {
    if (!token) {
      setError('Authentication required. Please log in again.');
      return;
    }

    try {
      // Construct the API URL for removing the role
      const url = `https://api.localtour.space/api/User/removeRole?userId=${userId}&role=${roleToRemove}`;

      // Make the API call to remove the role
      const response = await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        // Role removed successfully, now fetch the updated roles
        await fetchUserRoles(); // Fetch updated roles
        setSuccess(`Role "${roleToRemove}" removed successfully.`);
        setTimeout(() => {
          navigate('/admin/user'); // Redirect to /admin/user page
        }, 500); // Optionally delay the redirect to show the success message
      } else {
        setError('Failed to remove role. Please try again.');
      }
    } catch (err) {
      setError('Failed to remove role. Please try again.');
    }
  };

  const fetchUserRoles = async () => {
    try {
      const url = `https://api.localtour.space/api/User/getRoles?userId=${userId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUserRoles(response.data.roles); // Update state with the new roles
      } else {
        setError('Failed to fetch updated roles. Please try again.');
      }
    } catch (err) {
      setError('Failed to fetch updated roles. Please try again.');
    }
  };

  const handleSaveRole = async () => {
    if (!token) {
      setError('Authentication required. Please log in again.');
      return;
    }

    try {
      // Construct the API URL for adding the role
      const url = `https://api.localtour.space/api/User/addRole?userId=${userId}&role=${selectedRole}`;

      // Send the data as a POST request with the required parameters and authorization header
      const response = await axios.post(url, {
        userId,
        username,
        role: selectedRole,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSuccess('Role updated successfully!');
        setTimeout(() => {
          navigate('/admin/user'); // Redirect to /admin/user page after success
        }, 500); // Optionally delay the redirect to show the success message
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
                <strong>User Name:</strong> {username}
              </Typography>
              <Typography variant="body1" marginBottom={1}>
                <strong>Current Role:</strong>
              </Typography>

              {userRoles && Array.isArray(userRoles) && userRoles.length > 0 ? (
                <ul>
                  {userRoles.map((roleItem, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      {roleItem}
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleRemoveRole(roleItem)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No roles found.
                </Typography>
              )}

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
            <Button variant="text" onClick={() => navigate('/admin/user')} sx={{ width: '100%' }}>
              Back to List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserRolePage;
