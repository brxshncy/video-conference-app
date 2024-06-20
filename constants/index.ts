export const sidebarLinks = [
    {
        imageUrl: "/icons/Home.svg",
        label: "Home",
        route: "/",
    },
    {
        imageUrl: "/icons/upcoming.svg",
        label: "Upcoming",
        route: "/upcoming",
    },
    {
        imageUrl: "/icons/previous.svg",
        label: "Previous",
        route: "/previous",
    },
    {
        imageUrl: "/icons/Video.svg",
        label: "Recordings",
        route: "/recordings",
    },
    {
        imageUrl: "/icons/add-personal.svg",
        label: "Personal Room",
        route: "/personal-room",
    },
];

const now = new Date();

const options = {
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    timeZone: "Asia/Manila" as const,
};
export const currentTime = now.toLocaleTimeString("en-US", options);

export const currentDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
}).format(now);
