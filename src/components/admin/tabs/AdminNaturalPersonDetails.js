import React from "react";
import { BodySmallBoldText, BodySmallText, CaptionText, Column, Style } from "../../../common/styles";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import { DetailsContainer, ElementGroup } from "../style";

const AdminNaturalPersonDetails = ({id}) => {

// TODO: change to right API call
const URL = 'https://reqres.in/api/products/3';
const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quam integer amet ultricies vel amet quam hendrerit. Massa feugiat facilisi eu eget. Senectus erat non et magna vitae facilisi purus. 

Euismod ipsum, in molestie sit at mi. Curabitur praesent dignissim tortor odio vel, dolor diam urna feugiat. `

const fakeData = {id:"2", firtName: "First Name", lastname:"Last Name",email:"email",phone_number:"+49 123 456 789", address:"Personal Address"};


    const successView = ({data}) => {
        const person = fakeData;
        return (
                <DetailsContainer>

                <Column>
                    <ElementGroup>
                        <CaptionText>First name</CaptionText>
                        <BodySmallText>{person.firstname}</BodySmallText>
                    </ElementGroup>
                    <ElementGroup>
                        <CaptionText>Last name</CaptionText>
                        <BodySmallText>{person.lastname}</BodySmallText>
                    </ElementGroup>
                    <ElementGroup>
                        <CaptionText>email</CaptionText>
                        <BodySmallText>{person.email}</BodySmallText>
                    </ElementGroup>
                    <ElementGroup>
                        <CaptionText>phone_number</CaptionText>
                        <BodySmallText>{person.phone_number}</BodySmallText>
                    </ElementGroup>
                    <ElementGroup>
                        <CaptionText>Address</CaptionText>
                        <BodySmallText>{person.address}</BodySmallText>
                    </ElementGroup>

                </Column>
                </DetailsContainer>
        );

    }

    return (
        <LoadingView url={URL} successView={successView}/>);

}

AdminNaturalPersonDetails.propTypes = {
    id: PropTypes.string
}

export default AdminNaturalPersonDetails;