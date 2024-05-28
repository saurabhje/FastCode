import { storeToken } from "@/components/features/storeToken";
export async function authSender(email: string, name: string){
    try{

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/oauth`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name })
        })
        const result = await response.json()
        if (response.ok){
            await storeToken(result.accessToken)
            return true;
        }else{
            throw new Error(result.error)
        }
    }catch(error){
        console.log('error', error)
        return false
    }
}