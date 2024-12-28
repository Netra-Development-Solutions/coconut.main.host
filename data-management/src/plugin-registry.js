const pluginRegistry = {
    plugins: {},

    register(pluginName, pluginComponent) {
        if (!pluginName || !pluginComponent) {
            console.error("Invalid plugin registration.");
            return;
        }
        this.plugins[pluginName] = pluginComponent;
    },

    unregister(pluginName) {
        delete this.plugins[pluginName];
    },

    getPlugin(pluginName) {
        return this.plugins[pluginName];
    },
};

export default pluginRegistry;
