import {useContext, useEffect, useState} from "react";
import {ApiService} from "../../services/ApiService";
import './Participants.css';
import DataTable from "../dataTable/DataTable";
import {CarLoader} from "../carLoader/CarLoader";
import {AuthContext} from "../../context/AuthContextProvider";

const Participants = () => {
  // const [participantsData, setParticipantsData] = useState<SelfDescription[] | any>();
  const [participantsData, setParticipantsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchParticipantsHandler();
  }, [])

  const fetchParticipantsHandler = async () => {
    setIsLoading(true);
    await ApiService.getSelfDescriptionsForShape(authContext);
    // setParticipantsData(await ApiService.getParticipants());
    setIsLoading(false);
  }

  return (
    <div className='participants'>
      <header>
        <h2>Participants</h2>
      </header>
      <div className='content'>
        {!isLoading && <DataTable data={participantsData} type={"participants"}></DataTable>}
        {isLoading && <CarLoader />}
      </div>
    </div>
  );
}
export default Participants;
