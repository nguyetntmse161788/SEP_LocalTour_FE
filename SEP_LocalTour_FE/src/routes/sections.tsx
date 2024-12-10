import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { CurrentPage } from 'src/layouts/components/currentpage';
import { PrivateRoute } from 'src/sections/auth/privateroute';
import { BannerView } from 'src/sections/admin/banner/view/banner-view';
import { BannerDetailPage } from 'src/sections/admin/banner/view/banner-view-detail';
import { refreshAccessToken } from 'src/utils/auth';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const UserProfile = lazy(() => import('src/pages/profile'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/admin/user'));
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
export const BannerListPage = lazy(() => import('src/pages/owner/banner-list'));
export const UserTranferPage = lazy(() => import('src/pages/owner/usertranfer'));

export const UserRolePage = lazy(() => import('src/pages/admin/user-role'));
export const UserBanPage = lazy(() => import('src/pages/admin/user-ban'));
export const ReportUserView = lazy(() => import('src/pages/admin/user-report'))
export const UserUpdatePage = lazy(() => import('src/pages/admin/user-update'));
export const RegisterPage = lazy(() => import('src/pages/admin/register-user'));
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
  const userRole = (() => {
    try {
      const data = JSON.parse(localStorage.getItem('role') || '[]');
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  })();
  return useRoutes([
    {
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [

        ...(userRole.includes('Moderator')
          ? [
            { path: 'place', element: <PlacePage /> },
            { path: 'place/:id', element: <PlaceViewPage /> },
            { path: 'event', element: <EventPage /> },
            { path: 'profile', element: <UserProfile /> }

          ]
          : []),

        ...(userRole.includes('Service Owner')
          ? [
              { path: 'owner/place', element: <ServiceOwnerPlacePage /> },
              { path: 'owner/place/:id', element: <ServiceOwnerPlaceViewPage /> },
              { path: 'owner/created', element: <ServiceOwnerPlaceCreatedPage /> },
              { path: 'owner/event', element: <ServiceOwnerEventPage /> },
              { path: 'owner/event/place/:id', element: <ServiceOwnerEventViewPage /> },
              { path: 'owner/activity', element: <ServiceOwnerActivityPage /> },
              { path: 'owner/activity/place/:id', element: <ServiceOwnerActivityViewPage /> },
              { path: 'owner/banner', element: <BannerListPage /> },
              { path: 'owner/usertranfer', element: <UserTranferPage /> },
              { path: 'profile', element: <UserProfile /> }
            ]
          : []),
        ...(userRole.includes('Administrator')
          ? [
            { element: <HomePage />, index: true },
            { path: 'admin/user', element: <UserPage /> },
            { path: 'admin/role', element: <UserRolePage /> },
            // { path: 'admin', element: <AdminPage /> },
            { path: 'admin/register', element: <RegisterPage /> },
            { path: 'admin/ban', element: <UserBanPage /> },
            { path: 'admin/role', element: <UserRolePage /> },
            { path: 'admin/updateUser', element: <UserUpdatePage /> },
            { path: 'admin/reportUser', element: <ReportUserView /> },
            { path: 'admin/bannerUser', element: <BannerView /> },
            { path: 'admin/bannerUser/:id', element: <BannerDetailPage /> },
            { path: 'profile', element: <UserProfile /> }

          ]
          : []),

        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
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
