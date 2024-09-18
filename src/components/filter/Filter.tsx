import { FC } from 'react';

import Title from '../Title/Title';
import { Asset } from '../resources/helpers/resourceFilterAssetHelper';

import styles from './Filter.module.css';
import { FilterSection } from './FilterSection';

interface IFilter {
    typeAssets: Asset[];
    formatAssets: Asset[];
    vendorAssets: Asset[];
    updateAssetFilter: (asset: Asset) => void;
}

const Filter: FC<IFilter> = ({ typeAssets, formatAssets, vendorAssets, updateAssetFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <Title>Filter</Title>
      <FilterSection subtitle="Type" assets={typeAssets} updateAssetFilter={updateAssetFilter}/>
      <FilterSection subtitle="Format" assets={formatAssets} updateAssetFilter={updateAssetFilter}/>
      <FilterSection subtitle="Vendor" assets={vendorAssets} updateAssetFilter={updateAssetFilter}/>
    </div>
  );
}

export default Filter;
