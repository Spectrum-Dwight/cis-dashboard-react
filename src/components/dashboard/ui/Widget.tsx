import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function WidgetCard() {
    return (
        <Card className="w-[400px] h-[200px] shadow-md hover:shadow-lg hover:cursor-grab active:cursor-grabbing transition-shadow duration-300">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}
export default WidgetCard
