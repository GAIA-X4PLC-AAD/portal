import { FC } from "react";
import Title from "components/Title/Title";
import styles from "./Filter.module.css";
import { FilterSection } from "./FilterSection";
import { Asset } from "../../hooks/filterAssets";

interface FilterProps {
    typeAssets: Asset[];
    formatAssets: Asset[];
    vendorAssets: Asset[];
    toggleFilter: (filterName: string) => void;
}

const Filter: FC<FilterProps> = ({ typeAssets, formatAssets, vendorAssets, toggleFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <Title>Filter</Title>
      <FilterSection subtitle="Type" assets={typeAssets} toggleFilter={toggleFilter} />
      <FilterSection subtitle="Format" assets={formatAssets} toggleFilter={toggleFilter} />
      <FilterSection subtitle="Vendor" assets={vendorAssets} toggleFilter={toggleFilter} />
    </div>
  );
}

export default Filter;
