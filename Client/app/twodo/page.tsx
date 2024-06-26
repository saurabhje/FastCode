export default function TwoDo() {
    return (
        <div className="py-4 px-4 lg:px-20 flex flex-col items-center">
            <h1 className="text-2xl mb-10">Twodo</h1>
            <ol className="list-decimal pl-5">
                <li className="line-through">Actually make a route for this twodo.</li>
                <li className="line-through">Add few things on homepage to lure new people. 🧙‍♀️</li>
                <li className="line-through">Improve the dashboard, add graphs.</li>
                <li className="line-through">Google Auth?</li>
                <li>Improve the syntax generation function.</li>
                <li>Adding polling for your non-existent users where they can poll to add new features.</li>
            </ol>
        </div>

    )
}