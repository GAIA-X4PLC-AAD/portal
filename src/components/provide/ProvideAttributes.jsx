import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetDescriptorFile } from '../../actions';
import axios from "axios";
import "./Provide.css"
import { HeaderTitle, BodyText, BlueButton, CancelButton, RedText } from "../../common/styles";
import { ToggleSwitch } from "../../common/toggle/ToggleSwitch"
import { toTypeLabel } from "./ProvideUtil"
import {Tab} from "../../common/tabs/tab";

class ProvideAttributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true
        }
    }

    clickBack = () => {
        const { index, type } = this.props.params;
        this.props.navigate("/provide/" + type + "/confirm/" + (parseInt(index) - 1))
    }

    clickNext = () => {
        const { index, type } = this.props.params;

        this.props.navigate("/provide/" + type + "/confirm/" + (parseInt(index) + 1))
    }

    clickSend = () => {
        const { type } = this.props.params;
        const formData = new FormData();

        const serviceDescriptor = this.props.serviceDescriptor;

        // Update the formData object 
        formData.append(
            "file",
            new Blob([serviceDescriptor.file.content], {
                type: 'text/json'
            }),
            serviceDescriptor.file.name
        );


        axios.post(process.env.REACT_APP_EDGE_API_URI + '/sd-service/' + type, formData).then((response) => {
            this.props.navigate("/dashboard")
            this.props.resetDescriptorFile()
        }, (error) => {
            alert('Failed to validate service descriptor.');
        });
    }

    onChange = (event) => {
        this.setState({ checked: !this.state.checked })
    }

    render() {
        // Guard: Check if we have a valid state to be on the attribute page.
        const serviceDescriptor = this.props.serviceDescriptor;
        if (!serviceDescriptor.parsed_descriptor || !serviceDescriptor.file.content) {
            return <Navigate to="/provide/start" />
        }

        const { index, type } = this.props.params;
        const checked = this.state.checked;
        const descriptor = this.props.serviceDescriptor.parsed_descriptor.results;
        const that = this;
        const header = descriptor.map(function (object, i) {
            return <Tab key={i} index={i} currentIndex={index} link={"/provide/"+type+"/confirm/" + i} />
        });

        const selectedDescriptor = descriptor[index];

        const body = selectedDescriptor.attributes.map(function (attribute, i) {
            if ((checked === true && attribute.mandatory) || checked === false) {
                return <tr key={i} className={attribute.mandatory && !attribute.value ? "invalid" : ""} ><td>{attribute.name}</td><td>{attribute.mandatory && !attribute.value ? "Required" : attribute.value}</td></tr>
            }
        })

        let back;
        if (index != 0) {
            back = <CancelButton onClick={this.clickBack} >Back</CancelButton>
        } else {
            back = <NavLink to={"/provide/" + type + "/upload"}><CancelButton>Back</CancelButton></NavLink>
        }

        let info_label;


        let next;
        if (index == descriptor.length - 1) {
            if (!this.props.serviceDescriptor.parsed_descriptor.valid) {
                info_label = <RedText>Service Descriptor is invalid. Please fix descriptor to proceed.</RedText>
            }

            next = <BlueButton disabled={!this.props.serviceDescriptor.parsed_descriptor.valid} onClick={this.clickSend}>Send</BlueButton>
        } else {
            next = <BlueButton onClick={this.clickNext}>Next</BlueButton>
        }

        return <div>
            <div className="provide-header-description">
                <HeaderTitle>Provide Service</HeaderTitle>
                <BodyText>Provide {toTypeLabel(type)}</BodyText>
            </div>

            <div className="provide-header">
                {header}
            </div>
            <ToggleSwitch label="Show only mandatory attributes" onChange={this.onChange} defaultChecked={this.state.checked} />
            <table className="provide-attribute-table">
                <thead>
                    <tr><td>SD-Attribute</td><td>Value</td></tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
            <div className="provide-button-area">
                {back} {next}
                {info_label}
            </div>

        </div>
    }
}

ProvideAttributes.propTypes = {
    navigate: PropTypes.func,
    params: PropTypes.any,
    serviceDescriptor: PropTypes.any,
    resetDescriptorFile: PropTypes.func,
}

const mapStateToProps = state => {
    return { serviceDescriptor: state.serviceDescriptor };
};

const Wrap = (props) => {
    const navigate = useNavigate();
    return <ProvideAttributes {...props} navigate={navigate} params={useParams()} />
}
export default connect(mapStateToProps, { resetDescriptorFile })(Wrap);