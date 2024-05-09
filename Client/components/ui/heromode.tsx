import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function Herocards() {
    return (
        <div className="flex flex-col gap-10">
            <Card className="bg-background shadow-none flex justify-center items-center">
                <CardHeader>
                    <CardTitle>Text</CardTitle>
                    <CardDescription>Practice typing random words and phrases to improve speed and accuracy.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>
            <Card className="bg-background shadow-none flex justify-center items-center">
                <CardHeader>
                    <CardTitle>Code</CardTitle>
                    <CardDescription>Perfect your snippet typing skills with added fun, including special characters and syntax.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
            </Card>
        </div>
    )
}  