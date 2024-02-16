import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { setDescriptorFile } from '../../actions/index.js';
import PropTypes from 'prop-types';
import "./Provide.css"
import { HeaderTitle, BodyText, BodySmallBoldText, BlueButton, BlueUploadLabel, CancelButton } from "../../common/styles.js";
import { toTypeLabel } from "./ProvideUtil.js"

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
        formData.append("descriptor_type", this.props.params.type);

        axios.post(process.env.REACT_APP_EDGE_API_URI + '/sd-service/convert', formData).then((response) => {
            this.props.setDescriptorFile(this.state.file, response.data)
            this.props.navigate("/provide/" + this.props.params.type + "/confirm/0")
        }, (error) => {
            alert('Failed to validate service descriptor.');
        });
    }

    render() {
        const type = this.props.params.type;

        const mode = this.props.params.mode;
        let back;

        if (mode != "edit") {
            back = <NavLink to="/provide/start"> <CancelButton >Back</CancelButton></NavLink>
        }

        return (
            <div>
                <div className="provide-header-description">
                    <HeaderTitle>Provide Service</HeaderTitle>
                    <BodyText>Provide {toTypeLabel(type)}</BodyText>
                </div>
                <div className="provide-upload">
                    <BodyText>Please upload your {toTypeLabel(type)} self description</BodyText>
                    <BlueUploadLabel><input className="hidden" type="file" name="file" onChange={this.changeHandler} />Upload</BlueUploadLabel>
                    <BodySmallBoldText className="provide-upload-file"> {this.state.file.name}</BodySmallBoldText>
                    <div className="provide-button-area">
                        {back}
                        <BlueButton disabled={this.state.file.name == null} onClick={this.handleSubmission}>Submit</BlueButton>
                    </div>
                </div>
            </div>
        );
    }

}

ProvideOverview.propTypes = {
    setDescriptorFile: PropTypes.func,
    navigate: PropTypes.func,
    params: PropTypes.any,
    search: PropTypes.any,
    file: PropTypes.any
}

const mapStateToProps = state => {
    return { file: state.serviceDescriptor.file };
};

const Wrap = (props) => {
    const navigate = useNavigate();
    return <ProvideOverview {...props} navigate={navigate} params={useParams()} />
}
export default connect(mapStateToProps, { setDescriptorFile })(Wrap);