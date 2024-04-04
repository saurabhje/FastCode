import Link from "next/link"
import { getToken } from "./features/storeToken"
import { ModeToggle } from "./ui/themeSwitcher"
export default async function NavBar() {
    const cookie = await getToken()
    let bool = cookie?.value
    return (
        <nav className="flex justify-between items-center p-5 md:px-20">
            <div className="mb-2 sm:mb-0">
                <a href="/" className="text-2xl hover:text-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">FastCode</a>
            </div>
            <div className="flex items-center gap-10">
                <ModeToggle />
                <Link href="/#" className="text-lg no-underline  hover:text-gray-500">Two</Link>
                {bool ? <Link href="/profile" className="text-lg no-underline  hover:text-gray-600">Profile</Link> : <Link href="/login" className="text-lg no-underline  hover:text-gray-600">Login</Link>}
            </div>
        </nav>
    )
}
