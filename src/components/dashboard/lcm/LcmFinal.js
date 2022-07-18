import React, { Component } from "react";
import { useParams, NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { lcmServicesLoaded, resetLcmServices, selectLcmService } from "../../../actions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from "../../../common/tabs/tab";
import "./lcm.css"
import { HeaderTitle, BodyText, BlueButton, CancelButton, BlueTextClickable, BlueUploadLabel, BodySmallBoldText, TextInput } from "../../../common/styles";

class LcmFinal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            id: null
        }

        const { id } = this.props.params;
        const idFromState = this.state.id;
        if (id != idFromState) {
            const request = this._getServicesRequest();
            axios.post(process.env.REACT_APP_EDGE_API_URI + "/lcm-service/service/configuration", request).then((response) => {
                this.setState({ services: response.data.services, id: id })
            }, (error) => {
                alert('Failed to load services.');
            });
        }

    }

    submitLcm = () => {
        this.props.navigate("/dashboard");
        this.props.resetLcmServices();
    }

    downloadTemplate = () => {
        const request = this._getServicesRequest();

        axios.post(process.env.REACT_APP_EDGE_API_URI + "/lcm-service/service/configuration", request).then((response) => {
            const blob = new Blob([JSON.stringify(response.data)], {
                type: 'text/json'
            })

            const url = window.URL.createObjectURL(
                blob,
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `template.json`,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
        }, (error) => {
            alert('Failed to load services.');
        });
    }

    configurationUpload = (event) => {
        var file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = (e) => {
            let myString = e.target.result;
            const formData = new FormData();

            // Update the formData object 
            formData.append(
                "file",
                new Blob([myString], {
                    type: 'text/json'
                }),
                file.name
            );
    
            axios.post(process.env.REACT_APP_EDGE_API_URI + '/lcm-service/configuration', formData).then((response) => {
                // TODO what to do here?
            }, (error) => {
                alert('Failed to validate service descriptor.');
            });
        }
        reader.readAsText(file);
    }

    render() {
        const { id } = this.props.params;
        const idFromState = this.props.lcm.id;

        if (idFromState && id != idFromState) {
            this.props.resetLcmServices();
            return <Navigate to={"/lcm/" + id} />
        }
        const header = this.props.lcm.services.map(function (object, i) {
            return <Tab key={i} index={i} currentIndex={-1} />
        });
        const fields = this.state.services.map((service, i) => {
            const inputs = service.fields.map((field, i) => {
                return <div key={i}><label htmlFor={service.serviceName + field.id}>{field.label}</label><TextInput id={service.serviceName + field.id} placeholder={"Enter " + field.label} /> </div>
            })
            return <div key={i}>
                <BodySmallBoldText>{service.name}</BodySmallBoldText>
                {inputs}
            </div>
        });

        return <div>
            <div className="lcm-header-description">
                <HeaderTitle>LCM</HeaderTitle>
                <BodyText>Provide deployment settings </BodyText>
            </div>
            <div className="lcm-header">
                {header}<Tab index={this.props.lcm.services.length} currentIndex={this.props.lcm.services.length} />
            </div>
            <div className="lcm-link-bar">
                <BlueUploadLabel id="lcm-upload"><input className="hidden" type="file" name="file" onChange={this.configurationUpload} />Upload Configuration</BlueUploadLabel>
                <BlueTextClickable onClick={this.downloadTemplate}>Download Template</BlueTextClickable>
            </div>

            <div className="lcm-service-description">
                <BodyText >You can download template and upload configuration or complete form manually.</BodyText>
                {fields}
            </div>
            <div className="provide-button-area">
                <NavLink to={"/lcm/" + id + "/" + (this.props.lcm.services.length - 1)}><CancelButton>Back</CancelButton></NavLink>
                <BlueButton onClick={this.submitLcm}>Send</BlueButton>
            </div>
        </div>
    }

    _getServicesRequest() {
        const request = {
            "services": [
            ]
        }

        this.props.lcm.services.forEach((service) => {
            service.applicableLcm.forEach((lcm) => {
                if (lcm.selected) {
                    request.services.push({ lcmServiceId: lcm.id, serviceId: service.serviceName })
                }
            });
        });
        return request;
    }
}

LcmFinal.propTypes = {
    params: PropTypes.any,
    lcm: PropTypes.any,
    resetLcmServices: PropTypes.func,
    navigate: PropTypes.func
}

const mapStateToProps = state => {
    return { lcm: state.lcm };
};

const Wrap = (props) => {
    const navigate = useNavigate();
    return <LcmFinal {...props} params={useParams()} navigate={navigate} />
}

export default connect(mapStateToProps, { resetLcmServices })(Wrap);