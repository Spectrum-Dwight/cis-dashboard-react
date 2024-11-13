import { useQuery } from 'react-query';
import axios from 'axios';
import { SelectItem } from '@/components/ui/select';
import { JSX } from 'react/jsx-runtime';

export type AccountKPIData = {
  AccountID: number;
  AdjusterUserID: string;
  AccountName: string;
  PriorYearClaimCount: number;
  CurrentYearClaimCount: number;
  ClaimsClosedThisQuarter: number;
  ClaimsInLitigation: number;
  ClaimsYear0: number;
  TotalIncurredYear0: number;
  ClaimsYear1: number;
  TotalIncurredYear1: number;
  ClaimsYear2: number;
  TotalIncurredYear2: number;
  ClaimsYear3: number;
  TotalIncurredYear3: number;
  ClaimsYear4: number;
  TotalIncurredYear4: number;
  TypeOfClaim: string;
  ClaimCount: number;
  TotalIncurred: number;
};

type PieData = {
  AccountID: number;
  AdjusterUserID: number;
  AccountName: string;
  TypeOfClaim: string;
  ClaimCount: number;
  TotalIncurred: number;
};

type BarData = {
  AccountID: number;
  AdjusterUserID: number;
  AccountName: string;
  ClaimsYear0: number;
  TotalIncurredYear0: number;
  ClaimsYear1: number;
  TotalIncurredYear1: number;
  ClaimsYear2: number;
  TotalIncurredYear2: number;
  ClaimsYear3: number;
  TotalIncurredYear3: number;
  ClaimsYear4: number;
  TotalIncurredYear4: number;
};

export type BarDataArray = BarData[];
export type PieDataArray = PieData[];

export function createAccountSelectOptions(data: AccountKPIData[]): JSX.Element[] {
  const selectOptions: JSX.Element[] = [];
  const accountIDs = new Set<string>();

  data.forEach((account) => {
    const accountID = account.AccountID.toString();
    if (!accountIDs.has(accountID)) {
      accountIDs.add(accountID);
      selectOptions.push(
        <SelectItem value={account.AccountID.toString()}>
          {account.AccountName}
        </SelectItem>
      );
    }
  });

  return selectOptions;
}

export function createAdjusterSelectOptions(data: AccountKPIData[]): JSX.Element[] {
  const selectOptions: JSX.Element[] = [];
  const adjusterIDs = new Set<string>();

  data.forEach((account) => {
    const adjusterID = account.AdjusterUserID.toString();
    if (!adjusterIDs.has(adjusterID)) {
      adjusterIDs.add(adjusterID);
      selectOptions.push(
        <SelectItem value={account.AdjusterUserID.toString()}>
          {account.AdjusterUserID.toString()}
        </SelectItem>
      );
    }
  });

  return selectOptions;
}

// API Hook
function useDashboardData() {
  const fetchAccountData = async (): Promise<AccountKPIData[]> => {
    const { data } = await axios.get('/DashboardHandler.ashx');
    return data;
  };

  const fetchBarChartData = async (): Promise<BarDataArray> => {
    const { data } = await axios.get('/DashboardBarChartHandler.ashx');
    return data;
  };

  const fetchPieChartData = async (): Promise<PieDataArray> => {
    const { data } = await axios.get('/DashboardPieChartHandler.ashx');
    return data;
  };

  // Using React Query to fetch the data
  const {
    data: accountsKPIData,
    error: accountError,
    isLoading: accountsKPILoading,
  } = useQuery('accountData', fetchAccountData);

  const {
    data: barChartData,
    error: barChartError,
    isLoading: barChartLoading,
  } = useQuery('barChartData', fetchBarChartData);

  const {
    data: pieChartData,
    error: pieChartError,
    isLoading: pieChartLoading,
  } = useQuery('pieChartData', fetchPieChartData);

  return {
    accountsKPIData,
    barChartData,
    pieChartData,
    accountError,
    barChartError,
    pieChartError,
    accountsKPILoading,
    barChartLoading,
    pieChartLoading,
  };
}

export default useDashboardData;
