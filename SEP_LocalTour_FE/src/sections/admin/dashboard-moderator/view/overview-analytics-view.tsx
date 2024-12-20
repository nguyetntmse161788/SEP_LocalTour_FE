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
  userName: string; 
  total: number;
  monthlyData: MonthlyData[];
}

interface MonthlyData {
  monthName: string;
  total: number;
  totalPrice: number;
}

export function OverviewAnalyticsView() {
  const [userRegistrations, setUserRegistrations] = useState<UserStatistics>({
    userId:'',
    userName:'',
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
        const response = await fetch(
          'https://api.localtour.space/api/Statistic/GetTotalModApprovedPlaceByMonthAsync?year=2024'
        );
        const data: { month: number; total: number; totalPrice: number }[] = await response.json();

        if (data) {
          // Tạo mảng tất cả 12 tháng khởi tạo với giá trị 0
          const allMonths = Array.from({ length: 12 }, (_, index) => ({
            month: index + 1,
            total: 0,
            totalPrice: 0,
          }));

          // Ghép dữ liệu từ API vào mảng tháng
          const mergedData = allMonths.map((defaultMonth) => {
            const match = data.find((item) => item.month === defaultMonth.month);
            return {
              month: defaultMonth.month,
              total: match ? match.total : defaultMonth.total,
              totalPrice: match ? match.totalPrice : defaultMonth.totalPrice,
            };
          });

          // Map lại dữ liệu mergedData để bao gồm tên tháng
          const monthlyData: MonthlyData[] = mergedData.map((item) => ({
            monthName: new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }),
            total: item.total,
            totalPrice: item.totalPrice,
          }));

          // Cập nhật trạng thái với dữ liệu tháng và tổng
          setUserRegistrations({
            userId: 'all',
            userName:'',
            total: monthlyData.reduce((total, monthData) => total + monthData.total, 0),
            monthlyData,
          });
        }
      } catch (error) {
        console.error('Error fetching user registration data:', error);
      }
    };

    fetchUserRegistrations();
  }, []);

  // Tạo dữ liệu cho biểu đồ
  const chartCategories = userRegistrations.monthlyData.map((data) => data.monthName);
  const chartSeriesData = userRegistrations.monthlyData.map((data) => data.total);
  const chartTotalPriceData = userRegistrations.monthlyData.map((data) => data.totalPrice);

  useEffect(() => {
    const fetchStatistics = async () => {
      const results: UserStatistics[] = [];

      for (const userId of userIds) {
        try {
          const response = await fetch(`https://api.localtour.space/api/Statistic/GetModApprovedPlaceByMonthAsync?year=2024&userId=${userId}`);
          const data = await response.json();

          // Map dữ liệu thành danh sách các tháng
          const monthlyData: MonthlyData[] = data.list.map((item: any) => ({
            monthName: new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }),
            total: item.total,
            totalPrice: item.totalPrice,
          }));

          const total = monthlyData.reduce((sum, item) => sum + item.total, 0);

          results.push({
            userId,
            userName: data.userName || 'Unknown',
            total,
            monthlyData,
          });
        } catch (error) {
          console.error(`Error fetching statistics for userId ${userId}:`, error);
        }
      }

      setStatistics(results);
    };

    fetchStatistics();
  }, []);


  const { total, monthlyData } = userRegistrations;
  const categories = monthlyData.map((item) => item.monthName);
  const series = monthlyData.map((item) => item.total);

  // const chartCategories = userRegistrations.monthlyData.map((data: any) => data.monthName);
  // const chartSeriesData = userRegistrations.monthlyData.map((data: any) => data.registrationCount);
  useEffect(() => {
    const fetchStatistics = async () => {
      const results: UserStatistics[] = [];

      for (const userId of userIds) {
        try {
          const response = await fetch(
            `https://api.localtour.space/api/Statistic/GetModApprovedPlaceByMonthAsync?year=2024&userId=${userId}`
          );
          const data = await response.json();

          if (data && data.list) {
            // Tạo mảng tháng từ 1 đến 12
            const allMonths = Array.from({ length: 12 }, (_, index) => ({
              month: index + 1,
              monthName: new Date(0, index).toLocaleString('default', { month: 'long' }),
              total: 0,
              totalPrice: 0,
            }));

            // Ghép dữ liệu từ API vào mảng tháng
            const mergedData = allMonths.map((defaultMonth) => {
              const match = data.list.find((item: any) => item.month === defaultMonth.month);
              return {
                ...defaultMonth,
                total: match ? match.total : 0,
                totalPrice: match ? match.totalPrice : 0,
              };
            });

            // Tính tổng các phê duyệt trong năm
            const total = mergedData.reduce((sum, item) => sum + item.total, 0);

            results.push({
              userId,
              userName: data.userName || 'Unknown',
              total,
              monthlyData: mergedData,
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
                name: '',
                data: chartSeriesData,
                total: chartTotalPriceData,
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
            <Grid item xs={12} md={6} key={stat.userName}>
              <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                  User Name: {stat.userName}
                </Typography>
                <Typography>Total Approvals: {stat.total} places</Typography>
                <AnalyticsWebsiteVisits
                  title="Monthly Approvals"
                  chart={{
                    categories: stat.monthlyData.map((data) => data.monthName),
                    series: [
                      {
                        name: '',
                        data: stat.monthlyData.map((data) => data.total),
                        total: stat.monthlyData.map((data) => data.totalPrice),
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
