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
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface JwtPayloadWithRole {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
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
    const user = localStorage.getItem('user');
    const currentPath = localStorage.getItem('currentPath') || '/';

    // Kiểm tra xem token có tồn tại và hợp lệ không
    if (token && user) {
      try {
        const decodedToken = jwtDecode<JwtPayloadWithRole & { exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          router.replace(currentPath); // Nếu token hợp lệ, chuyển hướng đến trang trước đó
        } else {
          localStorage.clear(); // Xóa localStorage nếu token hết hạn
          router.push('/sign-in');
        }
      } catch (e) {
        console.error('Invalid token:', e);
        localStorage.clear(); // Xóa localStorage nếu token không hợp lệ
        router.push('/sign-in');
      }
    }
  }, [router]);

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      // Gửi yêu cầu đăng nhập đến API
      const response = await fetch('https://api.localtour.space/api/Authen/login', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),        
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);  // Lưu token vào localStorage

      const decodedToken = jwtDecode<JwtPayloadWithRole>(data.accessToken);
      const userRoles = Array.isArray(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
        ? decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        : [decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']];
      
      const validRoles = ['Administrator', 'Moderator', 'Service Owner'];
      const validUserRoles = userRoles.filter(role => validRoles.includes(role));

      if (validUserRoles.length === 0) {
        throw new Error('You do not have permission to access this page');
      }

      // Lưu thông tin người dùng và vai trò vào localStorage
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('role', JSON.stringify(validUserRoles));
      localStorage.setItem('currentPath', '/'); // Lưu lại đường dẫn trang chính sau khi đăng nhập
      
      router.replace('/');
    } catch (err) {
      setError(err.message || 'Invalid phone number or password');
    } finally {
      setLoading(false);
    }
  }, [phoneNumber, password, router]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="phoneNumber"
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
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

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <LoadingButton
        fullWidth
        size="large"
        type="button"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
        loading={loading}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}