"use client";

import { tokenProdiver } from "@/actions/stream.actions";
import Loader from "@/components/shared/Loader";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();

    const initializeClient = async () => {
        if (!user || !isLoaded) return;
        if (!apiKey) throw new Error("Stream API Key missing");

        const token = await tokenProdiver();

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl,
            },
            token,
        });
        setVideoClient(client);
    };

    useEffect(() => {
        initializeClient();
    }, [user, isLoaded, apiKey]);

    if (!videoClient) return <Loader />;

    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
