import { useContext, useEffect, useState } from "react";

import SelfDescriptionCard from "components/cards/SelfDescriptionCard";
import { ApiService } from "services/ApiService";
import { AuthContext } from "context/AuthContextProvider";
import { Resource, mapResources } from "utils/dataMapper";

// import SendIcon from '@mui/icons-material/Send';
// @ts-ignore
import car from "../../assets/car.gif";
import styles from "./Resources.module.css";
import Title from "components/Title/Title";

const Resources = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resourceData, setResourceData] = useState<Resource[]>([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getAllResources(authContext);
        console.log("My fetched data: ", response);
        const map = mapResources(response);
        setResourceData(map);
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
      <header className={styles["header-container"]}>
        <div className={styles["header-title"]}>
          <Title>Resources</Title>
        </div>
      </header>
      {authContext.isAuthenticated && (
        <div className={styles.content}>
          <div>
            {!isLoading &&
              resourceData.length > 0 &&
              resourceData.map((resource) => {
                return (
                  <SelfDescriptionCard
                    key={resource.name}
                    label={resource.label}
                    isGaiaXComlpiant={true}
                    name={resource.name}
                    description={resource.description}
                    selfDescription={resource}
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
