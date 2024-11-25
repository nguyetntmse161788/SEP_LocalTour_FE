import { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { email, password, confirmPassword, phoneNumber } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://localhost:44388/api/User/CreateModerate', {
        email,
        password,
        confirmPassword,
        phoneNumber,
      });

      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/sign-in'), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
    }}>
      <Card sx={{ width: 400, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" marginBottom={2}>
            Register
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
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 3 }}
            >
              Register
            </Button>
          </form>
          <Box textAlign="center" marginTop={2}>
            <Button variant="text" onClick={() => navigate('/sign-in')}>
              Already have an account? Log in
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterPage;
