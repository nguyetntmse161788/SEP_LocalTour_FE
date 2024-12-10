import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

// Function to check if the token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token); // Decode the token
    const currentTime = Math.floor(Date.now() / 1000);  // Get the current time in seconds

    // Check if exp exists and if it's less than the current time
    return decoded.exp && decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;  // If there's an error decoding the token, treat it as expired
  }
};
interface JwtPayloadWithRole {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

// Function to refresh the access token
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = Cookies.get('refreshToken');  // Get the refreshToken from cookies
  const userId = localStorage.getItem('userId'); 
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await fetch('https://api.localtour.space/api/Authen/refreshToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken       
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    // Save the new accessToken in localStorage
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('userId', data.userId);
      Cookies.set('refreshToken', data.refreshToken);
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
      localStorage.setItem('currentPath', '/');
    return data.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Function to get the access token, either fresh or refreshed
export const getAccessToken = async (): Promise<string> => {
  let token = localStorage.getItem('accessToken');
  
  if (!token || isTokenExpired(token)) {
    try {
      token = await refreshAccessToken();  // Refresh the access token if it's expired
    } catch (error) {
      console.error('Unable to refresh access token');
      throw new Error('Token refresh failed');
    }
  }

  return token;
};

export const setupAutoRefresh = () => {
  const interval = setInterval(async () => {
    const token = localStorage.getItem('accessToken');
    if (token && isTokenExpired(token)) {
      try {
        await refreshAccessToken();
      } catch (error) {
        console.error('Failed to auto-refresh token:', error);
        clearInterval(interval); // Ngừng refresh nếu có lỗi nghiêm trọng
      }
    }
  }, 15 * 60 * 1000); // Kiểm tra mỗi 15 phút
};

setupAutoRefresh();

