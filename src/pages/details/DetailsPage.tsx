import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "context/AuthContextProvider";
import { ApiService } from "services/ApiService";
import DetailsCard from "components/cards/DetailsCard";
import MapCard from "components/cards/MapCard";
import SidebarCard from "components/cards/SidebarCard";

import car from "../../assets/car.gif";
import styles from "./DetailsPage.module.css";

export default function DetailsPage() {
  const authContext = useContext(AuthContext);
  const [selfDescriptionData, setSelfDescriptionData] = useState(null);
  const { resourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      try {
        const response = await ApiService.getOneSelfDescriptions(
          authContext,
          resourceId
        );
        console.log("Fetched data: ", response);
        if (response) {
          setSelfDescriptionData(response);
        }
      } catch (error) {
        console.error("Error fetching self descriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (resourceId && authContext.isAuthenticated) {
      fetchAndSetSelfDescriptions();
    }
  }, [resourceId, authContext.isAuthenticated]);

  if (!authContext.isAuthenticated) {
    return <p>You need to be authenticated to view this page.</p>;
  }

  if (isLoading) {
    return (
      <div className="newCarLoader">
        <img src={car} alt="loading..." className="car" />
      </div>
    );
  }

  if (!selfDescriptionData) {
    return <div>No data available.</div>;
  }

  return (
    <div className={styles["details-page-container"]}>
      {isLoading ? (
        <div className="newCarLoader">
          <img src={car} alt="loading..." className="car" />
        </div>
      ) : (
        <>
          <div>
            <DetailsCard cardData={selfDescriptionData} />
          </div>
          <div>
            <MapCard />
            <SidebarCard
              title="Offered by"
              subtitle="3D Mapping Solutions GmbH"
              text="We offer high-precision 3D map data of roads and urban environments for applications in autonomous driving, robotics, urban planning and navigation systems."
            />
          </div>
        </>
      )}
    </div>
  );
}
