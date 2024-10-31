import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, SquareX } from "lucide-react"
import "chart.js/auto"
import { Pie } from "react-chartjs-2"
import React from "react"
import { PieDataArray } from "@/hooks/useDashBoardData"
import { Chart_Borders, Chart_Colors } from "@/lib/utils"

interface PieWidgetProps {
    pieChartData: any[] | undefined;
    currentIndex: number;
    loading: boolean;
    accountDropDownOptions: JSX.Element[];
    removeWidget: (index: number, newValue: string) => void;
}

function PieWidget({ loading, currentIndex, removeWidget, accountDropDownOptions, pieChartData }: PieWidgetProps) {
    const [selectedAccountId, setSelectedAccountId] = React.useState<number>(0);
    let filteredPieData: any[] = [];

    if (loading) {
        return (
            <div className="min-w-[500px] min-h-[200px] flex items-center justify-center"><Loader2 className="animate-spin" /></div>
        )
    }

    if (pieChartData) {
        if (selectedAccountId === 0) {
            filteredPieData = pieChartData;
        } else {
            filteredPieData = pieChartData.filter(account => account.AccountID === selectedAccountId);
        }

    }

    const accumulatedData = accumulateClaimsByType(filteredPieData);
    const sortedData = sortByTotalIncurred(accumulatedData);
    const finalResult = groupTopNineAndOthers(sortedData);
    const filteredGroupedData = createPieChartData(finalResult);

    return (
        <Card className="w-[500px] h-[475px] shadow-md rounded hover:shadow-lg hover:cursor-grab active:cursor-grabbing transition-shadow duration-300">
            <div className="flex flex-row items-center justify-between py-2 px-6">
                <Select value={selectedAccountId.toString()} onValueChange={(value) => setSelectedAccountId(Number(value))} disabled={loading}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="0">All Accounts</SelectItem>
                            {accountDropDownOptions}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <SquareX className="w-4 h-4 hover:cursor-pointer" onClick={() => {
                    removeWidget(currentIndex, '')
                }} />
            </div>
            <CardContent className="h-max">
                <div>
                    <Pie
                        className="w-[500px] h-[400px]"
                        data={filteredGroupedData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'right'
                                },
                                title: {
                                    display: true,
                                    text: 'Claims Severity by Type',
                                    font: {
                                        size: 20
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
export default PieWidget

interface AccumulatedClaims {
    [key: string]: {
        TypeOfClaim: string;
        ClaimCount: number;
        TotalIncurred: number;
    };
}

function accumulateClaimsByType(data: PieDataArray) {
    return data.reduce((acc: AccumulatedClaims, curr) => {
        if (acc[curr.TypeOfClaim]) {
            acc[curr.TypeOfClaim].ClaimCount += curr.ClaimCount;
            acc[curr.TypeOfClaim].TotalIncurred += curr.TotalIncurred;
        } else {
            acc[curr.TypeOfClaim] = {
                TypeOfClaim: curr.TypeOfClaim,
                ClaimCount: curr.ClaimCount,
                TotalIncurred: curr.TotalIncurred
            };
        }
        return acc;
    }, {});
}

function sortByTotalIncurred(accumulatedData: AccumulatedClaims) {
    const sortedArray = Object.entries(accumulatedData).sort((a, b) => {
        return b[1].TotalIncurred - a[1].TotalIncurred;
    });

    const sortedObject = Object.fromEntries(sortedArray);
    return sortedObject;
}

function groupTopNineAndOthers(sortedData: AccumulatedClaims) {
    const sortedEntries = Object.entries(sortedData);
    const topNine = sortedEntries.slice(0, 9);
    const allOtherClaims = sortedEntries.slice(9).reduce((acc, [_, value]) => {
        acc.ClaimCount += value.ClaimCount;
        acc.TotalIncurred += value.TotalIncurred;
        return acc;
    },
        { TypeOfClaim: 'All Other', ClaimCount: 0, TotalIncurred: 0 }
    );

    const result = Object.fromEntries(topNine);
    result['All Other'] = allOtherClaims;

    return result;
}

function createPieChartData(accumulatedData: any) {
    const labels = [];
    const data = [];

    for (const typeOfClaim in accumulatedData) {
        if (accumulatedData.hasOwnProperty(typeOfClaim)) {
            const claimData = accumulatedData[typeOfClaim];
            labels.push(claimData.TypeOfClaim);       // TypeOfClaim as label
            data.push(claimData.TotalIncurred);       // Total Incurred as data
        }
    }

    return {
        labels: labels,
        datasets: [{
            label: 'Total Incurred',
            data: data,
            backgroundColor: Chart_Colors,
            borderColor: Chart_Borders,
            borderWidth: 1
        }]
    };
}