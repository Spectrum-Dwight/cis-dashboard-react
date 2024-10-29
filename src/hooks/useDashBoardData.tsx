import { useQuery } from 'react-query';
import axios from 'axios';
import { SelectItem } from '@/components/ui/select';
import { JSX } from 'react/jsx-runtime';

export type AccountKPIData = {
    AccountID: number;
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
    AccountName: string;
    TypeOfClaim: string;
    ClaimCount: number;
    TotalIncurred: number;
};

type BarData = {
    AccountID: number;
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

export function createSelectOptions(data: AccountKPIData[]): JSX.Element[] {
    const selectOptions: JSX.Element[] = [];

    data.forEach(account => {
        selectOptions.push(<SelectItem value={account.AccountID.toString()}>{account.AccountName}</SelectItem>);
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
    const { data: accountsKPIData, error: accountError, isLoading: accountsKPILoading } = useQuery(
        'accountData',
        fetchAccountData
    );

    const { data: barChartData, error: barChartError, isLoading: barChartLoading } = useQuery(
        'barChartData',
        fetchBarChartData
    );

    const { data: pieChartData, error: pieChartError, isLoading: pieChartLoading } = useQuery(
        'pieChartData',
        fetchPieChartData
    );

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
};

export default useDashboardData;
