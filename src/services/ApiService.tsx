import {SelfDescription} from "../types/selfDescription.model";

const API_URL = "https://metadatasearch.gxfs.gx4fm.org/service-offerings?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape"
const BASE_URL = 'https://metadatasearch.gxfs.gx4fm.org/service-offerings';
const NODE_SHAPE = '?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape';
const FILTER_PROPERTY = '&filter_property=';
const FILTER_TERM = '&filter_term=';
import axios, {AxiosResponse} from 'axios';

export const ApiService = {
    async getData() {
        const API_URL = "https://metadatasearch.gxfs.gx4fm.org/service-offerings?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape"
        const response = await axios.get(API_URL);
        console.log("Response: ", response);
        const data = response.data;
        console.log("Response: ", data);
        const transformedSelfDescriptionData = data.data.map((selfDescriptions : any) => {
            return {
                survey_id: selfDescriptions.subjectClaims.survey_id,
                survey_title: selfDescriptions.subjectClaims.survey_title,
                survey_description: selfDescriptions.subjectClaims.survey_description,
                claimsGraphUri: selfDescriptions.subjectClaims.claimsGraphUri,
                survey_close_time: selfDescriptions.subjectClaims.survey_close_time,
                survey_creation_time: selfDescriptions.subjectClaims.survey_creation_time,
                survey_end_time: selfDescriptions.subjectClaims.survey_end_time,
                survey_start_time: selfDescriptions.subjectClaims.survey_start_time,
                survey_state: selfDescriptions.subjectClaims.survey_state,
                survey_url: selfDescriptions.subjectClaims.survey_url,
                id: selfDescriptions.subjectClaims.uri
            };
        })
        console.log("transformedSelfDescriptionData: ", transformedSelfDescriptionData);
        return transformedSelfDescriptionData;
    },

    async getParticipants() : Promise<AxiosResponse< Array<Partial<SelfDescription>> >> {
        const API_URL = "https://metadatasearch.gxfs.gx4fm.org/participants"
        const response = await axios.get(API_URL);
        return response.data;
        // const transformedParticipantsData = data.data.map(participants => {
        //     return {
        //         claimsGraphUri: participants.subjectClaims.claimsGraphUri,
        //         legalName: participants.subjectClaims.legalName,
        //         registrationNumber: participants.subjectClaims.registrationNumber,
        //         id: participants.subjectClaims.uri,
        //         subjectTypes: participants.subjectTypes,
        //     };
        // })
        // return transformedParticipantsData;
    },
};
