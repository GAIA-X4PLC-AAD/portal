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
            timerId: null,
        }
        this.statusURL = props.statusURL
    }

    async fetchData() {
        this.setState({ isLoading: true });
        const response = await fetch(this.statusURL);
        const data = await response.json();

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
        clearInterval(this.state.timerId);
    }

    async componentDidMount() {
        this.state.onAuthZSuccess();
        // await this.fetchData();
        // let timerId = setInterval(() => this.fetchData(), 2000);
        // this.setState({timerId:timerId});
    }


    componentWillUnmount() {
        this.doCleanup();
    }

    render() {
        return null;
    }
}

export default AuthPolling;