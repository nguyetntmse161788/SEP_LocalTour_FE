import { getAccessToken } from './authService';

export const apiClient = async (url: string, options: RequestInit = {}) => {
  try {
    const accessToken = await getAccessToken(); // Lấy token mới hoặc đã có
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      ...options.headers, // Thêm các headers khác nếu có
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
};
