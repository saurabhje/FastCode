'use client'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { removeToken, storeToken } from "@/components/features/storeToken";
import { useRouter } from 'next/navigation'
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const url = process.env.NEXT_PUBLIC_URL

export default function Login(){
    const { toast } = useToast()
    const router = useRouter()

    const onSubmit = async (e: any) => {
        e.preventDefault();
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
                throw new Error(result.error);
            }}catch(error){
                toast({
                    title : "Uh oh! Something went wrong.",
                    description: `${error}`
                });
            }
    }

    return (
        <Card className="mx-auto max-w-sm">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* -----------for later implemention----- */}
                  {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link> */}
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
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
