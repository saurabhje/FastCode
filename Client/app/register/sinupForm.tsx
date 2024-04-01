'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react";
export default function SignUp(){
    const onSubmit = async (e: any) => {
        e.preventDefault();
        let data = {
            name : e.target[0].value,
            email: e.target[1].value,
            password : e.target[2].value
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result.message)

            } else {
                throw new Error('Failed to create user', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return(
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full gap-1.5">
                <label htmlFor="name">Name</label>
                <input 
                    required
                    id="text"
                    type="text"
                    minLength={4} maxLength={20}               
                    className="w-full border-b-2 border-blue-gray-200 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 duration-300 ease-in-out"    
                />
            </div>
            <div className="grid w-full gap-1.5">
                <label>Email</label>
                <input 
                    required
                    id="email"
                    type="email"
                    className="w-full border-b-2 border-blue-gray-200 bg-transparent text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 duration-300 ease-in-out"                    
                />
            </div>
            <div className="grid w-full gap-1.5">
                <label>Password</label>
                <input 
                    required
                    id="password"
                    type="password"
                    minLength={8} maxLength={20}
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