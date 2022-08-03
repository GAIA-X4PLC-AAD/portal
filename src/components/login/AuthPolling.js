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
        const response = await fetch(this.statusURL);
        const data = await response.json();
        console.log("in fetchData, data: ", data)

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
        this.setState({timerId: null});
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
        this.doCleanup();
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