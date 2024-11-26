import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { AuthProvider,useAuth} from 'src/layouts/components/account-popover';
import { CurrentPage } from 'src/layouts/components/currentpage'; 
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
  const { token, role } = useAuth();

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

        // Phân quyền trang Place
        {
          path: 'place',
          element: <PlacePage />,
        },
        { path: 'owner/place', element: <ServiceOwnerPlacePage /> },
        { path: 'owner/place/:id', element: <ServiceOwnerPlaceViewPage /> },
        { path: 'owner/created', element: <ServiceOwnerPlaceCreatedPage /> },
        { path: 'place/:id', element: <PlaceViewPage /> },
        { path: 'event', element: <EventPage /> },
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
    <AuthProvider>
      <CurrentPage/>
      <AppRoutes />
    </AuthProvider>
  );
}
