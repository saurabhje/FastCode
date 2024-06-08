'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import BounceLoader from "@/components/ui/loader"
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
import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import useGoogleData from "@/components/features/GoogleAuth"

const url = process.env.NEXT_PUBLIC_URL

export default function SignUp() {
  const { toast } = useToast()
  const router = useRouter()
  const [requestmade, setRequestMade] = useState(false)
  const [auth, setAuthMade] = useState(false)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState<{ access_token: string } | null>(null);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return false;
    }
    setPasswordError("");
    return true;
  };


  // which returns an accessToken cookie
  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      setUser(codeResponse);
      setAuthMade(true)
    },
    onError: (error?: any) => {
      toast({
        title: "Login failed",
        description: `${error}`,
        duration: 1500
      });
    }
  });


  // This fetches the user data from the google api and then sends that data in the backend API to store in DB
  useGoogleData(user, setAuthMade)

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validatePasswords();
    if (!isValid) return;
    setRequestMade(true)
    let data = {
      name: e.target[0].value + ' ' + e.target[1].value,
      email: e.target[2].value,
      password: password
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
          title: 'Verify your email',
          description: 'Sent confirmation mail(check spam too)',
          duration: 3000
        })
        setRequestMade(false)
      }
      else if (response.status === 409) {
        toast({
          title: "Email already registered",
          duration: 1500
        });
        router.replace("/login")
      }
      else {
        setRequestMade(false)
        throw new Error(result.error);
      }

    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${error}`
      });
    }
  }
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className='w-full mb-4' onClick={() => login()}>
          {auth ? <BounceLoader />
            :
            <>
              <img className="w-5 h-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" loading="lazy" />
              <span className="ml-2">Sign up with Google</span>
            </>}
        </Button>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" minLength={4} maxLength={10} placeholder="Saurabh" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" minLength={4} maxLength={10} placeholder="Chandel" required />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" minLength={8} maxLength={16} required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <Input id="confirmpassword" type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              {passwordError && <div className="text-xs text-red-500">{passwordError}</div>}
            </div>
            <Button type="submit" className="w-full">
              {requestmade ? <BounceLoader /> : "Create an account"}
            </Button>
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