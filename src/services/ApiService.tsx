import axios, {AxiosResponse} from 'axios';
import {AuthContextValues} from "../context/AuthContextValues";
import {isEmpty} from "../utils/helpers";

export const ApiService = {
    /**
     *
     * @param authContext
     * @param targetClass String of the type of data you want to search for (@type specification in Self Description)
     * @param searchProperty String of the domain you want to search in/the property you want to search for
     * @param searchTerm String of the keyword you want to search for
     */
    async getSelfDescriptionsForShape(authContext: AuthContextValues, targetClass: string, searchProperty?: string, searchTerm?: string) : Promise<AxiosResponse<any, any>> {
        let searchQuery = '';
        if(isEmpty(searchProperty) && isEmpty(searchTerm)) {
            searchQuery = "MATCH (n:" + targetClass + ") RETURN properties(n)";
        } else {
            searchQuery = "MATCH (n:" + targetClass + ") WHERE toLower(n." + searchProperty + ") CONTAINS toLower('"+ searchTerm + "') RETURN properties(n)";
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

    async getShaclShapesFromCatalogue(authContext: AuthContextValues) : Promise<AxiosResponse<any, any>> {
        const endpoint = "https://fc-server.gxfs.gx4fm.org/schemas/latest?type=shape";
        const headers = {
            'Authorization': `Bearer ${authContext.token}`,
            'Access-Control-Allow-Origin': '*',
        };

      return axios.options(endpoint, {headers}).then(response => {
            return axios.get(endpoint, {headers})
          }).then(response => {
          console.log('Shape Response from FC:', response.data);
          return response.data;
          }).catch(error => {
            console.error('Error:', error);
          });
    },
};
