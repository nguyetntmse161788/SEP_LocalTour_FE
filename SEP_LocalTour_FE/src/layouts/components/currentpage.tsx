import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function CurrentPage() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('currentPath', location.pathname);
  }, [location]);

  return null; // Không cần render UI
}
