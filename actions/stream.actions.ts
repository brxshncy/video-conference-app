"use server";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET;

export const tokenProdiver = async () => {
    const user = await currentUser();

    if (!user) throw new Error("User is not logged in.");
    if (!apiKey) throw new Error("No API Key");
    if (!apiSecret) throw new Error("No API Secret");

    const streamClient = new StreamClient(apiKey, apiSecret);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(Date.now()) / 1000 - 60;

    const token = streamClient.createToken(user?.id, exp, issued);

    return token;
};