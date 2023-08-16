import React, {useState} from "react";
import {BlueButton} from "../../common/styles";
import DataList from "../discovery/dataList/DataList";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';
const ServiceOfferings = () => {
    const [selfDescriptionData, setSelfDescriptionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getDataHandler = async () => {
        setIsLoading(true);
        setSelfDescriptionData(await ApiService.getData());
        setIsLoading(false);
    }

    return (
        <div className='service-offerings'>
            <header>
                <h2>Service Offerings</h2>
            </header>
            <div className='content'>
                <BlueButton onClick={getDataHandler}>Get Data</BlueButton>
                {!isLoading && selfDescriptionData.length > 0 && <DataList data={selfDescriptionData}></DataList>}
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    );
}
export default ServiceOfferings;
