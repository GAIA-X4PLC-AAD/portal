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
timerId: null
}


}


async fetchData() {
const data = 'WAIT';


switch (data) {
case 'WAIT':
this.state.onAuthZWait();
break;
case 'SUCCESS':
this.state.onAuthZSuccess();
break;
case 'FAIL':
this.state.onAuthZFailed();
break;
default:
throw "Incorrect AuthZ status: " + data
}



this.setState({ authstatus: data, isLoading: false });
}


async componentDidMount() {
await this.fetchData();
let timerId = setInterval(() => this.fetchData(), 1000);
this.setState({timerId:timerId});
}



componentWillUnmount() {
console.log(this.state.timerId);
clearInterval(this.state.timerId);
}


render() {
return null;
}
}


export default AuthPolling;