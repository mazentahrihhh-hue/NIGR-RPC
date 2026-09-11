(() => {
    const { metro, logger } = vendetta;
    const { FluxDispatcher } = metro.common;

    const CONFIG = {
        applicationId: "YOUR_APPLICATION_ID",

        name: "Minecraft",
        details: "Playing Minecraft",
        state: "Fabric 1.21.11",

        largeImage: "minecraft",
        largeText: "Minecraft",

        smallImage: "online",
        smallText: "Online",

        showTimestamp: true
    };

    let startedAt = Date.now();

    function createActivity() {
        const activity = {
            application_id: CONFIG.applicationId,
            name: CONFIG.name,
            details: CONFIG.details,
            state: CONFIG.state,

            assets: {
                large_image: CONFIG.largeImage,
                large_text: CONFIG.largeText,
                small_image: CONFIG.smallImage,
                small_text: CONFIG.smallText
            },

            type: 0,
            flags: 1
        };

        if (CONFIG.showTimestamp) {
            activity.timestamps = {
                start: Math.floor(startedAt / 1000)
            };
        }

        return activity;
    }

    function updateActivity(activity) {
        try {
            FluxDispatcher.dispatch({
                type: "LOCAL_ACTIVITY_UPDATE",
                activity: activity,
                socketId: "NIGR-RPC"
            });
        } catch (error) {
            logger.error("[NIGR RPC] " + error);
        }
    }

    return {
        onLoad() {
            startedAt = Date.now();

            if (
                !CONFIG.applicationId ||
                CONFIG.applicationId === "YOUR_APPLICATION_ID"
            ) {
                logger.warn(
                    "[NIGR RPC] Put your Discord Application ID in CONFIG."
                );
                return;
            }

            updateActivity(createActivity());

            logger.log("[NIGR RPC] Rich Presence enabled.");
        },

        onUnload() {
            updateActivity(null);

            logger.log("[NIGR RPC] Rich Presence disabled.");
        }
    };
})()
