import React from 'react';
import { Box, Card, CardHeader, Typography } from '@mui/material';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';
import { Chart, useChart } from 'src/components/chart';

type Props = {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: {
      name: string;
      data: number[];
      total: number[];
    }[];
    options?: any;
  };
  additionalContent?: React.ReactNode;
};

export function AnalyticsWebsiteVisits({ title, subheader, chart, additionalContent }: Props) {
  const theme = useTheme();
  
  const chartColors = chart.colors ?? [
    theme.palette.primary.dark,
    hexAlpha(theme.palette.primary.light, 0.64),
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chart.categories,
    },
    legend: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value: number, { seriesIndex, dataPointIndex }: { seriesIndex: number, dataPointIndex: number }) => {
          // Lấy giá trị totalPrice cho điểm dữ liệu hiện tại
          const totalPrice = chart.series[seriesIndex].total[dataPointIndex];
          return `Total: ${value} places\nTotal Price: ${totalPrice} VND`;
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card>
      <CardHeader
        title={
          <Box>
            <Typography variant="h6">{title}</Typography>
            {additionalContent && (
              <Box mt={1}>
                <Typography variant="h5" color="textPrimary">
                  {additionalContent}
                </Typography>
              </Box>
            )}
          </Box>
        }
        subheader={subheader}
      />
      <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        height={364}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      />
    </Card>
  );
}
