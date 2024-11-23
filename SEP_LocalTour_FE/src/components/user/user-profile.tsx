import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

interface User {
  fullName: string;
  phoneNumber: string;
}

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  useEffect(() => {
    // Kiểm tra nếu có thông tin người dùng trong localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
    setLoading(false); // Đặt lại trạng thái loading sau khi lấy thông tin
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>; // Hiển thị loading khi đang tải dữ liệu
  }

  if (!user) {
    return <Typography>No user data found. Please log in.</Typography>; // Trường hợp không có thông tin người dùng
  }

  return (
    <div>
      <Typography variant="h6">Welcome, {user.fullName}</Typography>
      <Typography variant="body1">Phone Number: {user.phoneNumber}</Typography>
    </div>
  );
}

export default UserProfile;
