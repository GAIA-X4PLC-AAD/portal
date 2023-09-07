import React, {useContext, useEffect, useState} from "react";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';
import {CarLoader} from "../carLoader/CarLoader";
import DataTable from "../dataTable/DataTable";
import {AuthContext} from "../../context/AuthContextProvider";

const ServiceOfferings = () => {
  const [selfDescriptionData, setSelfDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  if(authContext.isAuthenticated){
    const config = authContext.getConfig;
    console.log(config);
  }

  useEffect(() => {
    getDataHandler()
  }, [])
  const getDataHandler = async () => {
    setIsLoading(true);
    setSelfDescriptionData(await ApiService.getData());
    setIsLoading(false);
  }

  const getData = async () => {
    const data = await ApiService.getShaclShapesFromCatalogue();
    console.log("Data: ", data);
  }

  return (
    <div className='service-offerings'>
      <header>
        <h2>Service Offerings</h2>
      </header>
      <button onClick={getData}>Hello!</button>
      {
        authContext.isAuthenticated &&
          <div className='content'>
            {!isLoading && selfDescriptionData.length > 0 && <DataTable data={selfDescriptionData} type={"service"}/>}
            {isLoading && <CarLoader/>}
          </div>
      }
      {
        !authContext.isAuthenticated && <p>You are not authenticated!</p>
      }
    </div>
  );
}
export default ServiceOfferings;
