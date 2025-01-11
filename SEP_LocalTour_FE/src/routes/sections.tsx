import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { CurrentPage } from 'src/layouts/components/currentpage';
import { PrivateRoute } from 'src/sections/auth/privateroute';
import { isTokenExpired, refreshAccessToken } from 'src/utils/auth';
import { useRouter } from './hooks';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const UserProfile = lazy(() => import('src/pages/profile'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/admin/user'));
export const ModPage = lazy(() => import('src/pages/admin/manage-mod'));
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
export const ServiceOwnerPlaceAllDetailPage = lazy(() => import('src/pages/owner/all-place-detail'));

export const UserRolePage = lazy(() => import('src/pages/admin/user-role'));
export const UserBanPage = lazy(() => import('src/pages/admin/user-ban'));
export const ReportUserView = lazy(() => import('src/pages/admin/user-report'))
export const UserUpdatePage = lazy(() => import('src/pages/admin/user-update'));
export const RegisterPage = lazy(() => import('src/pages/admin/register-user'));
export const BannerViewPage = lazy(() => import('src/pages/admin/banner-view'));
export const BannerViewDetailPage = lazy(() => import('src/pages/admin/banner-view-detail'));
export const TagViewPage = lazy(() => import('src/pages/admin/tag-view'));
export const SpecifyPage = lazy(() => import('src/pages/admin/specify-place'));
export const PlaceReportPage = lazy(() => import('src/pages/placereport'));
export const PlaceReportDetailPage = lazy(() => import('src/pages/place-report-detail'));
export const DashboardModeratorPage = lazy(() => import('src/pages/admin/dashboard-moderator'));
export const ModCheckPage = lazy(() => import('src/pages/admin/mod-check'));
export const ModCheckDetailPage = lazy(() => import('src/pages/admin/mod-check-detail'));
export const CancelPage = lazy(() => import('src/pages/pay-cancel'));
export const SuccessPage = lazy(() => import('src/pages/pay-success'));
export const DashboardServiceOwnerPage = lazy(() => import('src/pages/admin/dashboard-service-owner'));

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
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        // if(router.pathname === '/success'){
        //   router.push('/success');
        //   return;
        // }
        // if(router.pathname === '/cancel'){
        //   router.push('/cancel');
        //   return;
        // }
        let token = localStorage.getItem('accessToken');
      
        // Chuyển hướng nếu không có token
        if (!token) {
         router.push('/sign-in');
          return;
        }

        // Kiểm tra và làm mới token nếu cần
        if (isTokenExpired(token)) {
          try {
            token = await refreshAccessToken(); // Sử dụng await để làm mới token
            localStorage.setItem('accessToken', token); // Cập nhật token mới vào localStorage
          } catch (error) {
            console.error('Unable to refresh access token:', error);
            router.push('/sign-in');
            return;
          }
        }



      } catch (error) {
        console.error('Error checking token:', error);
        router.push('/sign-in');
      }
    };

    checkToken();
  }, [router]);
  return useRoutes([ 
    {
      path: '/',
      element: (
        <PrivateRoute>
          <Navigate to={getDefaultRouteByRole(userRole)} replace />
        </PrivateRoute>
      ),
    },
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
            { path: 'profile', element: <UserProfile /> },
            { path: 'placeReport', element: <PlaceReportPage /> },
            { path: 'placeReport/:id', element: <PlaceReportDetailPage /> }

          ]
          : []),

        ...(userRole.includes('Service Owner')
          ? [
              { path: 'owner/place', element: <ServiceOwnerPlacePage /> },
              { path: 'owner/place/:id', element: <ServiceOwnerPlaceViewPage /> },
              { path: 'owner/created', element: <ServiceOwnerPlaceCreatedPage /> },
              { path: 'owner/created/:id', element: <ServiceOwnerPlaceAllDetailPage /> },
              { path: 'owner/event', element: <ServiceOwnerEventPage /> },
              { path: 'owner/event/place/:id', element: <ServiceOwnerEventViewPage /> },
              { path: 'owner/activity', element: <ServiceOwnerActivityPage /> },
              { path: 'owner/activity/place/:id', element: <ServiceOwnerActivityViewPage /> },
              { path: 'owner/banner', element: <BannerListPage /> },
              { path: 'owner/usertranfer', element: <UserTranferPage /> },
              { path: 'profile', element: <UserProfile /> },
              { path: 'cancle' }
            ]
          : []),
        ...(userRole.includes('Administrator')
          ? [
            { element: <HomePage />, index: true },
            { path: 'admin/user', element: <UserPage /> },
            { path: 'admin/mod', element: <ModPage /> },
            { path: 'admin/specify-place', element: <SpecifyPage /> },
            { path: 'admin/role', element: <UserRolePage /> },
            // { path: 'admin', element: <AdminPage /> },
            { path: 'admin/register', element: <RegisterPage /> },
            { path: 'admin/ban', element: <UserBanPage /> },
            { path: 'admin/role', element: <UserRolePage /> },
            { path: 'admin/updateUser', element: <UserUpdatePage /> },
            { path: 'admin/reportUser', element: <ReportUserView /> },
            { path: 'admin/bannerUser', element: <BannerViewPage /> },
            { path: 'admin/bannerUser/:id', element: <BannerViewDetailPage /> },
            { path: 'admin/tag', element: <TagViewPage /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'admin/dashboardmod', element: <DashboardModeratorPage /> },
            { path: 'admin/modcheck', element: <ModCheckPage /> },
            { path: 'admin/modcheck/:placeId', element: <ModCheckDetailPage /> },
            { path: 'admin/dashboardowner', element: <DashboardServiceOwnerPage /> },
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
      path: 'cancel',
      element: <CancelPage />,
    },
    {
      path: 'success',
      element: <SuccessPage />,
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
function getDefaultRouteByRole(userRole: string[]): string {
  if (userRole.includes('Administrator')) {
    return '/'; // Trang chính cho admin
  } else if (userRole.includes('Moderator')) {
    return '/place'; // Trang chính cho Moderator
  } else if (userRole.includes('Service Owner')) {
    return '/owner/place'; // Trang chính cho Service Owner
  }else
  return '/sign-in'; // Mặc định, chuyển hướng về trang đăng nhập nếu không có vai trò
}

