import styles from "./ShapesAndOntologies.module.css";
import Title from "../Title/Title";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import car from "../../assets/car.gif";
import { ApiService } from "../../services/ApiService";
import { mapOntologies, mapShapesAndOntologies, Ontology } from "../../utils/dataMapper";
import SelfDescriptionCard from "../cards/SelfDescriptionCard";
import { AuthContextValues } from "../../context/AuthContextValues";

const ShapesAndOntologies = () => {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [ontologies, setOntologies] = useState<Ontology[]>([]);

    const fetchOntologies = async (authContext: AuthContextValues) => {
        const response = await ApiService.getAllSchemas(authContext);
        const ontologiesStringArray = mapShapesAndOntologies(response);
        const promises = ontologiesStringArray.map((item) => ApiService.getSchemaWithId(authContext, item));
        return await Promise.all(promises);
    };

    useEffect(() => {
        const loadOntologies = async () => {
            setIsLoading(true);
            try {
                const ontologyPromises = await fetchOntologies(authContext);
                const ontologiesDetailed = mapOntologies(ontologyPromises);
                setOntologies(ontologiesDetailed);
            } catch (error) {
                console.error("Error fetching self descriptions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadOntologies();
    }, []);

    return (
        <div>
            <header className={styles["header-container"]}>
                <div className={styles["header-title"]}>
                    <Title>{t("left-menu.shapesAndOntologies")}</Title>
                </div>
            </header>
            <div className={styles["shapesAndOntologies-content-container"]}>
                {authContext.isAuthenticated && (
                    <div className={styles.content}>
                        <div>
                            {!isLoading && ontologies.length > 0 ? (
                                ontologies.map((ontology, index) => (
                                    <SelfDescriptionCard
                                        key={index}
                                        label={t("ontologies.title")}
                                        name={ontology.base}
                                        description={<> {"Label: " + ontology.label} <br /> {"Version: " + ontology.version} <br /> {"Contributor: " + ontology.contributors.join(", ")} </>}                                        selfDescription={ontology}
                                    />
                                ))
                            ) : (
                                <div className="newCarLoader">
                                    <img src={car} alt="loading..." className="car"/>
                                </div>
                            )}
                        </div>
                    </div>
                    )}
            </div>
            {!authContext.isAuthenticated && <p>You are not authenticated!</p>}
        </div>
    );
};

export default ShapesAndOntologies;
