import React, {useContext, useEffect, useState} from "react";
import {ApiService} from "../../services/ApiService";
import './ServiceOfferings.css';
import DataTable from "../dataTable/DataTable";
import {AuthContext} from "../../context/AuthContextProvider";
import {RDFParser, trimShapes} from "../../utils/RDFParser";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {Padding} from "../discovery/tabs/style";
// import SendIcon from '@mui/icons-material/Send';
// @ts-ignore
import car from "../../assets/car.gif";
import {mapSelfDescriptions} from "../../utils/dataMapper";
import {ShaclShape} from "../../types/shaclShape.model";

const ServiceOfferings = () => {
  const [selfDescriptionData, setSelfDescriptionData] = useState([]);
  const [rdfData, setRdfData] = useState();
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
      if(shape.short_shape === uiSelectedShape){
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
    console.log('getProperties', isShapeSelected);
    getProperties();
  }, [isShapeSelected])

  useEffect(() => {
    getShaclShapes();
  }, [isAuthenticated])

  const getProperties = async () => {
    setIsLoading(true);
    console.log('inside getProperties', isShapeSelected)
    let arrayWithShaclShapeWithProperties = RDFParser.parseShapesFromRdfResponse(rdfData,'properties', selectedShape);
    let selectedShapeWithProps = arrayWithShaclShapeWithProperties[0];
    if(selectedShapeWithProps && selectedShapeWithProps.properties){
      let propertyList : string[] = [];
      selectedShapeWithProps.properties.forEach((property) => {
        if(property.name) {
          propertyList.push(property.name);
        } else if(property.path) {
          propertyList.push(property.path);
        }
      });
      setProperties(propertyList);
    }
    setIsLoading(false);
  }

  const getShaclShapes = async () => {
    setIsLoading(true);
    const data = await ApiService.getShaclShapesFromCatalogue(authContext);
    setRdfData(data);
    setShapes(RDFParser.parseShapesFromRdfResponse(data,'shapes'));
    setIsLoading(false);
  }

  async function handleSearch() {
    setIsLoading(true);
    const targetClass = selectedShape.shape.replace('Shape','')
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
                      value={selectedShape.short_shape}
                      label="SHACL Shape"
                      onChange={handleShapeChange}
                  >
                    {shapes.map((shape) => (
                      <MenuItem
                        key={shape.short_shape}
                        value={shape.short_shape}
                      >
                        {shape.short_shape}
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
