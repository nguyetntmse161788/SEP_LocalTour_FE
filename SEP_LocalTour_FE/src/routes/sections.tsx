import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import AdminPage from 'src/pages/AdminPage';
import UserUpdate from 'src/pages/UserUpdatePage';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const PlacePage = lazy(() => import('src/pages/place'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const UserRolePage = lazy(() => import('src/pages/UserRolePage'));
export const UserBanPage = lazy(() => import('src/pages/UserBanPage'));
export const ReportUserView = lazy(() => import('src/pages/user-report'))
export const UserUpdatePage = lazy(() => import('src/pages/UserUpdatePage'));
export const RegisterPage = lazy(() => import('src/pages/RegisterPage'));



// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);  // Trạng thái đăng nhập
  const token = localStorage.getItem('accessToken');  // Lấy token từ localStorage

  useEffect(() => {
    // Kiểm tra nếu có token trong localStorage
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  // Nếu chưa biết trạng thái đăng nhập, trả về loading state
  if (isLoggedIn === null) {
    return <Box>Loading...</Box>;
  }

  return useRoutes([
    {
      element: isLoggedIn ? (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/sign-in" replace /> 
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'admin', element: <UserPage /> },
        { path: 'place', element: <PlacePage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'role', element: <UserRolePage /> },
        { path: 'admin', element: <AdminPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'ban', element: <UserBanPage /> },
        { path: 'role', element: <UserRolePage /> },
        { path: 'updateUser', element: <UserUpdatePage /> },
        { path: 'reportUser', element: <ReportUserView /> }
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'admin',
      element: <AdminPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}

// export default useRoutes;
