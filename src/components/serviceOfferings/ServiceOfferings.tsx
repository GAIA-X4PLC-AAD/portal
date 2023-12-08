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
import {ShaclShape} from "../../types/shaclShape.model";
import {getShapeProperties, trimShapes} from "../../utils/shapeHelpers";

const ServiceOfferings = () => {
  const [selfDescriptionData, setSelfDescriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;

  const initShape: ShaclShape = {
    shape: '',
    short_shape: '',
    properties: [],
  };

  const [selectedShape, setSelectedShape] = useState<ShaclShape>(initShape);
  const [shapes, setShapes] = useState<ShaclShape[]>([]);
  const [isShapeSelected, setIsShapeSelected] = useState(false);

  const [isPropertySelected, setIsPropertySelected] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [properties, setProperties] = useState<string[]>([]);

  const [selectedTerm, setSelectedTerm] = useState('');

  const handleShapeChange = (event: SelectChangeEvent) => {
    let uiSelectedShape = event.target.value;
    shapes.forEach(shape => {
      if(shape.shape === uiSelectedShape){
        setSelectedShape(shape);
      }
    });
    setIsShapeSelected(true);
  };
  const handlePropertyChange = (event: SelectChangeEvent) => {
    setSelectedProperty(event.target.value);
    setIsPropertySelected(true);
  };

  useEffect(() => {
      setProperties(getShapeProperties(selectedShape));
  }, [selectedShape])

  useEffect(() => {
    setIsLoading(true);
    const getShaclShapes = async () => {
      const data = await ApiService.getShaclShapesFromCatalogue(authContext);
      setShapes(RDFParser.parseShapesFromRdfResponse(data));
    }
    getShaclShapes();
    setIsLoading(false);
  }, [isAuthenticated])

  async function handleSearch() {
    setIsLoading(true);
    let short_shape = trimShapes(selectedShape.shape);
    const targetClass = short_shape.replace('Shape','')
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
                      value={selectedShape.shape}
                      label="SHACL Shape"
                      onChange={handleShapeChange}
                  >
                    {shapes.map((shape) => (
                      <MenuItem
                        key={shape.shape}
                        value={shape.shape}
                      >
                        {shape.shape}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
            { isShapeSelected &&
                <FormControl sx={{marginX: 1, minWidth: 200 }}>
                  <InputLabel id="property-label">Property</InputLabel>
                  <Select
                      labelId="property-label"
                      id="property-select"
                      value={selectedProperty}
                      label="Property"
                      onChange={handlePropertyChange}
                  >
                    {properties.map((property) => (
                      <MenuItem
                        key={property}
                        value={property}
                      >
                        {property}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
            }
            { isPropertySelected &&
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
