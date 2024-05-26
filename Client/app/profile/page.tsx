import NavBar from "@/components/navbar";
import { getToken } from "@/components/features/storeToken";
import ProfileData from "./profile";

const url = process.env.NEXT_PUBLIC_URL

export default async function ProfilePage() {
        const fetchData = async () => {
            try {
                const cookie = await getToken();
                const token = cookie?.value;
                if (token) {
                    const response = await fetch(`${url}/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return data.Info
                    } else {
                        const errorData = await response.json();
                        throw new Error(errorData.error);
                    }
                }
            } catch (error) {
                return {'Error fetching profile data': error};
            }
        };

    let profileData = await fetchData();
    return (
        <main className="py-6 px-4 lg:px-16">
            <ProfileData profileData={profileData} />
        </main>
    );
}
