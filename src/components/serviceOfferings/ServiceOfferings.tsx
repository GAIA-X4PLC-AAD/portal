import React, {useContext, useEffect, useState} from "react";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';
import DataTable from "../dataTable/DataTable";
import {AuthContext} from "../../context/AuthContextProvider";
import {RDFParser} from "../../utils/RDFParser";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {Padding} from "../discovery/tabs/style";
// import SendIcon from '@mui/icons-material/Send';

// @ts-ignore
import car from "../../assets/car.gif";
import {mapSelfDescriptions} from "../../utils/dataMapper";

const ServiceOfferings = () => {
  const [selfDescriptionData, setSelfDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;
  const [selectedShape, setSelectedShape] = useState('');
  const [shapes, setShapes] = useState<string[]>([]);
  const [isShapeSelected, setIsShapeSelected] = useState(false);

  const [isDomainSelected, setIsDomainSelected] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [domains, setDomains] = useState<string[]>([]);

  const [selectedTerm, setSelectedTerm] = useState('');

  const handleShapeChange = (event: SelectChangeEvent) => {
    setSelectedShape(event.target.value);
    setIsShapeSelected(true);
    getDomains();
  };
  const handleDomainChange = (event: SelectChangeEvent) => {
    setSelectedDomain(event.target.value);
    setIsDomainSelected(true);
  };

  useEffect(() => {
    getShaclShapes();
    getDataHandler()
  }, [isAuthenticated])
  const getDataHandler = async () => {
    setIsLoading(true);
    // setSelfDescriptionData(await ApiService.getData());
    setIsLoading(false);
  }

  const getDomains = async () => {
    setIsLoading(true);
    const data = await ApiService.getShaclShapesFromCatalogue(authContext);
    setDomains(RDFParser.parseShapesFromRdfResponse(data,'domains'));
    setIsLoading(false);
  }

  const getShaclShapes = async () => {
    setIsLoading(true);
    const data = await ApiService.getShaclShapesFromCatalogue(authContext);
    setShapes(RDFParser.parseShapesFromRdfResponse(data,'shapes'));
    setIsLoading(false);
  }

  async function handleSearch() {
    setIsLoading(true);
    const targetClass = selectedShape.replace('Shape','')
    const selfDescriptions = await ApiService.getSelfDescriptionsForShape(authContext, targetClass);
    const map = mapSelfDescriptions(selfDescriptions);
    console.log('Map:', map);
    setSelfDescriptionData(map);
    setIsLoading(false);
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
                      value={selectedShape}
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
                      value={selectedDomain}
                      label="Domain"
                      onChange={handleDomainChange}
                  >
                    {domains.map((domain) => (
                      <MenuItem
                        key={domain}
                        value={domain}
                      >
                        {domain}
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
            <div className='button'>
              { isShapeSelected &&
                  <Button variant="contained" onClick={handleSearch} size="large">Search</Button>
                  }
            </div>

            <Padding key='i01' paddingTop='20px' />
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
