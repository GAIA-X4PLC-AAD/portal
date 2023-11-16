import axios, {AxiosResponse} from 'axios';
import {AuthContextValues} from "../context/AuthContextValues";

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

    async getSelfDescriptions(){
      return '';
    },

    /**
     *
     * @param authContext
     * @param targetClass String of the type of data you want to search for (@type specification in Self Description)
     * @param searchDomain String of the domain you want to search in/the property you want to search for
     * @param searchTerm String of the keyword you want to search for
     */
    async getSelfDescriptionsForShape(authContext: AuthContextValues, targetClass: string, searchDomain?: string, searchTerm?: string) {
        let searchQuery = '';
        console.log('TargetClass:', targetClass);
        if(isEmpty(searchDomain) && isEmpty(searchTerm)) {
            // const searchQuery = "MATCH (n:ScenarioDataResource) WHERE toLower(n.ownerName) CONTAINS toLower('s') RETURN properties(n)";
            searchQuery = "MATCH (n:" + targetClass + ") RETURN properties(n)";
            console.log('Here');
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
