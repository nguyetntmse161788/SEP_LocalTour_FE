import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { CurrentPage } from 'src/layouts/components/currentpage';
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
export const PlaceViewPage = lazy(() => import('src/pages/place-detail'));
export const EventPage = lazy(() => import('src/pages/event'));
export const ServiceOwnerPlacePage = lazy(() => import('src/pages/owner/place'));
export const ServiceOwnerPlaceViewPage = lazy(() => import('src/pages/owner/place-detail'));
export const ServiceOwnerPlaceCreatedPage = lazy(() => import('src/pages/owner/place-created'));
export const ServiceOwnerEventPage = lazy(() => import('src/pages/owner/event'));
export const ServiceOwnerEventViewPage = lazy(() => import('src/pages/owner/place-event-view'));
export const ServiceOwnerActivityPage = lazy(() => import('src/pages/owner/activity'));
export const ServiceOwnerActivityViewPage = lazy(() => import('src/pages/owner/place-activity-view'));
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

function AppRoutes() {
  const token = localStorage.getItem('accessToken'); // Kiểm tra token từ localStorage
  const userRole = JSON.parse(localStorage.getItem('role') || '[]');
  return useRoutes([
    {
      element: token ? (
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
        { path: 'user', element: <UserPage /> },
        ...(userRole.includes('Administrator') ? [
          { path: 'place', element: <PlacePage /> },
          { path: 'event', element: <EventPage /> },
        ] : []),
        { element: <HomePage />, index: true },
        { path: 'admin', element: <UserPage /> },
        { path: 'place', element: <PlacePage /> },
        // Các trang cho người dùng là Service Owner
        ...(userRole.includes('Service Owner') ? [
          { path: 'owner/place', element: <ServiceOwnerPlacePage /> },
          { path: 'owner/place/:id', element: <ServiceOwnerPlaceViewPage /> },
          { path: 'owner/created', element: <ServiceOwnerPlaceCreatedPage /> },
          { path: 'owner/event', element: <ServiceOwnerEventPage /> },
          { path: 'owner/event/place/:id', element: <ServiceOwnerEventViewPage /> },
          { path: 'owner/activity', element: <ServiceOwnerActivityPage /> },
          { path: 'owner/activity/place/:id', element: <ServiceOwnerActivityViewPage /> },
        ] : []),
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

export function Router() {
  return (
    <>
      <CurrentPage />
      <AppRoutes />
    </>
  );
}
