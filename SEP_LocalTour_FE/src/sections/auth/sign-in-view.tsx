import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import {jwtDecode} from 'jwt-decode';

interface JwtPayloadWithRole {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export function SignInView() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayloadWithRole>(token);
        console.log('Decoded Token:', decodedToken);  // Debugging output
        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
        if (userRole === 'Administrator') {
          router.push('/admin');
        } else if (userRole === 'Visitor') {
          router.push('/');
        } else {
          throw new Error('Invalid role');
        }
      } catch (catchError) {
        console.error('Token decoding error:', catchError);
        localStorage.removeItem('accessToken');
      }
    } else {
      console.log('No token found');
    }
  }, [router]);

  console.log('Access Token:', localStorage.getItem('accessToken'));

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.localtour.space/api/Authen/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, password }),
      });

      if (!response.ok) throw new Error('Failed to sign in');

      const data = await response.json();
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);

      const decodedToken = jwtDecode<JwtPayloadWithRole>(accessToken); // Decode the token with the correct type
      const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (userRole === 'Administrator') {
        router.push('/admin');
      } else if (userRole === 'Visitor') {
        router.push('/');
      } else {
        throw new Error('Invalid role. Access denied.');
      }
    } catch (err) {
      setError(err.message || 'Invalid phone number or password');
    } finally {
      setLoading(false);
    }
  }, [phoneNumber, password, router]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5">Sign in</Typography>
      <TextField
        fullWidth
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <LoadingButton onClick={handleSignIn} loading={loading} variant="contained" fullWidth>
        Sign In
      </LoadingButton>
    </Box>
  );
}