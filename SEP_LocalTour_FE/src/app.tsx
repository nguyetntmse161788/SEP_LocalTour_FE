import 'src/global.css';

import Fab from '@mui/material/Fab';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';
import { useEffect } from 'react';
import { setupAutoRefresh } from './utils/auth';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  useEffect(() => {
    setupAutoRefresh(); // Khởi động auto-refresh token khi app mount
  }, []);
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
