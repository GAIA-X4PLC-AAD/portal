import axios, {AxiosResponse} from 'axios';
import {AuthContext} from "../context/AuthContextProvider";
import {useContext} from "react";

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

    async getShaclShapesFromCatalogue() : Promise<AxiosResponse> {
        const endpoint = "https://fc-server.gxfs.gx4fm.org/schemas/latest?type=ontology";
        const token= "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGdEx3Y09NNDBndUxFWEVxQU43UVVKczF4V09odjZSTUVJUTRoU2cxdDQwIn0.eyJleHAiOjE2OTQxNzcwNjksImlhdCI6MTY5NDE3NjE2OSwianRpIjoiYTQ2ODk4NDktYzM5Ni00YzY5LTllOTUtMGFjYWU4NTgxNTAwIiwiaXNzIjoiaHR0cHM6Ly9mYy1rZXljbG9hay5neGZzLmd4NGZtLm9yZy9yZWFsbXMvZ2FpYS14Iiwic3ViIjoiZmM4MjU1NWMtZjFiMy00ZjZjLWFjZGQtZWZlMGM3MWVjZWMxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZmVkZXJhdGVkLWNhdGFsb2d1ZSIsInNlc3Npb25fc3RhdGUiOiIyNmE1YjRkNS1mYTIwLTQwOTAtYTVlYy1lNzViMzRhZDBiYWMiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1nYWlhLXgiXX0sInJlc291cmNlX2FjY2VzcyI6eyJmZWRlcmF0ZWQtY2F0YWxvZ3VlIjp7InJvbGVzIjpbIlJvLU1VLUNBIiwiUm8tTVUtQSIsIlJvLVNELUEiLCJSby1QQS1BIl19fSwic2NvcGUiOiJvcGVuaWQgZ2FpYS14Iiwic2lkIjoiMjZhNWI0ZDUtZmEyMC00MDkwLWE1ZWMtZTc1YjM0YWQwYmFjIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiU3RpbmUgU29lcmVuc2VuIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic3RpbmUiLCJnaXZlbl9uYW1lIjoiU3RpbmUiLCJmYW1pbHlfbmFtZSI6IlNvZXJlbnNlbiJ9.jUpSAKr_16-Q6rJRYsOtZARGdeu75bMz-FSwOhxTvxkLBaumvPgtgDpQ92fXhusya3tneNt25o9qu_zLCepK5D7em6sbT2rLY5cgmAgYOqyqZGU4XBQqjQXedyDBi1UYeZjlbQgKQV3ChEXaxsCXRHXck3XcdMjm6oqhpCBzqdjAqGmNQR25lTeNt7UR1ray2duiYG9lAmdI2uyKmidEP2rVAefaiqRYQihTa3kw47198vp1mM3sLQrVR9OETLq5vpa8-9jyDMS3aTs5i3JVTOjBBgKMiX9FR8La1yPmhJll65Pknk4KXKEXrFNxJ2mRZyU82GqRmgCTPeIOhRiEtA";
        const header = `Authorization: Bearer ${token}`;
        // @ts-ignore
        const response = await axios.get(endpoint, { headers: { header } });
        console.log("Shacl?", response.data)
        return response.data;
    },
};
