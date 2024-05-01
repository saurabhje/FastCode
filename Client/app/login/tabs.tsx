import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Login from "./loginForm"
import { ForgetPassword } from "./forgetPassword"

export function TabsDemo() {
  return (
    <Tabs defaultValue="Login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Login">Login</TabsTrigger>
        <TabsTrigger value="password">Forget password</TabsTrigger>
      </TabsList>
      <TabsContent value="Login">
       <Login />
      </TabsContent>
      <TabsContent value="password">
        <ForgetPassword />
      </TabsContent>
    </Tabs>
  )
}
