'use client'
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StatCard from './cardComp';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { profile } from 'console';
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type ProfileDataProps = {
    profileData: {
        id: number;
        name: string;
        email: string;
        text_total_tests: number;
        text_tests_today: number;
        total_text_wpm: number;
        total_text_wpm_today: number;
        highest_text_wpm_ever: number;
        highest_text_wpm_today: number;
        total_text_accuracy: number;
        total_text_accuracy_today: number;
        highest_text_accuracy_today: number;
        code_total_tests: number;
        code_tests_today: number;
        total_code_wpm: number;
        total_code_wpm_today: number;
        highest_code_wpm_ever: number;
        highest_code_wpm_today: number;
        total_code_accuracy: number;
        total_code_accuracy_today: number;
        highest_code_accuracy_today: number;
        highest_code_accuracy_ever: number;
    };
};

const ProfileData: React.FC<ProfileDataProps> = ({ profileData }) => {
    // Today fields
    const avgCodeAccuracytoday = (profileData.total_code_accuracy_today / profileData.code_tests_today).toFixed(2);
    const avgCodeSpeedtoday = (profileData.total_code_wpm_today / profileData.code_tests_today).toFixed(2);
    const avgTextAccuracytoday = (profileData.total_text_accuracy_today / profileData.text_tests_today).toFixed(2);
    const avgTextSpeedtoday = (profileData.total_text_wpm_today / profileData.text_tests_today).toFixed(2);
    // All time
    const avgCodeAccuracy = (profileData.total_code_accuracy / profileData.code_total_tests).toFixed(2);
    const avgCodeSpeed = (profileData.total_code_wpm / profileData.code_total_tests).toFixed(2);
    const avgTextAccuracy = (profileData.total_text_accuracy / profileData.text_total_tests).toFixed(2);
    const avgTextSpeed = (profileData.total_text_wpm / profileData.text_total_tests).toFixed(2);

    const data = {
        labels: ['Today', 'All Time'],
        datasets: [
            {
                label: 'Average Code Speed',
                data: [parseFloat(avgCodeSpeedtoday), parseFloat(avgCodeSpeed)],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Average Code Accuracy',
                data: [parseFloat(avgCodeAccuracytoday), parseFloat(avgCodeAccuracy)],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
                label: 'Average Text Speed',
                data: [parseFloat(avgTextSpeedtoday), parseFloat(avgTextSpeed)],
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
            },
            {
                label: 'Average Text Accuracy',
                data: [parseFloat(avgTextAccuracytoday), parseFloat(avgTextAccuracy)],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const options: any = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Profile Data Overview',
            },
        },
    };


    return (
        <div className='flex flex-col items-center border-2 border-primary rounded-lg p-3 gap-4'>
            <div className='flex flex-col items-center mb-10 pb-2 w-full border-b-2 border-zinc-600'>
                <h1 className='text-2xl font-semibold text-start'>{profileData.name} </h1>
                <h2 className='text-muted-foreground text-start'>{profileData.email} </h2>
            </div>
            <Tabs defaultValue="today" className='self-start'>
                <TabsList>
                    <TabsTrigger value='today' className='data-[state=active]:bg-primary data-[state=active]:text-background' >Today</TabsTrigger>
                    <TabsTrigger value='allTime' className='data-[state=active]:bg-primary data-[state=active]:text-background'>All time</TabsTrigger>
                </TabsList>
                <TabsContent value="today">
                    <div className='w-full flex flex-col md:flex-row gap-10'>
                        <div className="border-2 border-zinc-600 p-2 rounded-lg">
                            <h1 className="text-center text-3xl font-bold mb-1">Text</h1>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <StatCard title={'Total tests'} value={`+${profileData.text_tests_today}`} />
                                <StatCard title={'Highest speed'} value={`${profileData.highest_text_wpm_today}`} />
                                <StatCard title={'Highest accuracy'} value={`${profileData.highest_text_accuracy_today}`} />
                                <StatCard title={'Average speed'} value={avgTextSpeedtoday} />
                                <StatCard title={'Average accuracy'} value={avgTextAccuracytoday} />
                            </div>
                        </div>
                        <div className="border-2 border-zinc-600 p-2 rounded-lg">
                            <h1 className="text-center text-3xl font-bold mb-1">Code</h1>
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                <StatCard title={'Total tests'} value={`+${profileData.code_tests_today}`} />
                                <StatCard title={'Highest speed'} value={`${profileData.highest_code_wpm_today}`} />
                                <StatCard title={'Highest accuracy'} value={`${profileData.highest_code_accuracy_today}`} />
                                <StatCard title={'Average speed'} value={avgCodeSpeedtoday} />
                                <StatCard title={'Average accuracy'} value={avgCodeAccuracytoday} />
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="allTime">
                    <div className='w-full flex flex-col md:flex-row gap-10 justify-center items-center'>
                        <div className="border-2 border-zinc-600 p-2 rounded-lg">
                            <h1 className="text-center text-3xl font-bold mb-1">Text</h1>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <StatCard title={'Total tests'} value={`+${profileData.text_total_tests}`} />
                                <StatCard title={'Highest speed'} value={`${profileData.highest_text_wpm_ever}`} />
                                <StatCard title={'Average speed'} value={avgTextSpeed} />
                                <StatCard title={'Average accuracy'} value={avgTextAccuracy} />
                            </div>
                        </div>
                        <div className="border-2 border-zinc-600 p-2 rounded-lg">
                            <h1 className="text-center text-3xl font-bold mb-1">Code</h1>
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                <StatCard title={'Total tests'} value={`+${profileData.code_total_tests}`} />
                                <StatCard title={'Highest speed'} value={`${profileData.highest_code_wpm_ever}`} />
                                <StatCard title={'Highest accuracy'} value={`${profileData.highest_code_accuracy_ever}`} />
                                <StatCard title={'Average accuracy'} value={avgCodeAccuracy} />
                                <StatCard title={'Average speed'} value={avgCodeSpeed} />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            <Bar data={data} options={options} className='mt-10'/>
        </div>
    );
};

export default ProfileData;
