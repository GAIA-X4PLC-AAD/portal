const API_URL = "https://metadatasearch.gxfs.gx4fm.org/service-offerings?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape"
const BASE_URL = 'https://metadatasearch.gxfs.gx4fm.org/service-offerings';
const NODE_SHAPE = '?node_shape=http://semanticweb.org/metadatasurveyontology/SurveyResultDataOfferingShape';
const FILTER_PROPERTY = '&filter_property=';
const FILTER_TERM = '&filter_term=';
// const API_URL = 'www.google.de';
import axios from 'axios';

export const ApiService = {
    async get() {
        return axios.get(API_URL).then((response) => {
            console.log(response.data);
        }, (error) => {
            console.error(error);
        });
    },
};
