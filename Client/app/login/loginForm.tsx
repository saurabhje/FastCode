'use client'
import { useState } from "react";
import { ForgetPassword } from "./forgetPassword";
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { storeToken } from "@/components/features/storeToken";
import { useRouter } from 'next/navigation'
import BounceLoader from "@/components/ui/loader";
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const url = process.env.NEXT_PUBLIC_URL

export default function Login(){
    const [requestMade, setRequestMade] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setRequestMade(true)
        const data = {
            email : e.target[0].value,
            password : e.target[1].value
        }
            try{const response = await fetch(`${url}/login`, {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                if (result.accessToken){
                    toast({
                        title: "Login successful",
                        description: "Welcome back! I missed you",
                        duration: 1500
                    });
                    await storeToken(result.accessToken)
                }else{
                    console.log('No token generated gent! Dev is novice, give him time')
                }
            router.replace("/")
            }else{
                setRequestMade(false)
                throw new Error(result.error);
            }}catch(error){
                toast({
                    title : "Uh oh! Something went wrong.",
                    description: `${error}`
                });
            }
    }

    return (
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {requestMade ? <BounceLoader /> : "Login"}
              </Button>
{/*               <Button variant="outline" className="w-full">
                Sign in with GitHub
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
            </form>
          </CardContent>
        </Card>
      )
}
