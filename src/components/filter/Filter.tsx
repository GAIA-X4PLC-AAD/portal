import React from "react";

import Title from "components/Title/Title";
import { useFilter } from "hooks/useFilter";
import { useFilters } from "context/ResourceFilterContext";

import styles from "./Filter.module.css";
import { FilterSection } from "./FilterSection";

export default function Filter() {
  const { typeAssets, formatAssets, vendorAssets } = useFilter();
  const { toggleResourceFilter } = useFilters();

  return (
    <div className={styles.filterContainer}>
      <Title>Filter</Title>
      <FilterSection subtitle="Type" assets={typeAssets} toggleResourceFilter={toggleResourceFilter} />
      <FilterSection subtitle="Format" assets={formatAssets} toggleResourceFilter={toggleResourceFilter} />
      <FilterSection subtitle="Vendor" assets={vendorAssets} toggleResourceFilter={toggleResourceFilter} />
    </div>
  );
}
