export default function NavBar(){
    return(
        <nav className="flex justify-between items-center p-5 md:px-20">
            <div className="mb-2 sm:mb-0">
                <a href="/" className="text-2xl">FastCode</a>
            </div>
            <div className="flex items-center gap-10">
                <a href="#" className="text-lg no-underline hover:text-gray-500">One</a>
                <a href="#" className="text-lg no-underline  hover:text-gray-500">Two</a>
                <a href="/login" className="text-lg no-underline  hover:text-gray-600">Login</a>
            </div>
        </nav>
    )
}
