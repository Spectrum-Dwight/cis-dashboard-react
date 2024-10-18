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

// create props for KPIWidget it should take in an array of account names and a array of account data to filter
interface KPIWidgetProps {
    accountNames: string[]
    accountData: any[]
} 

function KPIWidget() {
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
                <div className="flex flex-col gap-1 max-w-md">
                    <div className="flex justify-between items-center" id="PriorYearCard">
                        <div className="bg-blue-100 rounded-lg p-2 font-bold">Claim Count 2023 YTD:</div>
                        <div id="PriorYearClaimCount" className="text-green-700 text-lg font-bold rounded-lg p-2">-</div>
                    </div>
                    <div className="flex justify-between items-center" id="CurrentYearCard">
                        <div className="bg-blue-100 rounded-lg p-2 font-bold">Claim Count 2024 YTD:</div>
                        <div id="CurrentYearClaimCount" className="text-green-700 text-lg font-bold rounded-lg p-2">-</div>
                    </div>
                    <div className="flex justify-between items-center" id="ClosedThisQuarterCard">
                        <div className="bg-blue-100 rounded-lg p-2 font-bold">Claims Closed this Quarter:</div>
                        <div id="ClaimsClosedThisQuarter" className="text-green-700 text-lg font-bold rounded-lg p-2">-</div>
                    </div>
                    <div className="flex justify-between items-center" id="InLitigationCard">
                        <div className="bg-blue-100 rounded-lg p-2 font-bold">Claims in Litigation Open & Reopened:</div>
                        <div id="ClaimsInLitigation" className="text-green-700 text-lg font-bold rounded-lg p-2">-</div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
export default KPIWidget
