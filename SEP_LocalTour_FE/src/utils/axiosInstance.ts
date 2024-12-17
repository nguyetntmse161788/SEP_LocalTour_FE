import axios from 'axios';
import Cookies from 'js-cookie';
import { getAccessToken, refreshAccessToken } from './auth';

const axiosInstance = axios.create({
//   baseURL: 'https://api.localtour.space/api',
//   headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await getAccessToken();
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return await axiosInstance.request(error.config);
      } catch (err) {
        localStorage.clear();
        Cookies.remove('refreshToken');
        window.location.href = '/sign-in'; // Chuyển người dùng về trang đăng nhập nếu thất bại
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
