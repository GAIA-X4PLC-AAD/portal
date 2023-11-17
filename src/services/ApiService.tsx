import axios, {AxiosResponse} from 'axios';
import {AuthContextValues} from "../context/AuthContextValues";

export const ApiService = {
    async getData() {
        const API_URL = "https://metadatasearch.gxfs.gx4fm.org/service-offerings?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape"
        const response = await axios.get(API_URL);
        const data = response.data;
        return data.data.map((selfDescription: any) => {
            return {
                survey_id: selfDescription.subjectClaims.survey_id,
                survey_title: selfDescription.subjectClaims.survey_title,
                survey_description: selfDescription.subjectClaims.survey_description,
                claimsGraphUri: selfDescription.subjectClaims.claimsGraphUri,
                survey_close_time: selfDescription.subjectClaims.survey_close_time,
                survey_creation_time: selfDescription.subjectClaims.survey_creation_time,
                survey_end_time: selfDescription.subjectClaims.survey_end_time,
                survey_start_time: selfDescription.subjectClaims.survey_start_time,
                survey_state: selfDescription.subjectClaims.survey_state,
                survey_url: selfDescription.subjectClaims.survey_url,
                id: selfDescription.subjectClaims.uri
            };
        });
    },

    /**
     *
     * @param authContext
     * @param targetClass String of the type of data you want to search for (@type specification in Self Description)
     * @param searchDomain String of the domain you want to search in/the property you want to search for
     * @param searchTerm String of the keyword you want to search for
     */
    async getSelfDescriptionsForShape(authContext: AuthContextValues, targetClass: string, searchDomain?: string, searchTerm?: string) : Promise<AxiosResponse<any, any>> {
        let searchQuery = '';
        if(isEmpty(searchDomain) && isEmpty(searchTerm)) {
            searchQuery = "MATCH (n:" + targetClass + ") RETURN properties(n)";
        } else {
            searchQuery = "MATCH (n:" + targetClass + ") WHERE toLower(n." + searchDomain + ") CONTAINS toLower('"+ searchTerm + "') RETURN properties(n)";
        }

        const requestBody = {"statement": searchQuery};
        const endpoint = "https://fc-server.gxfs.gx4fm.org/query";
        const headers = {
            'Authorization': `Bearer ${authContext.token}`,
            'Access-Control-Allow-Origin': '*',
        };

        return axios.options(endpoint, {headers}).then(response => {
            return axios.post(endpoint, requestBody, {headers});
        }).then(response => {
            console.log('Post Response', response.data);
            return response.data;
        }).catch(error => {
            console.error('Error:', error);
        });
    },

    // async getParticipants() : Promise<AxiosResponse< Array<Partial<any>> >> {
    //     const API_URL = "https://metadatasearch.gxfs.gx4fm.org/participants"
    //     const response = await axios.get(API_URL);
    //     return response.data.data.map((participants: any) => {
    //         return {
    //             id: participants.subjectClaims.uri,
    //             claimsGraphUri: participants.subjectClaims.claimsGraphUri,
    //             legalName: participants.subjectClaims.legalName,
    //             registrationNumber: participants.subjectClaims.registrationNumber,
    //             subjectTypes: participants.subjectTypes,
    //         };
    //     });
    // },

    async getParticipants() {
        return '';
    },

    async getShaclShapesFromCatalogue(authContext: AuthContextValues) : Promise<AxiosResponse<any, any>> {
        const endpoint = "https://fc-server.gxfs.gx4fm.org/schemas/latest?type=shape";
        const headers = {
            'Authorization': `Bearer ${authContext.token}`,
            'Access-Control-Allow-Origin': '*',
        };

      return axios.options(endpoint, {headers}).then(response => {
            return axios.get(endpoint, {headers})
          }).then(response => {
            return response.data;
          }).catch(error => {
            console.error('Error:', error);
          });
    },
};

const isEmpty = (value: string | undefined) => {
    return (value == null || (value.trim().length === 0));
}
