import React, {useContext, useEffect, useState} from "react";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';
import {CarLoader} from "../carLoader/CarLoader";
import DataTable from "../dataTable/DataTable";
import {AuthContext} from "../../context/AuthContextProvider";
import {RDFParser} from "../../services/RDFParser";

const ServiceOfferings = () => {
  const [selfDescriptionData, setSelfDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;
  if(isAuthenticated){
    const config = authContext.getConfig;
  }

  useEffect(() => {
    getShaclShapes();
    getDataHandler()
  }, [isAuthenticated])
  const getDataHandler = async () => {
    setIsLoading(true);
    setSelfDescriptionData(await ApiService.getData());
    setIsLoading(false);
  }

  const getShaclShapes = async () => {
    const data = await ApiService.getShaclShapesFromCatalogue(authContext);
    console.log("Data: ", data);
    RDFParser.parseShapesFromRdfResponse(authContext);
  }

  return (
    <div className='service-offerings'>
      <header>
        <h2>Service Offerings</h2>
      </header>
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
