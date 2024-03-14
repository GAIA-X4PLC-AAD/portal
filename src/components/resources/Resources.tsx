import { useContext, useEffect, useState } from "react";

import SelfDescriptionCard from "components/cards/SelfDescriptionCard";
import { ApiService } from "services/ApiService";
import { AuthContext } from "context/AuthContextProvider";
import { mapSelfDescriptions } from "utils/dataMapper";

// import SendIcon from '@mui/icons-material/Send';
// @ts-ignore
import car from "../../assets/car.gif";
import "./Resources.css";

const Resources = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selfDescriptionData, setSelfDescriptionData] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getAllResources(authContext);
        console.log("My fetched data: ", response);
        const map = mapSelfDescriptions(response);
        setSelfDescriptionData(map);
      } catch (error) {
        console.error("Error fetching self descriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetSelfDescriptions();
  }, []);

  return (
    <div>
      <header>
        <h2>Resources</h2>
      </header>
      {authContext.isAuthenticated && (
        <div className="content">
          <div>
            {!isLoading &&
              selfDescriptionData.length > 0 &&
              selfDescriptionData.map((selfDescription, index) => {
                return (
                  <SelfDescriptionCard
                    // This key definition via index is just temprorary, until we have a specific structure for our Resource JSON
                    key={index}
                    label="Type/Label"
                    isGaiaXComlpiant={true}
                    name="Name"
                    description="Some description for Resources..."
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
export default Resources;
