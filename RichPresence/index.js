(() => {
    const { logger } = vendetta;

    return {
        onLoad() {
            logger.log("[NIGR RPC] Plugin loaded successfully!");
        },

        onUnload() {
            logger.log("[NIGR RPC] Plugin unloaded.");
        }
    };
})()
