import SignUp from "./sinupForm"
import Link from "next/link"
export default function SignUpPage() {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
        <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
          <h1 className="font-semibold text-2xl">Sign up</h1>
          <SignUp />
          <p className="text-center">
            Already have an account?{' '}
            <Link className="text-indigo-500 hover:underline" href="/login">
              Login
            </Link>{' '}
          </p>
        </div>
      </div>
    )
  }