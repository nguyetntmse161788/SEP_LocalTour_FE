import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

interface User {
  fullName: string;
  phoneNumber: string;
}

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Lấy thông tin từ Local Storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Welcome, {user.fullName}</Typography>
      <Typography variant="body1">Phone Number: {user.phoneNumber}</Typography>
    </div>
  );
}

export default UserProfile;
