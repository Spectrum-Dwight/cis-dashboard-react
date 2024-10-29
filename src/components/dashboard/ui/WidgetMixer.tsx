import { AccountKPIData, BarDataArray, PieDataArray, } from '@/hooks/useDashBoardData';
import BarWidget from './BarWidget';
import EmptyWidget from './EmptyWidget';
import KPIWidget from './KPIWidget';
import PieWidget from './PieWidget';

interface WidgetMixerProps {
    type: string;
    index: number;
    accountDropDownOptions: JSX.Element[];
    dataLoading: boolean[];
    dashboardData: {
        accountsKPIData: AccountKPIData[] | undefined;
        barChartData: BarDataArray | undefined;
        pieChartData: PieDataArray | undefined;
    }
    updateRow: (index: number, newValue: string) => void;
}

function WidgetMixer({ type, index, updateRow, dataLoading, accountDropDownOptions, dashboardData }: WidgetMixerProps) {
    const { accountsKPIData, barChartData, pieChartData } = dashboardData;
    switch (type) {
        case 'KPI':
            return <KPIWidget currentIndex={index} removeWidget={updateRow} loading={dataLoading[0]} accountDropDownOptions={accountDropDownOptions} kpiData={accountsKPIData} />;
        case 'PIE':
            return <PieWidget currentIndex={index} removeWidget={updateRow} loading={dataLoading[1]} accountDropDownOptions={accountDropDownOptions} pieChartData={pieChartData} />;
        case 'BAR':
            return <BarWidget currentIndex={index} removeWidget={updateRow} loading={dataLoading[2]} accountDropDownOptions={accountDropDownOptions} barChartData={barChartData} />;
        default:
            return <EmptyWidget />;
    }
};

export default WidgetMixer;