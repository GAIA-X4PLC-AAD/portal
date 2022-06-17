import React from "react";
import { BodySmallBoldText, BodySmallText, CaptionText, Column, Style } from "../../../common/styles";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import { DetailsContainer, ElementGroup } from "../style";

const AdminProviderDetails = ({id}) => {

// TODO: change to right API call
const URL = 'https://reqres.in/api/products/3';
const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quam integer amet ultricies vel amet quam hendrerit. Massa feugiat facilisi eu eget. Senectus erat non et magna vitae facilisi purus. 

Euismod ipsum, in molestie sit at mi. Curabitur praesent dignissim tortor odio vel, dolor diam urna feugiat. `

const fakeData = {id:"2", participant_name: "Participant Name 1", registration_type:"Registration type",location:"New York",organization_name:"Organization Name", organization_address:"organization_address",self_description_attribute:lorem, organization_phonenumber: "+49 123 456 789"};

    const successView = ({data}) => {
        const provider = fakeData;
        return (
                <DetailsContainer>

                <Column>
                    <ElementGroup>
                        <CaptionText>user name</CaptionText>
                        <BodySmallText>{provider.organization_name}</BodySmallText>
                    </ElementGroup>
                    <ElementGroup>
                        <CaptionText>Organization address</CaptionText>
                        <BodySmallText>{provider.organization_address}</BodySmallText>
                    </ElementGroup>
                    <ElementGroup>
                        <CaptionText>Organization phone number</CaptionText>
                        <BodySmallText>{provider.organization_phonenumber}</BodySmallText>
                    </ElementGroup>
                    <ElementGroup>
                        <CaptionText>Selft description attribute</CaptionText>
                        <BodySmallText>{provider.self_description_attribute}</BodySmallText>
                    </ElementGroup>
                </Column>
                </DetailsContainer>
        );

    }

    return (
        <LoadingView url={URL} successView={successView}/>);

}

AdminProviderDetails.propTypes = {
    id: PropTypes.string
}

export default AdminProviderDetails;