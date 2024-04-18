import DetailsCard from "components/cards/DetailsCard";
import { AuthContext } from "context/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import { ApiService } from "services/ApiService";

import MapCard from "components/cards/MapCard";
import SidebarCard from "components/cards/SidebarCard";
import { useParams } from "react-router-dom";

import styles from "./DetailsPage.module.css";

export default function DetailsPage() {
  const authContext = useContext(AuthContext);
  const [selfDescriptionData, setSelfDescriptionData] = useState([]);
  const { resourceId } = useParams();

  useEffect(() => {
    const fetchAndSetSelfDescriptions = async () => {
      try {
        const response = await ApiService.getOneSelfDescriptions(
          authContext,
          resourceId
        );
        console.log("My fetched data: ", response);
        if (response) {
          setSelfDescriptionData(response);
        }
      } catch (error) {
        console.error("Error fetching self descriptions:", error);
      }
    };

    if (resourceId) {
      fetchAndSetSelfDescriptions();
    }
  }, []);

  return (
    <div className={styles["details-page-container"]}>
      <div>
        <DetailsCard cardData={selfDescriptionData} />
      </div>
      <div>
        <MapCard />
        <SidebarCard
          title="Offered by"
          subtitle="3D Mapping Solutions GmbH"
          text="We offer high-precision 3D map data of roads and urban environments for applications in autonomous driving, robotics, urban planning and navigation systems. "
        />
      </div>
    </div>
  );
}
