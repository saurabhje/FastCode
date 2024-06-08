import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authSender } from "../authSender";

const useGoogleData = (user: {access_token: string} | null, setAuthMade: any) => {
    const router = useRouter()

    useEffect(()=>{
        const fetchData = async () => {
            if (user){
                try{
                    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers:{
                            Authorization: `Bearer ${user?.access_token}`,
                            Accept: 'application/json'
                        }
                    });
                    if (response.ok){
                        const userData = await response.json()
                        const result = await authSender(userData['email'], userData['name'])
                        if (result){
                            router.replace('/')
                        }
                    }else{
                        console.error('Failed to fetch user data: ', response.statusText)
                    }
                setAuthMade(false)
                }catch(error){
                    console.log('Error: ', error);
                }
            }
        }
        fetchData();
    },[user])
}

export default useGoogleData;