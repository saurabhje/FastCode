'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
const url = process.env.NEXT_PUBLIC_URL

export default function SignUp(){
    const { toast } = useToast()
    const router = useRouter()
    
    const onSubmit = async (e: any) => {
        e.preventDefault();
        let data = {
            name: e.target[0].value + ' ' + e.target[1].value,
            email: e.target[2].value,
            password : e.target[3].value
        }
        try {
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                toast({
                    title: 'Sign up successful',
                    description : 'Login to access dashboard',
                    duration: 2000
                })
                router.replace("/login")
            } else {
                throw new Error('Failed to create user', result.error);
            }
            
        } catch (error) {
            toast({
                title : "Uh oh! Something went wrong.",
                description: `${error}`
            });
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Saurabh" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Chandel" required />
                </div>
              </div>
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
                <Input id="password" type="password" />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              {/* --------hmmmmmm Maybe in coming release---------
              <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
            </form>
          </CardContent>
        </Card>
      )
}



