import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // Chuyển hướng tới trang đăng nhập nếu không có token
    return <Navigate to="/sign-in" replace />;
  }

  try {
    const decodedToken = jwtDecode<{ exp: number }>(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp > currentTime) {
      // Token hợp lệ
      return <>{children}</>;
    }
  } catch (error) {
    console.error('Invalid token:', error);
  }

  // Token không hợp lệ hoặc hết hạn, chuyển hướng đến trang đăng nhập
  localStorage.clear();
  return <Navigate to="/sign-in" replace />;
}