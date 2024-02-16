import React, { Component } from "react";
import { useParams, NavLink, Navigate } from 'react-router-dom';
import axios from "axios";
import { lcmServicesLoaded, resetLcmServices, selectLcmService } from "../../../actions/index.js";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from "../../../common/tabs/tab.js";
import "./lcm.css"
import { HeaderTitle, BodyText, BlueButton, CancelButton, RedText } from "../../../common/styles.js";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

class LcmServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedService: null,
            currentIndex: -1
        }

        const { id } = this.props.params;
        const idFromState = this.props.lcm.id;
        if (id != idFromState) {
            axios.get(process.env.REACT_APP_EDGE_API_URI + "/lcm-service/service/overview?serviceId=" + id).then((response) => {
                this.props.lcmServicesLoaded(id, response.data.services);
            }, (error) => {
                alert('Failed to load services.');
            });
        }

    }

    onChangeValue = (event) => {
        const { index } = this.props.params;
        this.setState({ selectedService: event.target.value, currentIndex: index })

        const selectedService = this.props.lcm.services[index || 0]
        this.props.selectLcmService(selectedService.serviceId, event.target.value)
    }

    render() {
        const { id, index } = this.props.params;
        const idFromState = this.props.lcm.id;

        if (idFromState && id != idFromState) {
            this.props.resetLcmServices();
            return <Navigate to={"/lcm/" + id} />
        }
        const header = this.props.lcm.services.map(function (object, i) {
            return <Tab key={i} index={i} currentIndex={parseInt(index || 0)} />
        });

        const selectedService = this.props.lcm.services[index || 0] || {}
        let anythingSelected = false;
        console.log(selectedService);
        let body;

        if (selectedService.applicableLcm) {
            body = selectedService.applicableLcm.map(function (attribute, i) {
                // verify if any service has been selected already
                anythingSelected = anythingSelected || attribute.selected;
                return <tr key={selectedService.serviceName + i}>
                    <td>
                        <input defaultChecked={attribute.selected} type="radio" name="service" id={selectedService.serviceName + attribute.id} value={attribute.id} />
                    </td>
                    <td>{attribute.name}</td>
                    <td>{attribute.description}</td>
                </tr>
            })

        }

        let back;
        if (index && index != 0) {
            back = <NavLink to={"/lcm/" + id + "/" + (parseInt(index || 0) - 1)}><CancelButton>{t('lcm.back_button')}</CancelButton></NavLink>
        }

        let next;
        if (index == this.props.lcm.services.length - 1) {
            if (this.state.currentIndex != index && !anythingSelected) {
                next = <BlueButton disabled={this.state.currentIndex != index && !anythingSelected}>{t('lcm.next_button')}</BlueButton>
            } else {
                next = <NavLink to={"/lcm/" + id + "/final"}>
                    <BlueButton disabled={this.state.currentIndex != index && !anythingSelected}>{t('lcm.next_button')}</BlueButton>
                </NavLink>
            }

        } else {
            if (this.state.currentIndex != index && !anythingSelected) {
                next = <BlueButton disabled={this.state.currentIndex != index && !anythingSelected}>{t('lcm.next_button')}</BlueButton>
            } else {
                next = <NavLink to={"/lcm/" + id + "/" + (parseInt(index || 0) + 1)}>
                    <BlueButton disabled={this.state.currentIndex != index && !anythingSelected}>{t('lcm.next_button')}</BlueButton>
                </NavLink>
            }
        }

        return <div>
            <div className="lcm-header-description">
                <HeaderTitle>{t('lcm.header')}</HeaderTitle>
                <BodyText>{t('lcm.subtitle')} </BodyText>
            </div>
            <div className="lcm-header">
                {header}<Tab index={this.props.lcm.services.length} currentIndex={0} />
            </div>
            <BodyText className="lcm-service-description">{t('lcm.select_service',{service_name: selectedService.serviceName})}</BodyText>
            <table onChange={this.onChangeValue} className="lcm-attribute-table">
                <thead>
                    <tr><td></td><td>{t('lcm.service')}</td><td>{t('lcm.description')}</td></tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
            <div className="provide-button-area">
                {back} {next}
            </div>
        </div>
    }
}

LcmServices.propTypes = {
    params: PropTypes.any,
    lcm: PropTypes.any,
    lcmServicesLoaded: PropTypes.func,
    resetLcmServices: PropTypes.func,
    selectLcmService: PropTypes.func,
    t: PropTypes.func
}

const mapStateToProps = state => {
    return { lcm: state.lcm };
};

const Wrap = withTranslation() ((props) => {
    return <LcmServices {...props} params={useParams()} />
})

export default connect(mapStateToProps, { lcmServicesLoaded, resetLcmServices, selectLcmService })(Wrap);