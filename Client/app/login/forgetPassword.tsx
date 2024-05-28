'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BounceLoader from "@/components/ui/loader"
import { useToast } from "@/components/ui/use-toast"
import Error from "next/error"
import { useRouter } from "next/navigation"
import { useState } from "react"

const url = process.env.NEXT_PUBLIC_URL
export function ForgetPassword() {
    const [requestMade, setRequestMade] =  useState(false)
    const { toast } = useToast()
    const router = useRouter()

    async function Submit(e: any) {
        e.preventDefault();
        setRequestMade(true)
        const email = e.target[0].value;
        try {
            const response = await fetch(`${url}/changepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            const result = await response.json();
            if (response.ok) {
                toast({
                    title: 'Sent password reset link',
                    description: 'Check your mail',
                    duration: 2000
                });
                e.target[0].value = ''
            } else if (response.status === 401) {
                toast({
                    title: 'Email is not registered',
                    description: 'Register your email with a new account'
                });
                router.replace('/register')
            } else {
                throw new Error(result.err);
            }
            setRequestMade(false)
        } catch (error) {
            toast({
                title: 'Uh oh! Something went wrong.',
                description: `${error}`
            });
        }
    }
    
    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Change Password</CardTitle>
                <CardDescription>
                    Enter your email below to receive a password reset link.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={Submit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <Button className="w-full" type="submit">{requestMade? <BounceLoader /> : "Submit"}</Button>
                </form>
            </CardContent>
        </Card>
    )
}
