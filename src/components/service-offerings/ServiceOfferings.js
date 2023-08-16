import React, {useEffect, useState} from "react";
import DataList from "../discovery/dataList/DataList";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';

const ServiceOfferings = () => {
    const [selfDescriptionData, setSelfDescriptionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getDataHandler()
    }, [])
    const getDataHandler = async () => {
        setIsLoading(true);
        setSelfDescriptionData(await ApiService.getData());
        console.log('selfDescriptionData: ', selfDescriptionData);
        setIsLoading(false);
    }

    return (
        <div className='service-offerings'>
            <header>
                <h2>Service Offerings</h2>
            </header>
            <div className='content'>
                {!isLoading && selfDescriptionData.length > 0 && <DataList data={selfDescriptionData}></DataList>}
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    );
}
export default ServiceOfferings;
