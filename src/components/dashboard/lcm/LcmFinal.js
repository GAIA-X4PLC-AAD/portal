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

        console.log("asd");

        const { id } = this.props.params;
        const idFromState = this.state.id;
        if (id != idFromState) {
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
            axios.post(process.env.REACT_APP_EDGE_API_URI + "/lcm-service/service/configuration", request).then((response) => {
                this.setState({ services: response.data.services, id: id })
            }, (error) => {
                //  alert('Failed to load services.');
            });
        }

    }

    submitLcm = () => {
        this.props.navigate("/dashboard");
        this.props.resetLcmServices();
    }

    downloadTemplate = () => {

    }

    configurationUpload = (event) => {

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