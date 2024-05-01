import NavBar from "@/components/navbar"
import SignUp from "./sinupForm"
export default function SignUpPage() {
    return (
      <>
      <NavBar />
      <div className="flex justify-center items-center">
          <SignUp />
      </div>
      </>
    )
  }