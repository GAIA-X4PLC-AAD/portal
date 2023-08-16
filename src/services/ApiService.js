const API_URL = "https://metadatasearch.gxfs.gx4fm.org/service-offerings?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape"
const BASE_URL = 'https://metadatasearch.gxfs.gx4fm.org/service-offerings';
const NODE_SHAPE = '?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape';
const FILTER_PROPERTY = '&filter_property=';
const FILTER_TERM = '&filter_term=';
import axios from 'axios';

export const ApiService = {
    async getData() {
        const API_URL = "https://metadatasearch.gxfs.gx4fm.org/service-offerings?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape"
        const response = await axios.get(API_URL);
        console.log("Response: ", response);
        const data = response.data;
        console.log("Response: ", data);
        const transformedSelfDescriptionData = data.data.map(selfDescriptions => {
            return {
                id: selfDescriptions.survey_id,
                title: selfDescriptions.survey_title,
                description: selfDescriptions.survey_description,
                claimsGraphUri: selfDescriptions.claimsGraphUri,
                close_time: selfDescriptions.survey_close_time,
                creation_time: selfDescriptions.survey_creation_time,
                end_time: selfDescriptions.survey_end_time,
                start_time: selfDescriptions.survey_start_time,
                state: selfDescriptions.survey_state,
                url: selfDescriptions.survey_url,
                uri: selfDescriptions.uri
            };
        })
        console.log("transformedSelfDescriptionData: ", transformedSelfDescriptionData);
        return transformedSelfDescriptionData;
    },

    async getParticipants() {
        const API_URL = "https://metadatasearch.gxfs.gx4fm.org/participants"
        const response = await axios.get(API_URL);
        console.log("Response: ", response);
        const data = response.data;
        console.log("Response: ", data);
        const transformedParticipantsData = data.data.map(participants => {
            return {
                claimsGraphUri: participants.subjectClaims.claimsGraphUri,
                legalName: participants.subjectClaims.legalName,
                registrationNumber: participants.subjectClaims.registrationNumber,
                uri: participants.subjectClaims.uri,
                subjectTypes: participants.subjectTypes,

            };
        })
        console.log("transformedParticipantsData: ", transformedParticipantsData);
        return transformedParticipantsData;
    },
};
