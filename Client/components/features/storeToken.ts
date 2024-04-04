'use server'
import { cookies } from "next/headers";
const MAX_AGE = 10 * 24 * 60 * 60;

export async function storeToken(acceessToken: string ) {
    cookies().set({
        name: "acceessToken",
        value: acceessToken,
        httpOnly: true,
        sameSite: "strict",
        maxAge: MAX_AGE,
        secure: true,
    })
}
export async function getToken(){
    return cookies().get('acceessToken')
}