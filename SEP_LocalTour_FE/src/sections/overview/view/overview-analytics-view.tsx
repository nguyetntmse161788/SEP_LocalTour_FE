import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [successfulTravelsbyDate, setSuccessfulTravelsbyDate] = useState<number | null>(null);
  const [successfulTravels, setSuccessfulTravels] = useState<number | null>(null);
  const [totalSchedulesCreated, setTotalSchedulesCreated] = useState<number | null>(null);
  const [totalSchedulesCreatedbyDate, setTotalSchedulesCreatedbyDate] = useState<number | null>(null);
  const [startDateCreated, setStartDateCreated] = useState('');
  const [endDateCreated, setEndDateCreated] = useState('');
  const [totalPostsCreated, setTotalPostsCreated] = useState<number | null>(null);
  const [totalPostsCreatedbyDate, setTotalPostsCreatedbyDate] = useState<number | null>(null);
  const [startDatePost, setStartDatePost] = useState('');
  const [endDatePost, setEndDatePost] = useState('');

  const handleClearTravels = () => {
    setStartDate('');
    setEndDate('');
    setSuccessfulTravelsbyDate(null);
  };

  const handleClearSchedules = () => {
    setStartDateCreated('');
    setEndDateCreated('');
    setTotalSchedulesCreatedbyDate(null);
  };
  const handleClearPosts = () => {
    setStartDatePost('');
    setEndDatePost('');
    setTotalPostsCreatedbyDate(null);
  };
  

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

  useEffect(() => {
    const fetchSuccessfulTravels = async () => {
      const startDateSuccess = '2024-01-01';
      const endDateSuccess = '2024-12-31';
      try {
        const response = await fetch(
          `https://api.localtour.space/api/Statistic/GetTotalSuccessfulTravelsAsync?startDate=${startDateSuccess}&endDate=${endDateSuccess}`
        );
        const data = await response.text();
      const totalTravels = parseInt(data, 10); 
      setSuccessfulTravels(totalTravels || 0); 
      } catch (error) {
        console.error('Error fetching total successful travels:', error);
      }
    };

    fetchSuccessfulTravels();
  }, []);
  const handleFetchStatistics = async () => {
    if (!startDate || !endDate) {
      alert('Please enter both start and end dates.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.localtour.space/api/Statistic/GetTotalSuccessfulTravelsAsync?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.text();
      const totalTravels = parseInt(data, 10);
      setSuccessfulTravelsbyDate(totalTravels || 0);
    } catch (error) {
      console.error('Error fetching travel statistics:', error);
      setSuccessfulTravelsbyDate(null);
    }
  };
  useEffect(() => {
    const fetchTotalSchedulesCreated  = async () => {
      const startDatebyCreated = '2024-01-01';
      const endDatebyCreated = '2024-12-31';
      try {
        const response = await fetch(
          `https://api.localtour.space/api/Statistic/GetTotalSchedulesCreatedAsync?startDate=${startDatebyCreated}&endDate=${endDatebyCreated}`
        );
        const data = await response.text();
      const totalTravels = parseInt(data, 10); 
      setTotalSchedulesCreated(totalTravels || 0); 
      } catch (error) {
        console.error('Error fetching total successful travels:', error);
      }
    };

    fetchTotalSchedulesCreated();
  }, []);
  const handlefetchTotalSchedulesCreated = async () => {
    if (!startDateCreated || !endDateCreated) {
      alert('Please enter both start and end dates.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.localtour.space/api/Statistic/GetTotalSchedulesCreatedAsync?startDate=${startDateCreated}&endDate=${endDateCreated}`
      );
      const data = await response.text();
      const totalTravels = parseInt(data, 10);
      setTotalSchedulesCreatedbyDate(totalTravels || 0);
    } catch (error) {
      console.error('Error fetching travel statistics:', error);
      setTotalSchedulesCreatedbyDate(null);
    }
  };
  useEffect(() => {
    const fetchTotalPostsCreated  = async () => {
      const startDateofPost = '2024-01-01';
      const endDateofPost = '2024-12-31';
      try {
        const response = await fetch(
          `https://api.localtour.space/api/Statistic/GetTotalPostsCreatedAsync?startDate=${startDateofPost}&endDate=${endDateofPost}`
        );
        const data = await response.text();
      const totalTravels = parseInt(data, 10); 
      setTotalPostsCreated(totalTravels || 0); 
      } catch (error) {
        console.error('Error fetching total successful travels:', error);
      }
    };

    fetchTotalPostsCreated();
  }, []);
  const handlefetchTotalPostsCreated = async () => {
    if (!startDatePost || !endDatePost) {
      alert('Please enter both start and end dates.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.localtour.space/api/Statistic/GetTotalPostsCreatedAsync?startDate=${startDatePost}&endDate=${endDatePost}`
      );
      const data = await response.text();
      const totalTravels = parseInt(data, 10);
      setTotalPostsCreatedbyDate(totalTravels || 0);
    } catch (error) {
      console.error('Error fetching travel statistics:', error);
      setTotalPostsCreatedbyDate(null);
    }
  };


  const { total, monthlyData } = userRegistrations;
  const categories = monthlyData.map((item) => item.monthName);
  const series = monthlyData.map((item) => item.registrationCount);

  // Convert percent to number
  // const percent = ((total - 0 / 1) * 100).toFixed(2); // This is a string, so parse it as a float
  // const percentAsNumber = parseFloat(percent);

  const chartCategories = userRegistrations.monthlyData.map((data: any) => data.monthName);
  const chartSeriesData = userRegistrations.monthlyData.map((data: any) => data.registrationCount);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
      Statistics during the year
      </Typography>

      <Grid container spacing={3}>
        {/* User Registration Widget */}
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="User Registation By This Year"
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
            title="Total Successful Travels By This Year"
            total={successfulTravels ?? 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['2023-2024'], // No chart data for this widget
              series: [successfulTravels ?? 0],
            }}
          />
        </Grid>

        {/* Purchase Orders Widget */}
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Schedules Created By This Year"
            total={totalSchedulesCreated ?? 0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['2023-2024'], // No chart data for this widget
              series: [totalSchedulesCreated ?? 0],
            }}
          />
        </Grid>

        {/* Messages Widget */}
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Posts Created By This Year"
            total={totalPostsCreated ?? 0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['2023-2024'], // No chart data for this widget
              series: [totalPostsCreated ?? 0],
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

      <Grid item xs={12}>
      <Typography variant="h4" sx={{ mb: 3 }}>
      Total Successful Travels
      </Typography>
    </Grid>

    {/* Start Date and End Date on the same line */}
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleFetchStatistics}>
          Get Statistics
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary" onClick={handleClearTravels}>
          Clear
        </Button>
      </Grid>
    </Grid>
  </Grid>
      {successfulTravels !== null && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell align="right">Successful Travels</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                  <TableCell align="right">{successfulTravelsbyDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h4" sx={{ mb: 3 }}>
      Total Schedules Created
      </Typography>
    </Grid>

    {/* Start Date and End Date on the same line */}
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField
          label="Start Date"
          type="date"
          value={startDateCreated}
          onChange={(e) => setStartDateCreated(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="End Date"
          type="date"
          value={endDateCreated}
          onChange={(e) => setEndDateCreated(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handlefetchTotalSchedulesCreated}>
          Get Statistics
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary" onClick={handleClearSchedules}>
          Clear
        </Button>
      </Grid>
    </Grid>
  </Grid>
      {successfulTravels !== null && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell align="right">Successful Travels</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{startDateCreated}</TableCell>
                  <TableCell>{endDateCreated}</TableCell>
                  <TableCell align="right">{totalSchedulesCreatedbyDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h4" sx={{ mb: 3 }}>
      Total Posts Created
      </Typography>
    </Grid>

    {/* Start Date and End Date on the same line */}
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField
          label="Start Date"
          type="date"
          value={startDatePost}
          onChange={(e) => setStartDatePost(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="End Date"
          type="date"
          value={endDatePost}
          onChange={(e) => setEndDatePost(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12}>
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handlefetchTotalPostsCreated}>
          Get Statistics
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="secondary" onClick={handleClearPosts}>
          Clear
        </Button>
      </Grid>
    </Grid>
  </Grid>
      {successfulTravels !== null && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell align="right">Successful Travels</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{startDatePost}</TableCell>
                  <TableCell>{endDatePost}</TableCell>
                  <TableCell align="right">{totalPostsCreatedbyDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  </Grid>
    </DashboardContent>
  );
}
