import {ApiService} from "../services/ApiService";
import React  from 'react';

export const DataProvider = () => {
    const response = ApiService.get();
    console.log(response);
    return (<div></div>);
};

