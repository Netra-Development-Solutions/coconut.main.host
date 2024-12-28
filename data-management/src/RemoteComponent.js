import React from "react";
import DataManagementClass from "@coconut-packages/data-management";
import pluginRegistry from "./plugin-registry";

export default class RemoteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.DataManagementService = new DataManagementClass();
    }
    
    render() {
        return <div>{JSON.stringify(this.state)}</div>;
    }
}