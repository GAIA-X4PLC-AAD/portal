import React, {useEffect, useState} from "react";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';
import {CarLoader} from "../carLoader/CarLoader";
import DataTable from "../dataTable/DataTable";

const ServiceOfferings = () => {
    const [selfDescriptionData, setSelfDescriptionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getDataHandler()
    }, [])
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
                {!isLoading && selfDescriptionData.length > 0 && <DataTable data={selfDescriptionData} type={"service"} />}
                {isLoading && <CarLoader />}
            </div>
        </div>
    );
}
export default ServiceOfferings;
