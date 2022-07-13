import React, { Component } from "react";
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { withTranslation } from "react-i18next";
import { Navigate, useNavigate } from 'react-router-dom';
import { setDescriptorFile } from '../../actions';
import PropTypes from 'prop-types';
import "./Provide.css"
import { HeaderTitle, BodySmallText, BodySmallBoldText, BlueButton, BlueLabel, CancelButton } from "../../common/styles";

class ProvideOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: props.file
        };
    }

    changeHandler = (event) => {
        var file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = (e) => {
            let myString = e.target.result;
            this.setState({ file: { content: myString, name: file.name } })
        }
        reader.readAsText(file);

    }

    handleSubmission = () => {
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "file",
            new Blob([this.state.file.content], {
                type: 'text/json'
            }),
            this.state.file.name
        );
        formData.append("descriptor_type", "service");

        axios.post(process.env.REACT_APP_EDGE_API_URI + '/sd-service/convert', formData).then((response) => {
            this.props.setDescriptorFile(this.state.file, response.data)
            this.props.navigate("/provide/confirm/0")
        }, (error) => {
            alert('Failed to validate service descriptor.');
        });
    }

    render() {
        return (
            <div>
                <div className="provide-header-description">
                    <HeaderTitle>Provide Service</HeaderTitle>
                    <BodySmallText>Provide Service/Data/Node</BodySmallText>
                </div>
                <div className="provide-upload">
                    <BodySmallBoldText>Please upload your Service/Data/Node self description</BodySmallBoldText>
                    <BlueLabel><input className="hidden" type="file" name="file" onChange={this.changeHandler} />Upload</BlueLabel>
                    <BodySmallBoldText className="provide-upload-file"> {this.state.file.name}</BodySmallBoldText>
                    <div className="provide-button-area">
                        <CancelButton>Back</CancelButton>
                        <BlueButton disabled={this.state.file == null} onClick={this.handleSubmission}>Submit</BlueButton>
                    </div>
                </div>
            </div>
        );
    }

}

ProvideOverview.propTypes = {
    setDescriptorFile: PropTypes.func,
    navigate: PropTypes.func,
    file: PropTypes.any
}

const mapStateToProps = state => {
    return { file: state.serviceDescriptor.file };
};

const Wrap = (props) => {
    const navigate = useNavigate();
    return <ProvideOverview {...props} navigate={navigate} />
}
export default connect(mapStateToProps, { setDescriptorFile })(Wrap);