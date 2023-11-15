import React, {useContext, useEffect, useState} from "react";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';
import DataTable from "../dataTable/DataTable";
import {AuthContext} from "../../context/AuthContextProvider";
import {RDFParser} from "../../utils/RDFParser";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
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
  const [isShapeSelected, setIsShapeSelected] = useState(false);
  const [isDomainSelected, setIsDomainSelected] = useState(false);

  const handleShapeChange = (event: SelectChangeEvent) => {
    setShaclShape(event.target.value);
    setIsShapeSelected(true);
  };
  const handleDomainChange = (event: SelectChangeEvent) => {
    setIsDomainSelected(true);
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
              <FormControl sx={{minWidth: 200 }}>
                  <InputLabel id="shape-label">Select Shape</InputLabel>
                  <Select
                      labelId="shape-label"
                      id="shape-select"
                      value={shaclShape}
                      label="SHACL Shape"
                      onChange={handleShapeChange}
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
            { isShapeSelected &&
                <FormControl sx={{marginX: 1, minWidth: 200 }}>
                  <InputLabel id="domain-label">Domain</InputLabel>
                  <Select
                      labelId="domain-label"
                      id="domain-select"
                      value={shaclShape}
                      label="Domain"
                      onChange={handleDomainChange}
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
            }
            { isDomainSelected &&
              <FormControl sx={{ minWidth: 200 }}>
                <TextField id="outlined-basic" label="Keyword" variant="outlined" />
              </FormControl>
            }
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
