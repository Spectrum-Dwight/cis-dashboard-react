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
import { Pie } from "react-chartjs-2"

// create props for KPIWidget it should take in an array of account names and a array of account data to filter
interface PieWidgetProps {
    accountNames: string[]
    accountData: any[]
}

function PieWidget() {
    const [chartData, setChartData] = useState({
        labels: ['Red', 'Orange', 'Blue'],
        datasets: [
            {
                label: 'Popularity of colours',
                data: [55, 23, 96],
                backgroundColor: [
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)'
                ],
                borderWidth: 1,
            }
        ]
    });

    return (
        <Card className="w-[400px] h-fit shadow-md hover:shadow-lg hover:cursor-grab active:cursor-grabbing transition-shadow duration-300">
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
                <SquareX className="w-4 h-4 hover:cursor-pointer" onClick={() => console.log("close me")} />
            </div>
            <CardContent>
                <div>
                    <Pie
                        data={chartData}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Users Gained between 2016-2020"
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
