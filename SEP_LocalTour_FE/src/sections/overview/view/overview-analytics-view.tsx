import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

interface MonthlyData {
  monthName: string;
  registrationCount: number;
}

export function OverviewAnalyticsView() {
  const [userRegistrations, setUserRegistrations] = useState<{
    total: number;
    monthlyData: MonthlyData[];
  }>({
    total: 0,
    monthlyData: [],
  });

  useEffect(() => {
    
    const fetchUserRegistrations = async () => {
      try {
        const response = await fetch('https://api.localtour.space/api/Statistic/GetUserRegistrationByMonthAsync?year=2024');
        const data = await response.json();

        if (data) {
          // Map the monthly data and convert month number to month name
          const monthlyData: MonthlyData[] = Object.entries(data).map(([month, count]) => ({
            monthName: new Date(0, parseInt(month, 10) - 1).toLocaleString('default', { month: 'long' }),
            registrationCount: Number(count),
          }));

          // Calculate the total number of registrations for the year
          const totalRegistrations = monthlyData.reduce(
            (total, monthData) => total + monthData.registrationCount,
            0
          );

          // Update the state with the monthly data and total count
          setUserRegistrations({
            total: totalRegistrations,
            monthlyData,
          });
        }
      } catch (error) {
        console.error('Error fetching user registration data:', error);
      }
    };

    fetchUserRegistrations();
  }, []); // Fetch data on component mount

  const { total, monthlyData } = userRegistrations;
  const categories = monthlyData.map((item) => item.monthName);
  const series = monthlyData.map((item) => item.registrationCount);

  // Convert percent to number
  const percent = ((total - 0 / 1) * 100).toFixed(2); // This is a string, so parse it as a float
  const percentAsNumber = parseFloat(percent);

  const chartCategories = userRegistrations.monthlyData.map((data: any) => data.monthName);
  const chartSeriesData = userRegistrations.monthlyData.map((data: any) => data.registrationCount);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        {/* User Registration Widget */}
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="User Register By This Year"
            percent={percentAsNumber}
            total={total}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories,
              series,
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="People completing the trip"
            percent={2.6}
            total={714000}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        {/* Purchase Orders Widget */}
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Purchase orders"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        {/* Messages Widget */}
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Messages"
            percent={3.6}
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        {/* Website Visits Widget */}
      <Grid xs={12} md={6} lg={8}>
        <AnalyticsWebsiteVisits
          title="Statistics of registrants during the year"
          subheader="(+%) than last year"
          chart={{
            categories: chartCategories,
            series: [
              {
                name: 'Registrations',
                data: chartSeriesData,
              },
            ],
          }}
        />
      </Grid>
      </Grid>
    </DashboardContent>
  );
}
