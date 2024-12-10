import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

// Kiểm tra xem token đã hết hạn hay chưa
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp && decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Refresh token từ API và lưu lại token mới vào localStorage và cookie
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = Cookies.get('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await fetch('https://api.localtour.space/api/Authen/refreshToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    Cookies.set('refreshToken', data.refreshToken, { expires: 7, path: '/' });
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Lấy access token, nếu hết hạn thì refresh token
export const getAccessToken = async (): Promise<string> => {
  let token = localStorage.getItem('accessToken');

  if (!token || isTokenExpired(token)) {
    try {
      token = await refreshAccessToken(); // Refresh token nếu hết hạn
    } catch (error) {
      console.error('Unable to refresh access token');
      throw new Error('Token refresh failed');
    }
  }

  return token;
};
