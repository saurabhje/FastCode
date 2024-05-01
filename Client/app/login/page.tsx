import Navbar from "@/components/navbar"
import { TabsDemo } from "./tabs"
export default function LoginPage() {
    return (
      <div>
      <Navbar />
      <div className="flex justify-center items-center">
          <TabsDemo />
      </div>
      </div>
    )
  }