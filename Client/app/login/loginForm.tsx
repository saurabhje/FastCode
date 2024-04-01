'use client'
import { Button } from "@/components/ui/button"
export default function Login(){
    const onSubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            email : e.target[0].value,
            password : e.target[1].value
        }
        try{
            const response = await fetch('http://127.0.0.1:5000/login', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok){
                console.log(result.message)
            }else{
                throw new Error('failed to login', result.error);
            }
        } catch(error){
            console.log(error)
        }
    }
    return(
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="email">Email</label>
                <input 
                    required
                    id="email"   
                    type="email"
                    className="w-full border-b-2 border-blue-gray-200 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 duration-300 ease-in-out"
                 />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="password">Password</label>
                <input 
                    required
                    id="password"   
                    type="password"
                    className="w-full border-b-2 border-blue-gray-200 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 duration-300 ease-in-out"
                 />
            </div>
            <div className="w-full">
                <Button type="submit" className="w-full" size="lg">
                    Login
                </Button>
            </div>
        </form>
    )
}