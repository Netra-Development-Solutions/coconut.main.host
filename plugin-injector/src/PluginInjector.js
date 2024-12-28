import React, { Suspense } from "react";
import pluginRegistry from "data_management/pluginRegistry";

class PluginInjector extends React.Component {
    renderPlugin(pluginName) {
        const PluginComponent = pluginRegistry.getPlugin(pluginName);

        if (!PluginComponent) {
            return <div>Plugin "{pluginName}" is not available.</div>;
        }

        return (
            <Suspense fallback={<div>Loading plugin...</div>}>
                <PluginComponent {...this.props.pluginProps}>
                    {this.props.children}
                </PluginComponent>
            </Suspense>
        );
    }

    render() {
        const { pluginName } = this.props;

        if (!pluginName) {
            return <div>No plugin specified.</div>;
        }

        return this.renderPlugin(pluginName);
    }
}

export default PluginInjector;
