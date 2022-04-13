import React, { Component } from 'react';

class AuthPolling extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authstatus: "UNKNOWN",
            isLoading: false,
            onAuthZSuccess: props.onAuthZSuccess,
            onAuthZFailed: props.onAuthZFailed,
            onAuthZWait: props.onAuthZWait,
        }
    }

    async fetchData() {
        this.setState({ isLoading: true });
        const response = await fetch('http://localhost:8180/api/authstatus');
        const data = await response.json();
        console.log("json::"+JSON.stringify(data));
        switch (data) {
            case 'WAIT':
                this.state.onAuthZWait();
                break;
            case 'SUCCESS':
                this.doCleanup();
                this.state.onAuthZSuccess();
                break;
            case 'FAIL':
                this.doCleanup();
                this.state.onAuthZFailed();
                break;
            default:
                this.doCleanup();
                throw "Incorrect AuthZ status: " + data
        }

        this.setState({ isLoading: false });
    }

    doCleanup() {
        clearInterval(this.timerId);
    }

    async componentDidMount() {
        await this.fetchData();
        this.timerId = setInterval(() => this.fetchData(), 3000);
    }


    componentWillUnmount() {
        this.doCleanup();
    }

    render() {
        return null;
    }
}

export default AuthPolling;