import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AccountKPIData, createAdjusterSelectOptions } from '@/hooks/useDashBoardData';
import useKpiEventHandlers from '@/hooks/useKpiEventHandlers';
import { Loader2, SquareX } from 'lucide-react';
import React from 'react';

interface KPIWidgetProps {
  kpiData: AccountKPIData[] | undefined;
  currentIndex: number;
  loading: boolean;
  accountDropDownOptions: JSX.Element[];
  removeWidget: (index: number, newValue: string) => void;
}

function KPIWidget({
  loading,
  currentIndex,
  removeWidget,
  accountDropDownOptions,
  kpiData,
}: KPIWidgetProps) {
  const [selectedAccountId, setSelectedAccountId] = React.useState<number>(0);
  const [selectedAdjusterId, setSelectedAdjusterId] = React.useState<string>('0');
  useKpiEventHandlers(selectedAccountId);

  let filteredKPIData: any[] = [];
  let totalPriorYearClaimCount: number = 0;
  let totalCurrentYearClaimCount: number = 0;
  let totalClaimsClosedThisQuarter: number = 0;
  let totalClaimsInLitigation: number = 0;

  const adjusterDropdownOptions = React.useMemo(() => {
    return kpiData ? createAdjusterSelectOptions(kpiData) : [];
  }, [kpiData]);

  if (loading) {
    return (
      <div className='min-w-[500px] min-h-[200px] flex items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  if (kpiData) {
    console.log('kpiData', kpiData);
    filteredKPIData = kpiData.filter(
      (account) =>
        (selectedAccountId === 0 || account.AccountID === selectedAccountId) &&
        (selectedAdjusterId === '0' || account.AdjusterUserID === selectedAdjusterId)
    );
  }

  filteredKPIData.forEach((account) => {
    totalPriorYearClaimCount += account.PriorYearClaimCount;
    totalCurrentYearClaimCount += account.CurrentYearClaimCount;
    totalClaimsClosedThisQuarter += account.ClaimsClosedThisQuarter;
    totalClaimsInLitigation += account.ClaimsInLitigation;
  });

  return (
    <Card className='w-[500px] h-[200px] shadow-md rounded hover:shadow-lg hover:cursor-grab active:cursor-grabbing transition-shadow duration-300'>
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
          value={selectedAdjusterId}
          onValueChange={(value) => setSelectedAdjusterId(value)}
          disabled={loading}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select an adjuster' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='0'>All Adjusters</SelectItem>
              {adjusterDropdownOptions}
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
        <div className='flex flex-col mx-auto gap-1 w-4/5'>
          <div
            className='flex justify-between items-center hover:cursor-pointer active:cursor-pointer'
            id='PriorYearCard'>
            <div className='bg-blue-100 rounded-lg p-2 font-bold text-3xl w-fit'>
              Claim Count 2023 YTD:
            </div>
            <div
              id='PriorYearClaimCount'
              className='text-green-700 text-3xl font-bold rounded-lg p-2'>
              {totalPriorYearClaimCount}
            </div>
          </div>
          <div
            className='flex justify-between items-center hover:cursor-pointer active:cursor-pointer'
            id='CurrentYearCard'>
            <div className='bg-blue-100 rounded-lg p-2 font-bold text-3xl  w-fit'>
              Claim Count 2024 YTD:
            </div>
            <div
              id='CurrentYearClaimCount'
              className='text-green-700 text-3xl font-bold rounded-lg p-2'>
              {totalCurrentYearClaimCount}
            </div>
          </div>
          <div
            className='flex justify-between items-center hover:cursor-pointer active:cursor-pointer'
            id='ClosedThisQuarterCard'>
            <div className='bg-blue-100 rounded-lg p-2 font-bold text-3xl  w-fit'>
              Claims Closed this Month:
            </div>
            <div
              id='ClaimsClosedThisQuarter'
              className='text-green-700 text-3xl font-bold rounded-lg p-2'>
              {totalClaimsClosedThisQuarter}
            </div>
          </div>
          <div
            className='flex justify-between items-center hover:cursor-pointer active:cursor-pointer'
            id='InLitigationCard'>
            <div className='bg-blue-100 rounded-lg p-2 font-bold text-3xl  w-fit'>
              New Claims in Last Month:
            </div>
            <div
              id='ClaimsInLitigation'
              className='text-green-700 text-3xl font-bold rounded-lg p-2'>
              {totalClaimsInLitigation}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default KPIWidget;
