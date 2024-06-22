"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import Loader from "@/components/shared/Loader";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
    const { user, isLoaded } = useUser();
    const [isSetUpComplete, setIsSetuComplete] = useState<boolean>(false);
    const { call, isCallLoading } = useGetCallById(params.id);

    if (!isLoaded || isCallLoading) return <Loader />;

    return (
        <main className='h-screen w-full'>
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetUpComplete ? <MeetingSetup setIsSetuComplete={setIsSetuComplete}/> : <MeetingRoom />}
                </StreamTheme>
            </StreamCall>
        </main>
    );
};

export default Meeting;
