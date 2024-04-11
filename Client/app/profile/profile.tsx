import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type ProfileDataProps = {
    profileData: {
        id: number;
        name: string;
        email: string;
        last_updated: string;
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
    };
};

const ProfileData: React.FC<ProfileDataProps> = ({ profileData }) => {
    const avgCodeAccuracyToday = (profileData.total_code_accuracy_today / profileData.code_tests_today).toFixed(2);
    const avgCodeSpeedToday = (profileData.total_code_wpm_today / profileData.code_tests_today).toFixed(2);
    const avgTextAccuracyToday = (profileData.total_text_accuracy_today / profileData.text_tests_today).toFixed(2);
    const avgTextSpeedToday = (profileData.total_text_wpm_today / profileData.text_tests_today).toFixed(2);
    const avgCodeAccuracy = (profileData.total_code_accuracy_today / profileData.code_total_tests).toFixed(2);
    const avgCodeSpeed = (profileData.total_code_wpm_today / profileData.code_total_tests).toFixed(2);
    const avgTextAccuracy = (profileData.total_text_accuracy_today / profileData.text_total_tests).toFixed(2);
    const avgTextSpeed = (profileData.total_text_wpm_today / profileData.text_total_tests).toFixed(2);
    
    return (
        <div className='py-4 px-4 lg:px-20 flex flex-col items-center'>
            <Card className='w-full bg-background shadow-none border border-zinc-700'>
                <CardHeader>
                    <CardTitle>
                        <p className='className="text-2xl font-bold'>{profileData.name}</p>
                    </CardTitle>
                    <CardDescription >{profileData.email}</CardDescription>
                </CardHeader>
                <CardContent>
                    <h1 className='text-2xl font-bold p-1'>Today</h1>
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-5'>
                        <Card className='bg-background  shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>+{profileData.code_tests_today != null ? profileData.code_tests_today : 'NaN'}</p>
                                </CardTitle>
                                <CardDescription >Total code tests taken</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className='bg-background  shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>+{profileData.text_tests_today != null ? profileData.text_tests_today : 'NaN' }</p>
                                </CardTitle>
                                <CardDescription >Total text tests taken</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{profileData.highest_text_wpm_today != null ? profileData.highest_text_wpm_today : 'NaN' }</p>
                                </CardTitle>
                                <CardDescription >Highest text speed</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{profileData.highest_text_accuracy_today  !== null ? profileData.highest_text_accuracy_today : 'NaN'}</p>
                                </CardTitle>
                                <CardDescription >Highest text accuracy</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{profileData.highest_code_accuracy_today !== null ? profileData.highest_code_accuracy_today : 'NaN'}</p>
                                </CardTitle>
                                <CardDescription >Highest code accuracy</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{avgCodeAccuracyToday}</p>
                                </CardTitle>
                                <CardDescription >Avg code accuracy</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{avgCodeSpeedToday}</p>
                                </CardTitle>
                                <CardDescription >Avg code speed</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{avgTextSpeedToday}</p>
                                </CardTitle>
                                <CardDescription >Avg text speed</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{avgTextAccuracyToday}</p>
                                </CardTitle>
                                <CardDescription >Avg text accuracy</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
{/* --------------------------------------------------------------------------- */}
                    <h1 className='text-2xl font-bold p-1 mt-4'>All Time Statistics</h1>
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-5'>
                        <Card className='bg-background  shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>+{profileData.code_total_tests != null? profileData.code_total_tests : 'NaN'}</p>
                                </CardTitle>
                                <CardDescription >Total code tests taken</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className='bg-background  shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>+{profileData.text_total_tests !== null ? profileData.text_total_tests : 'NaN'}</p>
                                </CardTitle>
                                <CardDescription >Total text tests taken</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{profileData.highest_text_wpm_ever !== null? profileData.highest_code_wpm_ever : 'NaN'}</p>
                                </CardTitle>
                                <CardDescription >Highest text speed</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{avgCodeAccuracy}</p>
                                </CardTitle>
                                <CardDescription >Avg code accuracy</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{avgCodeSpeed}</p>
                                </CardTitle>
                                <CardDescription >Avg code speed</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{avgTextSpeed}</p>
                                </CardTitle>
                                <CardDescription >Avg text speed</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className=' bg-background shadow-none border border-zinc-600'>
                            <CardHeader>
                                <CardTitle>
                                    <p>{avgTextAccuracy}</p>
                                </CardTitle>
                                <CardDescription >Avg text accuracy</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileData;
                  {/* <CardContent>                    
                                <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                                </p>
                            </CardContent> */}