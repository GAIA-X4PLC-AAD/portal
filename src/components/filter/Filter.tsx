import { FC } from 'react';

import { Asset } from '../../hooks/filterAssets';
import Title from '../Title/Title';

import styles from './Filter.module.css';
import { FilterSection } from './FilterSection';

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
