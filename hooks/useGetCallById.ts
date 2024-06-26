import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const useGetCallById = (callId: string | string[]) => {
    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState<boolean>(true);
    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client) return;

        const loadCall = async () => {
            const { calls } = await client.queryCalls({
                filter_conditions: {
                    id:callId,
                },
            });
            if (calls.length > 0) setCall(calls[0]);
            setIsCallLoading(false);
        };

        loadCall();
    }, [client, callId]);

    return {
        call,
        isCallLoading,
    };
};

export default useGetCallById;
