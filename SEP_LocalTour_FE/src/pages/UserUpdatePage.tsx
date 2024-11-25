import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  MenuItem,
  Grid,
} from '@mui/material';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export default function UserUpdatePage() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const user = location.state?.user; 

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    gender: '',
    profilePicture: null as File | null,  // Make sure profilePicture is File or null
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Pre-fill form data with user data passed through navigation
      setFormData({
        fullName: user.fullName || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || '',
        gender: user.gender || '',  // Make sure gender is properly set
        profilePicture: null,  // If no profile picture selected, leave it null
      });

      // Set profile picture preview if it exists
      if (user.profilePictureUrl) {
        setPreviewImage(user.profilePictureUrl);
      }
    }
  }, [user]);  // Make sure the useEffect runs when 'user' changes

  // Handle input field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change (for profile picture)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormData({
      ...formData,
      profilePicture: file, // ProfilePicture can be null or a file
    });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Submit handler to update profile
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('No token found. Please log in.');
      navigate('/sign-in');
      return;
    }

    const formDataToSend = new FormData();

    // Append all form data to FormData object
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData]) {  // Ensure key is valid
        formDataToSend.append(key, formData[key as keyof typeof formData] as Blob);  // Type assertion for value
      }
    });

    try {
      const response = await axios.put('https://api.localtour.space/api/User', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/admin'); // Redirect to profile page after successful update
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            >
              {/* {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} */}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {previewImage && (
              <Avatar
                src={previewImage}
                alt="Preview"
                sx={{ width: 100, height: 100, mt: 2 }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
