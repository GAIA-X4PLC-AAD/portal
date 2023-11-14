import React, {useContext, useEffect, useState} from "react";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';
import DataTable from "../dataTable/DataTable";
import {AuthContext} from "../../context/AuthContextProvider";
import {RDFParser} from "../../services/RDFParser";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Padding} from "../discovery/tabs/style";
// @ts-ignore
import car from "../../assets/auto.gif";

const ServiceOfferings = () => {
  const [selfDescriptionData, setSelfDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;
  const [shaclShape, setShaclShape] = useState('');
  const [shapes, setShapes] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setShaclShape(event.target.value);
  };

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
    setShapes(RDFParser.parseShapesFromRdfResponse(data));
  }

  return (
    <div className='service-offerings'>
      <header>
        <h2>Service Offerings</h2>
      </header>
      {
        authContext.isAuthenticated &&
          <div className='content'>
              <FormControl fullWidth>
                  <InputLabel id="shape-label">Shacl Shapes</InputLabel>
                  <Select
                      labelId="shape-label"
                      id="shape-select"
                      value={shaclShape}
                      label="Shacl Shapes"
                      onChange={handleChange}
                  >
                    {shapes.map((shape) => (
                      <MenuItem
                        key={shape}
                        value={shape}
                      >
                        {shape}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
              <Padding key='i03' paddingTop='20px' />
            <div>
              {!isLoading && selfDescriptionData.length > 0 && <DataTable data={selfDescriptionData} type={"service"}/>}
              {isLoading &&
                  <div className='newCarLoader'>
                    <img src={car} alt="loading..."  className='car'/>
                  </div>
              }
            </div>

          </div>
      }
      {
        !authContext.isAuthenticated && <p>You are not authenticated!</p>
      }
    </div>
  );
}
export default ServiceOfferings;
