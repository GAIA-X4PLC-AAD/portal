import React from "react";

import Title from "components/Title/Title";
import Subtitle from "../../components/subtitle/Subtitle";
import { useFilter } from "hooks/useFilter";
import { ResourceFilterState, useFilters } from "context/ResourceFilterContext";

import styles from "./Filter.module.css";

export default function Filter() {
  const { typeAssets, formatAssets, vendorAssets } = useFilter();
  const { toggleResourceFilter } = useFilters();

  return (
    <div className={styles.filterContainer}>
      <Title>Filter</Title>
      <Subtitle>Type</Subtitle>
      {typeAssets.map((item, index) => (
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
      <Subtitle>Format</Subtitle>
      {formatAssets.map((item, index) => (
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
      <Subtitle>Vendor</Subtitle>
      {vendorAssets.map((item, index) => (
        <div className={styles.checkboxContainer} key={index}>
          <label className={styles.label}>
            <input
              type="checkbox"
              className={styles.checkbox}
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
    </div>
  );
}
