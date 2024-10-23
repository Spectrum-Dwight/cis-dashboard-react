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
import { SquareX } from "lucide-react"
import { useState } from "react"
import "chart.js/auto"
import { Bar } from "react-chartjs-2"

// create props for KPIWidget it should take in an array of account names and a array of account data to filter
interface BarWidgetProps {
    accountNames?: string[]
    accountData?: any[]
    currentIndex: number;
    removeWidget: (index: number, newValue: string) => void;
}

function BarWidget({ currentIndex, removeWidget }: BarWidgetProps) {
    const [chartData, setChartData] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: 'Popularity of colours',
                data: [55, 23, 96],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',    // Red
                    'rgba(54, 162, 235, 0.2)',    // Blue
                    'rgba(255, 206, 86, 0.2)',    // Yellow
                ],
                borderWidth: 1,
            }
        ]
    });

    return (
        <Card className="min-w-[600px] min-h-[400px] h-fit shadow-md hover:shadow-lg hover:cursor-grab active:cursor-grabbing transition-shadow duration-300">
            <div className="flex flex-row items-center justify-between py-2 px-6">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <SquareX className="w-4 h-4 hover:cursor-pointer" onClick={() => {
                    removeWidget(currentIndex, '')
                    console.log("close me")
                }} />
            </div>
            <CardContent>
                <div>
                    <Bar
                        data={chartData}
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
export default BarWidget
