import { FC } from 'react';

import { FilterSection } from '/components/filter/FilterSection';
import Title from '/components/Title/Title';
import { Asset } from '/hooks/filterAssets';

import styles from './Filter.module.css';

interface IFilter {
    typeAssets: Asset[];
    formatAssets: Asset[];
    vendorAssets: Asset[];
    toggleFilter: (filterName: string) => void;
}

const Filter: FC<IFilter> = ({ typeAssets, formatAssets, vendorAssets, toggleFilter }) => {
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
