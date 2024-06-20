"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./shared/MeetingModal";

enum MEETING {
    IS_SCHEDULED = "isScheduleMeeting",
    IS_JOINING = "isJoiningMeeting",
    IS_INSTANT = "isInstantMeeting",
}
const MeetingTypeLists = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<
        | MEETING.IS_SCHEDULED
        | MEETING.IS_JOINING
        | MEETING.IS_INSTANT
        | undefined
    >();

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

    const createMeeting = () => {};
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            {homecardConfig.map((config) => {
                return (
                    <HomeCard
                        iconSrc={config.iconSrc}
                        title={config.title}
                        description={config.description}
                        handleClick={config.handleClick}
                        className={config.className}
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
