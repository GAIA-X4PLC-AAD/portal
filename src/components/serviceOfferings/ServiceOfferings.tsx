import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { ApiService } from "../../services/ApiService";
import { AuthContext } from "../../context/AuthContextProvider";
import { RDFParser } from "../../utils/RDFParser";
import { Padding } from "../discovery/tabs/style";
// import SendIcon from '@mui/icons-material/Send';
// @ts-ignore
import car from "../../assets/car.gif";
import SelfDescriptionCard from "components/cards/SelfDescriptionCard";
import { ServiceOffering, mapServiceOfferings } from "../../utils/dataMapper";
import { ShaclShape } from "../../types/shaclShape.model";
import { getShapeProperties } from "../../utils/shapeHelpers";

import "./ServiceOfferings.css";

const ServiceOfferings = () => {
  const [selfDescriptionData, setSelfDescriptionData] = useState<
    ServiceOffering[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isAuthenticated;

  const initShape: ShaclShape = {
    shape: "",
    short_shape: "",
    properties: [],
  };

  const [selectedShape, setSelectedShape] = useState<ShaclShape>(initShape);
  const [shapes, setShapes] = useState<ShaclShape[]>([]);
  const [isShapeSelected, setIsShapeSelected] = useState(false);
  const [isPropertySelected, setIsPropertySelected] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [properties, setProperties] = useState<string[]>([]);

  useEffect(() => {
    setProperties(getShapeProperties(selectedShape));
  }, [selectedShape]);

  useEffect(() => {
    setIsLoading(true);
    const getShaclShapes = async () => {
      const data = await ApiService.getShaclShapesFromCatalogue(authContext);
      setShapes(RDFParser.parseShapesFromRdfResponse(data));
    };
    getShaclShapes();
    setIsLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getAllSelfDescriptions(authContext);
        console.log("My fetched data: ", response);
        const map = mapServiceOfferings(response);
        setSelfDescriptionData(map);
      } catch (error) {
        console.error("Error fetching self descriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetSelfDescriptions();
  }, []);

  const handleShapeChange = (event: SelectChangeEvent) => {
    let uiSelectedShape = event.target.value;
    shapes.forEach((shape) => {
      if (shape.short_shape === uiSelectedShape) {
        setSelectedShape(shape);
      }
    });
    setIsShapeSelected(true);
  };

  const handlePropertyChange = (event: SelectChangeEvent) => {
    setSelectedProperty(event.target.value);
    setIsPropertySelected(true);
  };

  async function handleSearch() {
    setIsLoading(true);
    const targetClass = selectedShape.short_shape.replace("Shape", "");
    const selfDescriptions = await ApiService.getSelfDescriptionsForShape(
      authContext,
      targetClass
    );
    const map = mapServiceOfferings(selfDescriptions.data);
    console.log("Map:", map);
    setSelfDescriptionData(map);
    setIsLoading(false);
  }

  return (
    <div className="service-offerings">
      <header>
        <h2>Service Offerings</h2>
      </header>
      {authContext.isAuthenticated && (
        <div className="content">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="shape-label">Select Shape</InputLabel>
            <Select
              labelId="shape-label"
              id="shape-select"
              value={selectedShape.short_shape}
              label="SHACL Shape"
              onChange={handleShapeChange}
            >
              {shapes.map((shape) => (
                <MenuItem key={shape.short_shape} value={shape.short_shape}>
                  {shape.short_shape}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isShapeSelected && (
            <FormControl sx={{ marginX: 1, minWidth: 200 }}>
              <InputLabel id="property-label">Property</InputLabel>
              <Select
                labelId="property-label"
                id="property-select"
                value={selectedProperty}
                label="Property"
                onChange={handlePropertyChange}
              >
                {properties.map((property) => (
                  <MenuItem key={property} value={property}>
                    {property}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {isPropertySelected && (
            <FormControl sx={{ minWidth: 200 }}>
              <TextField
                id="outlined-basic"
                label="Keyword"
                variant="outlined"
              />
            </FormControl>
          )}
          <div className="button">
            {isShapeSelected && (
              <Button variant="contained" onClick={handleSearch} size="large">
                Search
              </Button>
            )}
          </div>

          <Padding key="i01" paddingTop="20px" />
          <div>
            {!isLoading &&
              selfDescriptionData.length > 0 &&
              selfDescriptionData.map((selfDescription) => {
                return (
                  <SelfDescriptionCard
                    key={selfDescription.name}
                    label={selfDescription.label}
                    isGaiaXComlpiant={true}
                    name={selfDescription.name}
                    description={selfDescription.description}
                    selfDescription={selfDescription}
                  />
                );
              })}
            {isLoading && (
              <div className="newCarLoader">
                <img src={car} alt="loading..." className="car" />
              </div>
            )}
          </div>
        </div>
      )}
      {!authContext.isAuthenticated && <p>You are not authenticated!</p>}
    </div>
  );
};
export default ServiceOfferings;
