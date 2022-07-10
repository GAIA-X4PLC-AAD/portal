import React, { Component } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { setDescriptorFile } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from "axios";

class ProvideAttributes extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const serviceDescriptor = this.props.serviceDescriptor;
        if (!serviceDescriptor.parsed_descriptor || !serviceDescriptor.file.name) {
            // we have to navigate like this because otherwise we are not in React.useEffects()
            this.setState({}, () => this.props.navigate("/provide/start"));
        }
    }

    clickBack = () => {
        const { id } = this.props.params;
        this.props.navigate("/provide/confirm/" + (parseInt(id) - 1))
    }

    clickNext = () => {
        const { id } = this.props.params;
        
        this.props.navigate("/provide/confirm/" + (parseInt(id) + 1))
    }

    clickSend = () => {
        const formData = new FormData();

        const serviceDescriptor = this.props.serviceDescriptor;

        // Update the formData object 
        formData.append(
            "file",
            serviceDescriptor.file,
            serviceDescriptor.file.name
        );


        axios.post(process.env.REACT_APP_EDGE_API_URI + '/sd-service/services', formData).then((response) => {
            this.props.navigate("/dashboard")
        }, (error) => {
            alert('Failed to validate service descriptor.');
        });
    }
    render() {
        const { id } = this.props.params;
        const descriptor = this.props.serviceDescriptor.parsed_descriptor.results;
        const header = descriptor.map(function (object, i) {
            return <span key={i}>{i}</span>;
        });

        const selectedDescriptor = descriptor[id];

        const body = selectedDescriptor.attributes.map(function (attribute, i) {
            return <tr key={i}><td>{attribute.name}</td><td>{attribute.value}</td></tr>
        })

        let back;
        if (id != 0) {
            back = <button onClick={this.clickBack} >Back</button>
        }

        let next;

        if (id == descriptor.length - 1) {
            next = <button onClick={this.clickSend}>Send</button>
        } else {
            next = <button onClick={this.clickNext}>Next</button>
        }

        return <div>
            {header}
            <table>
                <thead>
                    <tr><td>SD-Attribute</td><td>Placeholder</td></tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>

            {back} {next}
        </div>
    }
}

ProvideAttributes.propTypes = {
    navigate: PropTypes.func,
    params: PropTypes.any,
    serviceDescriptor: PropTypes.any
}

const mapStateToProps = state => {
    return { serviceDescriptor: state.serviceDescriptor };
};

const Wrap = (props) => {
    const navigate = useNavigate();
    return <ProvideAttributes {...props} navigate={navigate} params={useParams()} />
}
export default connect(mapStateToProps, {})(Wrap);