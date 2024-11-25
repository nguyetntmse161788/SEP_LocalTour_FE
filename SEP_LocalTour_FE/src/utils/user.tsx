import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { UserView } from 'src/sections/user/view';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Page() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);  // State để lưu trữ danh sách người dùng
  const [loading, setLoading] = useState<boolean>(true);  // Trạng thái tải
  const [error, setError] = useState<string>('');  // Trạng thái lỗi

  // useEffect để kiểm tra token và lấy dữ liệu người dùng
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('Token:', token); // Kiểm tra token trong console

    // Nếu không có token, điều hướng đến trang đăng nhập
    if (!token) {
      setError('No access token found. Please log in.');
      setLoading(false);
      navigate('/login');
      return;
    }

    // Nếu có token, gọi API để lấy dữ liệu người dùng
    fetchUsers(token);
  }, [navigate]);

  // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async (token: string) => {
    try {
      const response = await axios.get('https://api.localtour.space/api/User', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Cần thiết nếu server yêu cầu cookie
      });

      // Kiểm tra phản hồi từ API
      if (response.status === 200) {
        setUsers(response.data); // Lưu danh sách người dùng
      } else {
        setError(`Failed to fetch users: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);

      // Hiển thị thông tin chi tiết về lỗi
      if (err.response) {
        // Lỗi từ API trả về
        setError(`Failed to fetch users: ${err.response.status} ${err.response.statusText}`);
        console.log('API Error Response:', err.response.data);
      } else if (err.request) {
        // Lỗi yêu cầu (có thể do mạng)
        setError('No response received from API.');
        console.log('API Request Error:', err.request);
      } else {
        // Lỗi không xác định
        setError(`Error: ${err.message}`);
        console.log('Unknown Error:', err.message);
      }
    } finally {
      setLoading(false);  // Kết thúc trạng thái tải
    }
  };

  // Nếu đang tải, hiển thị thông báo loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hiển thị danh sách người dùng hoặc thông báo lỗi nếu không tìm thấy người dùng
  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p> {/* Giả sử mỗi người dùng có tên và email */}
            </div>
          ))
        ) : (
          <div>No users found</div>
        )}
      </div>
    </div>
  );
};