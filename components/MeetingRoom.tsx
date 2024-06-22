
import { cn } from "@/lib/utils";
import { SpeakerLayout, PaginatedGridLayout, CallParticipantsList, CallControls } from "@stream-io/video-react-sdk";
import React, {useState} from "react";

type CallOutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {

    const [layout, setLayout] = useState<CallOutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState<boolean>(true)

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                    return <PaginatedGridLayout />
            case 'speaker-right':
                    return <SpeakerLayout participantsBarPosition={"left"} />
            case 'speaker-left':
                    return <SpeakerLayout participantsBarPosition={"right"} />
            default:
                return <PaginatedGridLayout />
        }
    }
    return <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px]">
                    <CallLayout />
                </div>
                <div className={cn("h-[calc(100vh-86px)] hidden ml-2", {'show-block': showParticipants})}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)}/>
                </div>
            </div>
            <div className="fixed bottom-0 flex w-full items-center gap-5 justify-center" >
                <CallControls />
            </div>
    </section>;
};

export default MeetingRoom;
