import {AxiosResponse} from 'axios';
import {AuthContext} from "../context/AuthContextProvider";
import {useContext} from "react";
import {AuthContextValues} from "../context/AuthContextValues";
import axios from 'axios';

export const ApiService = {

    async getData() {
        const API_URL = "https://metadatasearch.gxfs.gx4fm.org/service-offerings?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape"
        const response = await axios.get(API_URL);
        const data = response.data;
        return data.data.map((selfDescriptions: any) => {
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
        });
    },

    async getParticipants() : Promise<AxiosResponse< Array<Partial<any>> >> {
        const API_URL = "https://metadatasearch.gxfs.gx4fm.org/participants"
        const response = await axios.get(API_URL);
        return response.data.data.map((participants: any) => {
            return {
                id: participants.subjectClaims.uri,
                claimsGraphUri: participants.subjectClaims.claimsGraphUri,
                legalName: participants.subjectClaims.legalName,
                registrationNumber: participants.subjectClaims.registrationNumber,
                subjectTypes: participants.subjectTypes,
            };
        });
    },

    async getShaclShapesFromCatalogue(authContext: AuthContextValues) : Promise<AxiosResponse> {
        const endpoint = "https://fc-server.gxfs.gx4fm.org/schemas/latest?type=ontology";

        console.log('token', authContext.token)

        const headers = {
            'Content-Type': 'text/plain'
        };
        // @ts-ignore
        const response = await axios.get(endpoint);
        console.log("Shacl?", response.data)
        return response.data;
    },
};
