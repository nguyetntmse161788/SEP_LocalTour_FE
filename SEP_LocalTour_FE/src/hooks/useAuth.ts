import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface JwtPayloadWithRole {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp?: number;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayloadWithRole>(token);
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const expiration = decodedToken.exp ? decodedToken.exp * 1000 : 0;
        if (expiration <= Date.now()) {
          localStorage.removeItem('accessToken');
          navigate('/sign-in');
        } else {
          setUserRole(role);
        }
      } catch (error) {
        console.error('Token decoding error:', error);
        localStorage.removeItem('accessToken');
        navigate('/sign-in');
      }
    } else {
      navigate('/sign-in');
    }
  }, [navigate]);

  return userRole;
};
