import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

import { AnalyticsWebsiteVisits } from '../analytics-website-visits';


// ----------------------------------------------------------------------

const userIds = [
  'b4722bdb-73b8-4739-9d0d-0bf2868baaa9',
  '982451bf-6c11-4727-87d6-310b92236469',
  '10494bee-47c9-49db-8134-639f89a3bab5',
  '0699be9b-ce47-4e0b-8631-6c7c29ba37a3',
  'd381037d-5111-4aa5-a839-720a38fe9d32',
  'a51c4972-acd6-41b8-a6d4-9618574f1e4d',
  'b40aa7c3-8f9b-473e-937f-b13715612a8a',
  '6a91fb0e-aae9-415d-91c7-d3b9b3393afb',
];
interface UserStatistics {
  userId: string;
  total: number;
  monthlyData: MonthlyData[];
}

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
  const [moderatorApprove, setModeratorApprove] = useState<{
    total: number;
    monthlyData: MonthlyData[];
  }>({
    total: 0,
    monthlyData: [],
  });
  const [statistics, setStatistics] = useState<UserStatistics[]>([]);
  useEffect(() => {
    
    const fetchUserRegistrations = async () => {
      try {
        const response = await fetch('https://api.localtour.space/api/Statistic/GetTotalModApprovedPlaceByMonthAsync?year=2024');
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
  }, []); 
  useEffect(() => {
    
    const fetchModeratorApprove = async () => {
      try {
        const response = await fetch('https://api.localtour.space/api/Statistic/GetModApprovedPlaceByMonthAsync?year=2024&userId=?');
        const data = await response.json();

        if (data) {
          // Map the monthly data and convert month number to month name
          const monthlyData: MonthlyData[] = Object.entries(data).map(([month, count]) => ({
            monthName: new Date(0, parseInt(month, 10) - 1).toLocaleString('default', { month: 'long' }),
            registrationCount: Number(count),
          }));

          // Calculate the total number of registrations for the year
          const totalApproves = monthlyData.reduce(
            (total, monthData) => total + monthData.registrationCount,
            0
          );

          // Update the state with the monthly data and total count
          setModeratorApprove({
            total: totalApproves,
            monthlyData,
          });
        }
      } catch (error) {
        console.error('Error fetching user registration data:', error);
      }
    };

    fetchModeratorApprove();
  }, []); 


  const { total, monthlyData } = userRegistrations;
  const categories = monthlyData.map((item) => item.monthName);
  const series = monthlyData.map((item) => item.registrationCount);

  const chartCategories = userRegistrations.monthlyData.map((data: any) => data.monthName);
  const chartSeriesData = userRegistrations.monthlyData.map((data: any) => data.registrationCount);
  useEffect(() => {
    const fetchStatistics = async () => {
      const results: UserStatistics[] = [];

      for (const userId of userIds) {
        try {
          const response = await fetch(
            `https://localhost:7274/api/Statistic/GetModApprovedPlaceByMonthAsync?year=2024&userId=${userId}`
          );
          const data = await response.json();

          if (data) {
            const monthlyData: MonthlyData[] = Object.entries(data).map(([month, count]) => ({
              monthName: new Date(0, parseInt(month, 10) - 1).toLocaleString('default', { month: 'long' }),
              registrationCount: Number(count),
            }));

            const total = monthlyData.reduce((sum, item) => sum + item.registrationCount, 0);

            results.push({
              userId,
              total,
              monthlyData,
            });
          }
        } catch (error) {
          console.error(`Error fetching statistics for userId ${userId}:`, error);
        }
      }

      setStatistics(results);
    };

    fetchStatistics();
  }, []);

  // Group statistics into pairs for displaying 2 users per row
  const groupedStatistics = statistics.reduce<UserStatistics[][]>((acc, stat, index) => {
    if (index % 2 === 0) acc.push([]);
    acc[acc.length - 1].push(stat);
    return acc;
  }, []);


  return (
    <DashboardContent maxWidth="xl">

      <Grid container spacing={3}>

        {/* Website Visits Widget */}
      <Grid xs={12} md={6} lg={12}>
        <AnalyticsWebsiteVisits
          title="Statistics on the number of moderator reviews during the year"
          subheader="(+%) than last year"
          chart={{
            categories: chartCategories,
            series: [
              {
                name: 'Censored',
                data: chartSeriesData,
              },
            ],
          }}
        />
      </Grid>

      </Grid>
      <Grid container spacing={3}>
      {groupedStatistics.map((group, rowIndex) => (
        <Grid container item xs={12} spacing={3} key={`row-${rowIndex}`}>
          {group.map((stat) => (
            <Grid item xs={12} md={6} key={stat.userId}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  User ID: {stat.userId}
                </Typography>
                <Typography>Total Approvals: {stat.total}</Typography>
                <AnalyticsWebsiteVisits
                  title="Monthly Approvals"
                  chart={{
                    categories: stat.monthlyData.map((data) => data.monthName),
                    series: [
                      {
                        name: 'Approvals',
                        data: stat.monthlyData.map((data) => data.registrationCount),
                      },
                    ],
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
    </DashboardContent>
  );
}
