'use client'
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
export default function SignUp(){
    const [name, setname] = useState<String>('')
    const [email, setemail] = useState<String>('')
    const [password, setpassword] = useState<String>('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return(
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full gap-1/5">
                <label htmlFor="name">Name</label>
                <input 
                    required
                    id="text"
                    type="text"
                    onChange={e => setname(e.target.value)}                
                    className="w-full border-b-2 border-blue-gray-200 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 duration-300 ease-in-out"    
                />
            </div>
            <div className="grid w-full gap-1/5">
                <label>Email</label>
                <input 
                    required
                    id="email"
                    type="email"
                    onChange={e => setemail(e.target.value)}
                    className="w-full border-b-2 border-blue-gray-200 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 duration-300 ease-in-out"                    
                />
            </div>
            <div className="grid w-full gap-1/5">
                <label>Password</label>
                <input 
                    required
                    id="password"
                    type="password"
                    onChange={e => setpassword(e.target.value)}
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