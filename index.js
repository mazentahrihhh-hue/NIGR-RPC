import { logger } from "@vendetta";

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
    try {
        window?.vendetta?.metro?.common?.FluxDispatcher?.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            activity,
            socketId: "CustomRPC",
        });
    } catch (error) {
        logger.error(`[Custom RPC] Failed to set activity: ${error}`);
    }
}

export default {
    onLoad() {
        startedAt = Date.now();

        if (
            !CONFIG.applicationId ||
            CONFIG.applicationId === "YOUR_APPLICATION_ID"
        ) {
            logger.error(
                "[Custom RPC] Set your Discord Application ID in index.js"
            );
            return;
        }

        setActivity(makeActivity());

        logger.log("[Custom RPC] Rich Presence enabled.");
    },

    onUnload() {
        setActivity(null);

        logger.log("[Custom RPC] Rich Presence cleared.");
    },
};
