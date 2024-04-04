import NavBar from "@/components/navbar";
import { getToken } from "@/components/features/storeToken";
import ProfileData from "./profile";

const url = 'http://127.0.0.1:5000/profile';

export default function ProfilePage() {
        async function fetchData(token :any) {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    return data.info
                } else {
                    throw new Error(data.error);
                }
            } catch (error : any) {
                return error
            }
        }

        async function fetchProfile() {
            const cookie = await getToken();
            const token = cookie?.value;
            if (token) {
                await fetchData(token);
            }
        }

    return (
        <main>
            <NavBar />
            <ProfileData fetchProfile={fetchProfile} />
        </main>
    );
}
