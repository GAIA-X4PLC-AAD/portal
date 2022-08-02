import React, { Component } from 'react';

import PropTypes from 'prop-types';

class AuthPolling extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authstatus: "UNKNOWN",
            isLoading: false,
            onAuthZSuccess: props.onAuthZSuccess,
            onAuthZFailed: props.onAuthZFailed,
            onAuthZWait: props.onAuthZWait,
            timerId: setInterval(() => this.fetchData(), 2000),
            continuePollingOnFailure: props.continuePollingOnFailure || false,
        }
        this.statusURL = props.statusURL
    }

    async fetchData() {
        console.log("fetchData");
        this.setState({ isLoading: true });

        const data = {"status":"SUCCESS","access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJobHp6TTB2bUdQZXpob1M2Y0EzenNSdTg0RFNxcUt5czV0YldSWVJZZXp3In0.eyJleHAiOjE2NTk0NTI4MTQsImlhdCI6MTY1OTQ1MjUxNCwianRpIjoiOTI5NWM2ZmYtMWE3Ny00NmVkLTlhYmItMTk1M2Q2ODI4NzBlIiwiaXNzIjoiaHR0cDovLzUyLjE1Ny4xOTUuMjA5L3JlYWxtcy9nYWlheF9yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlNzNlMTBiNy1mYzM3LTQ5YzctODQ0MC00Y2ZjZGFlNGY5MTQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnYWlheF9jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNGM4YTYxNjktZDU0NC00YjQ1LTgwYjQtOGNlOTg3ZTUwNzI4IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJnYWlheC1mciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWdhaWF4X3JlYWxtIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNGM4YTYxNjktZDU0NC00YjQ1LTgwYjQtOGNlOTg3ZTUwNzI4IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiRmVybmFuZG8gUmVnYXRvIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZ2FpYXgtZnIiLCJnaXZlbl9uYW1lIjoiRmVybmFuZG8iLCJmYW1pbHlfbmFtZSI6IlJlZ2F0byIsImVtYWlsIjoiZmVybmFuZG8ucmVnYXRvQGV4YW1wbGUuY29tIn0.TswAs0qrqAH9dZs0RgHTBkRLzNUSt8sAGPhk7HuXLDuzHbdeNxD0wToL4yARH7kGHQkEGsMdSJma0NunmA6cPydSL-vsjtSthk1HCXWUbPCjLhX6GsJuHrH1bspCyrzMhajiXo75pzbIhva8iRDO21gu79ArSCZfDAF2BWKBDHuq53KcAWPzLqCzBNJAtCzkjrN4FY8YcrnLpKCmYgSE1dcaT6e8i8aJNzpRkyHuq491VrwBlGQefY-AEj4_0m4NKICgJK_pxV9SYgwgVI_T0UMeklYNns1_Ubmt9XCGtXf0qMzI9ZSDu_7F_E3daD6l5QJOmBG2r04ABNs8Lq7RVw"}
        switch (data.status) {
            case 'WAIT':
                this.state.onAuthZWait();
                break;
            case 'SUCCESS':
                this.state.onAuthZSuccess(data);
                this.doCleanup();
                break;
            case 'FAIL':
                if (!this.state.continuePollingOnFailure) this.doCleanup();
                this.state.onAuthZFailed();
                break;
            default:
                this.doCleanup();
                throw "Incorrect AuthZ status: " + data
        }

        this.setState({ isLoading: false });
    }

    doCleanup() {
        console.log("doCleanup, this.state.timerId: ", this.state.timerId);
        clearInterval(this.state.timerId);
        // this.setState({timerId: null});
    }

    async componentDidMount() {
        console.log("componentDidMount")
        // this.state.onAuthZSuccess();
        // console.debug("before fetchData");
        // await this.fetchData();
        // console.debug("after fetchData");

        // const timerId = setInterval(() => this.fetchData(), 2000);
        // console.log("componentDidMount, timerId: ", timerId);
        // this.setState({timerId:timerId});
        // console.log("componentDidMount, this.state.timerId: ", this.state.timerId);
    }


    componentWillUnmount() {
        console.log("In componentWillUnmount");
        // this.doCleanup();
    }

    render() {
        return null;
    }
}

AuthPolling.propTypes = {
    onAuthZSuccess: PropTypes.func,
    onAuthZFailed: PropTypes.func,
    onAuthZWait: PropTypes.func,
    statusURL: PropTypes.string,
    t: PropTypes.func,
    continuePollingOnFailure: PropTypes.bool
}

export default AuthPolling;