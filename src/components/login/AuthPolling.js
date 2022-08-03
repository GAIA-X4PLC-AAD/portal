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
        this.setState({ isLoading: true });
        const response = await fetch(this.statusURL);
        const data = await response.json();

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
        clearInterval(this.state.timerId);
        this.setState({timerId: null});
    }

    async componentDidMount() {
    }


    componentWillUnmount() {
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