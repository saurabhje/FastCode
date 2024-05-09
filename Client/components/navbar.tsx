import Link from "next/link"
import { getToken } from "./features/storeToken"
import { ModeToggle } from "./ui/themeSwitcher"
import { Logout } from "./logoutter"
import Image from "next/image"
import logo from "../public/android-chrome-512x512.png"
export default async function NavBar() {
    const cookie = await getToken()
    let bool = cookie?.value
    return (
        <nav className="sticky top-0 flex justify-between items-center px-4 py-3 md:px-20 backdrop-blur-md bg-background/80">
            <div className="mb-2 sm:mb-0 flex items-center gap-2">
                <Image src={logo} height={32} width={32} alt="logo"/>
                <a href="/" className="text-xl md:text-2xl">keyscripter</a>
            </div>
            <div className="flex items-center gap-3 md:gap-7">
                <ModeToggle />
                <Link href="/twodo" className="text-md md:text-lg no-underline  hover:text-gray-500">Twodo</Link>
                {bool ? <Logout /> : <Link href="/login" className="text-md md:text-lg no-underline  hover:text-gray-600">Login</Link>}
            </div>
        </nav>
    )
}
