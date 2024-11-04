import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, SquareX } from 'lucide-react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import React from 'react';
import { BarDataArray } from '@/hooks/useDashBoardData';

interface BarWidgetProps {
  barChartData: BarDataArray | undefined;
  currentIndex: number;
  loading: boolean;
  accountDropDownOptions: JSX.Element[];
  adjusterDropDownOptions: JSX.Element[];
  removeWidget: (index: number, newValue: string) => void;
}

function BarWidget({
  loading,
  currentIndex,
  removeWidget,
  accountDropDownOptions,
  adjusterDropDownOptions,
  barChartData,
}: BarWidgetProps) {
  const [selectedAccountId, setSelectedAccountId] = React.useState<number>(0);
  const [selectedAdjusterId, setSelectedAdjusterId] = React.useState<number>(0);
  let filteredBarData: any[] = [];

  if (loading) {
    return (
      <div className='min-w-[500px] min-h-[200px] flex items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  if (barChartData) {
    filteredBarData = barChartData.filter(
      (account) =>
        (selectedAccountId === 0 || account.AccountID === selectedAccountId) &&
        (selectedAdjusterId === 0 || account.AdjusterID === selectedAdjusterId)
    );
  }

  return (
    <Card className='w-[500px] h-[475px] shadow-md rounded hover:shadow-lg hover:cursor-grab active:cursor-grabbing transition-shadow duration-300'>
      <div className='flex flex-row items-center justify-between py-2 px-6'>
        <Select
          value={selectedAccountId.toString()}
          onValueChange={(value) => setSelectedAccountId(Number(value))}
          disabled={loading}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select an account' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='0'>All Accounts</SelectItem>
              {accountDropDownOptions}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedAdjusterId.toString()}
          onValueChange={(value) => setSelectedAdjusterId(Number(value))}
          disabled={loading}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select an adjuster' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='0'>All Adjusters</SelectItem>
              {adjusterDropDownOptions}
            </SelectGroup>
          </SelectContent>
        </Select>
        <SquareX
          className='w-4 h-4 hover:cursor-pointer'
          onClick={() => {
            removeWidget(currentIndex, '');
          }}
        />
      </div>
      <CardContent>
        <div>
          <Chart
            className='w-[500px] h-[400px]'
            type='bar'
            data={createBarChartData(accumulateTotalsForBarGraph(filteredBarData))}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  type: 'linear',
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Total Incurred',
                  },
                  beginAtZero: true,
                },
                y1: {
                  type: 'linear',
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Claims Total',
                  },
                  grid: {
                    drawOnChartArea: false, // This will remove grid lines for the second Y-axis
                  },
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Claims Frequency and Severity by Year', // Bar Chart Title
                  font: {
                    size: 20,
                  },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
export default BarWidget;

function createBarChartData(totals: any) {
  const currentYear = new Date().getFullYear();
  const labels = Array.from(
    { length: 5 },
    (_, index) => `${currentYear - index}`
  ).reverse();

  // Prepare chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Total Incurred',
        data: [
          totals.TotalIncurredYear0,
          totals.TotalIncurredYear1,
          totals.TotalIncurredYear2,
          totals.TotalIncurredYear3,
          totals.TotalIncurredYear4,
        ],
        backgroundColor: ['rgba(139, 0, 0, 0.4)'],
        borderColor: ['rgba(139, 0, 0, 1)'],
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Claims Totaled',
        data: [
          totals.ClaimsYear0,
          totals.ClaimsYear1,
          totals.ClaimsYear2,
          totals.ClaimsYear3,
          totals.ClaimsYear4,
        ],
        borderColor: 'rgba(0, 0, 139, 1)',
        borderWidth: 2,
        yAxisID: 'y1',
        fill: false,
      },
    ],
  };

  return chartData;
}

function accumulateTotalsForBarGraph(data: BarDataArray) {
  const totals = {
    ClaimsYear0: 0,
    TotalIncurredYear0: 0,
    ClaimsYear1: 0,
    TotalIncurredYear1: 0,
    ClaimsYear2: 0,
    TotalIncurredYear2: 0,
    ClaimsYear3: 0,
    TotalIncurredYear3: 0,
    ClaimsYear4: 0,
    TotalIncurredYear4: 0,
  };

  data.forEach((account) => {
    totals.ClaimsYear0 += account.ClaimsYear0;
    totals.TotalIncurredYear0 += account.TotalIncurredYear0;
    totals.ClaimsYear1 += account.ClaimsYear1;
    totals.TotalIncurredYear1 += account.TotalIncurredYear1;
    totals.ClaimsYear2 += account.ClaimsYear2;
    totals.TotalIncurredYear2 += account.TotalIncurredYear2;
    totals.ClaimsYear3 += account.ClaimsYear3;
    totals.TotalIncurredYear3 += account.TotalIncurredYear3;
    totals.ClaimsYear4 += account.ClaimsYear4;
    totals.TotalIncurredYear4 += account.TotalIncurredYear4;
  });

  return totals;
}
