import { getToken } from "./storeToken";

export default async function SendtestData(wpm: any, accuracy: any, text: String) {
    try {
        const url = process.env.NEXT_PUBLIC_URL;
        const cookie = await getToken();
        const token = cookie?.value;
        const data = {
            'wpm': wpm,
            'accuracy': accuracy,
            'testType': text
        };
        const response = await fetch(`${url}/alter`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
            console.log(result.msg);
        } else {
            throw new Error(result.err)
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}
