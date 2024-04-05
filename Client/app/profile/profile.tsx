import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DollarSign } from 'lucide-react';

type ProfileDataProps = {
    profileData: {
        name: string;
        email: string;
        total_tests: number;
        tests_today: number;
        overall_accuracy: number;
        accuracy_today: number;
        overall_wpm: number;
        wpm_today: number;
        highest_wpm_ever: number;
        highest_wpm_today: number;
        highest_accuracy_today: number;
    };
};

const ProfileData: React.FC<ProfileDataProps> = ({ profileData }) => {
    return (
        <div className='py-4 px-4 lg:px-20 flex flex-col items-center'>
            <Card className='bg-background shadow-none border border-zinc-600'>
                <CardHeader>
                    <CardTitle>
                        <p className='className="text-2xl font-bold'>{profileData.name}</p>
                    </CardTitle>
                    <CardDescription >{profileData.email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileData;
