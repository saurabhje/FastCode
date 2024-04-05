import Link from "next/link"
import { getToken } from "./features/storeToken"
import { ModeToggle } from "./ui/themeSwitcher"
import { Logout } from "./logoutter"
export default async function NavBar() {
    const cookie = await getToken()
    let bool = cookie?.value
    return (
        <nav className="flex justify-between items-center p-5 md:px-20">
            <div className="mb-2 sm:mb-0">
                <a href="/" className="text-2xl">FastCode</a>
            </div>
            <div className="flex items-center gap-10">
                <ModeToggle />
                <Link href="/#" className="text-lg no-underline  hover:text-gray-500">Two</Link>
                {bool ? <Logout /> : <Link href="/login" className="text-lg no-underline  hover:text-gray-600">Login</Link>}
            </div>
        </nav>
    )
}
