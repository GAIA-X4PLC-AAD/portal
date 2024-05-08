import React from "react";
import Subtitle from "../subtitle/Subtitle";
import styles from "./Filter.module.css";
import { ResourceFilterState } from "../../context/ResourceFilterContext";

export const FilterSection: React.FC<{ subtitle: string, assets: any[], toggleResourceFilter: any }> = ({ subtitle, assets, toggleResourceFilter }) => {
    return (
        <>
            <Subtitle>{subtitle}</Subtitle>
            {assets.map((item, index) => (
                <div className={styles.checkboxContainer} key={index}>
                    <label className={styles.label}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            name={item.checkboxName}
                            onChange={() =>
                                toggleResourceFilter(
                                    item.checkboxName as keyof ResourceFilterState
                                )
                            }
                        />
                        {item.label}
                    </label>
                </div>
            ))}
        </>
    );
}