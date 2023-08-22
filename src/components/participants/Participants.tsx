import * as React from "react";
import {useState, useEffect} from "react";
import {ApiService} from "../../services/ApiService";
import './Participants.css';
import DataTable from "../dataTable/DataTable";
// @ts-ignore
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {SelfDescription} from "../../types/selfDescription.model";

const Participants = () => {
  // const [participantsData, setParticipantsData] = useState<SelfDescription[] | any>();
  const [participantsData, setParticipantsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchParticipantsHandler();
  }, [])

  const fetchParticipantsHandler = async () => {
    setIsLoading(true);
    setParticipantsData(await ApiService.getParticipants());
    setIsLoading(false);
  }

  return (
    <div className='participants'>
      <header>
        <h2>Participants</h2>
      </header>
      <div className='content'>
        {!isLoading && <DataTable data={participantsData}></DataTable>}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}
export default Participants;
