import React from "react";
import DataManagementClass from "data-management";

export default class RemoteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.DataManagementService = new DataManagementClass({
            data: {
                name: "John Doe",
                email: ""
            }
        });
    }
    
    componentDidMount() {
        this.setState({ data: this.DataManagementService.getState() });
    }

    
    render() {
        console.log(this.state)
        return <div>{JSON.stringify(this.state)}</div>;
    }
}
