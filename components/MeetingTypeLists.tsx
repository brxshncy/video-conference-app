"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./shared/MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

enum MEETING {
    IS_SCHEDULED = "isScheduleMeeting",
    IS_JOINING = "isJoiningMeeting",
    IS_INSTANT = "isInstantMeeting",
}
const MeetingTypeLists = () => {
    const router = useRouter();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [meetingState, setMeetingState] = useState<
        | MEETING.IS_SCHEDULED
        | MEETING.IS_JOINING
        | MEETING.IS_INSTANT
        | undefined
    >();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    });

    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();

    const homecardConfig = [
        {
            iconSrc: "/icons/add-meeting.svg",
            title: "New Meeting",
            description: "Start an instant meeting",
            handleClick: () => {
                setMeetingState(MEETING.IS_INSTANT);
            },
            className: "bg-orange-1",
        },
        {
            iconSrc: "/icons/schedule.svg",
            title: "Schedule Meeting",
            description: "Plan your meeting",
            handleClick: () => {
                setMeetingState(MEETING.IS_SCHEDULED);
            },
            className: "bg-blue-1",
        },
        {
            iconSrc: "/icons/recordings.svg",
            title: "View Recordings",
            description: "Check out your recordings",
            handleClick: () => {
                router.push("/recordings");
            },
            className: "bg-purple-1",
        },
        {
            iconSrc: "/icons/add-meeting.svg",
            title: "New Meeting",
            description: "Start an instant meeting",
            handleClick: () => {
                console.log("test");
            },
            className: "bg-yellow-1",
        },
    ];

    const createMeeting = async () => {
        if (!user || !client) return;
        try {
            if (!values.dateTime) {
                toast({
                    title: "Please select a date and a time",
                });
                return;
            }
            const id = crypto.randomUUID();
            console.log("client", client);
            const call = client.call("default", id);

            if (!call) {
                throw new Error("Failed to create call");
            }

            const startsAt =
                values.dateTime.toISOString() || new Date().toISOString();
            const description = values.description || "Instant meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });
            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast({
                title: "Meeting created",
            });
        } catch (error) {
            toast({
                title: "Failed to create a meeting",
            });
        }
    };

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            {homecardConfig.map((config, index) => {
                return (
                    <HomeCard
                        iconSrc={config.iconSrc}
                        title={config.title}
                        description={config.description}
                        handleClick={config.handleClick}
                        className={config.className}
                        key={index}
                    />
                );
            })}

            <MeetingModal
                isOpen={meetingState === MEETING.IS_INSTANT}
                onClick={() => setMeetingState(undefined)}
                onClose={() => setMeetingState(undefined)}
                title={"Start an Instant Meeting"}
                className='text-center'
                buttonText='Start and Instant Meeting'
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeLists;
