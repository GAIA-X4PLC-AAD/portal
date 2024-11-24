import React, { FC } from 'react';

import Title from '../../common/components/fields/title/Title';
import { Asset } from '../resources/helpers/resourceFilterHelper';

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
    <aside className={styles.filterContainer}>
      <Title className={styles.filterTitle}>Filter</Title>
      <FilterSection subtitle="Type" assets={typeAssets} updateAssetFilter={updateAssetFilter}/>
      <FilterSection subtitle="Format" assets={formatAssets} updateAssetFilter={updateAssetFilter}/>
      <FilterSection subtitle="Vendor" assets={vendorAssets} updateAssetFilter={updateAssetFilter}/>
    </aside>
  );
}

export default Filter;
