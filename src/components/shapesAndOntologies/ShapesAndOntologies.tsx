import styles from "./ShapesAndOntologies.module.css";
import Title from "../Title/Title";
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContextProvider";

const ShapesAndOntologies = () => {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <header className={styles["header-container"]}>
                <div className={styles["header-title"]}>
                    <Title>{t("left-menu.shapesAndOntologies")}</Title>
                </div>
            </header>
            <div className={styles["resource-content-container"]}>
                {authContext.isAuthenticated && (
                    <div className={styles.content}>
                        <div>
                            {!isLoading && <p>Loading...</p>}
                        </div>
                    </div>
                    )}
            </div>
            {!authContext.isAuthenticated && <p>You are not authenticated!</p>}
        </div>
    );
};

export default ShapesAndOntologies;
