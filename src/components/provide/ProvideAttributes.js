import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from "axios";
import "./Provide.css"
import { HeaderTitle, BodySmallText, BlueButton, CancelButton, RedText } from "../../common/styles";
import { ToggleSwitch } from "../../common/toggle/ToggleSwitch"
import { Thumbs } from "react-responsive-carousel";

class ProvideAttributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true
        }
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

    onChange = (event) => {
        this.setState({ checked: !this.state.checked })
    }

    render() {

        const { id } = this.props.params;
        const checked = this.state.checked;
        const descriptor = this.props.serviceDescriptor.parsed_descriptor.results;
        const that = this;
        const header = descriptor.map(function (object, i) {
            return <NavLink key={i} to={"/provide/confirm/" + i}><div className="provide-tab"><div className={i == id ? "provide-tab-inside  provide-tab-inside-active" : "provide-tab-inside"}>{i + 2}</div></div></NavLink>;
        });

        const selectedDescriptor = descriptor[id];

        const body = selectedDescriptor.attributes.map(function (attribute, i) {
            if ((checked === true && attribute.mandatory) || checked === false) {
                return <tr key={i} className={attribute.mandatory && !attribute.value ? "invalid" : ""} ><td>{attribute.name}</td><td>{attribute.mandatory && !attribute.value ? "Required" : attribute.value }</td></tr>
            }

        })

        let back;
        if (id != 0) {
            back = <CancelButton onClick={this.clickBack} >Back</CancelButton>
        } else {
            back = <NavLink to="/provide/start"><CancelButton>Back</CancelButton></NavLink>
        }

        let info_label;
       

        let next;
        if (id == descriptor.length - 1) {
            if (!this.props.serviceDescriptor.parsed_descriptor.valid) {
                info_label = <RedText>Service Descriptor is invalid.</RedText>
            }

            next = <BlueButton disabled={!this.props.serviceDescriptor.parsed_descriptor.valid} onClick={this.clickSend}>Send</BlueButton>
        } else {
            next = <BlueButton onClick={this.clickNext}>Next</BlueButton>
        }

        return <div>
            <div className="provide-header-description">
                <HeaderTitle>Provide Service</HeaderTitle>
                <BodySmallText>Provide Service/Data/Node</BodySmallText>
            </div>

            <div className="provide-header">
                <NavLink to="/provide/start"><div className="provide-tab"><div className="provide-tab-inside">1</div></div></NavLink>{header}
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
                {info_label}
                {back} {next}
            </div>

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