'use server'
import { cookies } from "next/headers";


export async function storeToken(request: { token: string }) {
    cookies().set({
        name: "accessToken",
        value: request.token,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    })
}
