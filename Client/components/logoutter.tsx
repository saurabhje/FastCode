"use client"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { removeToken } from "./features/storeToken"

export async function Logout() {
    const router = useRouter()
    async function handleLogout(){
        await removeToken()
        window.localStorage.removeItem('ranked')
        router.replace('/')
        window.location.reload();
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="text-md md:text-lg hover:text-gray-500 hover:cursor-pointer">Profile</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.replace('/profile')}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
