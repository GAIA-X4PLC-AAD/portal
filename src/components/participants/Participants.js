import React, {useState} from "react";
import {BlueButton} from "../../common/styles";
import DataList from "../discovery/dataList/DataList";
import {ApiService} from "../../services/ApiService";
import './Participants.css';
import DataTable from "../dataTable/DataTable";
const Participants = () => {
    const [selfDescriptionData, setSelfDescriptionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getDataHandler = async () => {
        setIsLoading(true);
        setSelfDescriptionData(await ApiService.getParticipants());
        setIsLoading(false);
    }

    return (
        <div className='service-offerings'>
            <header>
                <h2>Participants</h2>
            </header>
            <div className='content'>
                <BlueButton onClick={getDataHandler}>Get Data</BlueButton>
                {!isLoading && selfDescriptionData.length > 0 && <DataList data={selfDescriptionData}></DataList>}
                {isLoading && <p>Loading...</p>}
            </div>
            {/*<DataTable></DataTable>*/}
        </div>
    );
}
export default Participants;
