/*
 * Custom RPC for Revenge
 * JS-only plugin.
 *
 * Change APPLICATION_ID and the text below to your Discord Developer
 * Application values. This plugin uses Revenge's local activity dispatcher;
 * it does not use Node.js, Python, discord-rpc, or desktop IPC.
 */

import { FluxDispatcher } from "@metro/common";

const CONFIG = {
    applicationId: "YOUR_APPLICATION_ID",
    name: "Minecraft",
    details: "Playing Minecraft",
    state: "Fabric 1.21.11",
    largeImage: "minecraft",
    largeText: "Minecraft",
    smallImage: "online",
    smallText: "Online",
    showTimestamp: true,
};

let startedAt = Date.now();

function makeActivity() {
    const activity = {
        application_id: CONFIG.applicationId,
        name: CONFIG.name,
        details: CONFIG.details,
        state: CONFIG.state,
        assets: {
            large_image: CONFIG.largeImage,
            large_text: CONFIG.largeText,
            small_image: CONFIG.smallImage,
            small_text: CONFIG.smallText,
        },
        type: 0,
        flags: 1,
    };

    if (CONFIG.showTimestamp) {
        activity.timestamps = {
            start: Math.floor(startedAt / 1000),
        };
    }

    return activity;
}

function setActivity(activity) {
    FluxDispatcher.dispatch({
        type: "LOCAL_ACTIVITY_UPDATE",
        activity,
        socketId: "CustomRPC",
    });
}

export default {
    onLoad() {
        startedAt = Date.now();

        // Do not send anything until a real Discord Application ID is set.
        if (!CONFIG.applicationId || CONFIG.applicationId === "YOUR_APPLICATION_ID") {
            console.warn("[Custom RPC] Set a real Discord Application ID in index.js.");
            return;
        }

        setActivity(makeActivity());
        console.log("[Custom RPC] Rich Presence enabled.");
    },

    onUnload() {
        setActivity(null);
        console.log("[Custom RPC] Rich Presence cleared.");
    },
};
