import React, { FC } from 'react';

import Title from '../../common/components/fields/title/Title';
import { Asset } from '../resources/helpers/resourceFilterHelper';

import styles from './Filter.module.css';
import { FilterSection } from './FilterSection';
import { SpecificFilters } from './SpecificFilters';

interface IFilter {
  typeAssets: Asset[];
  formatAssets: Asset[];
  vendorAssets: Asset[];
    specificAssets: Asset[];
  updateAssetFilter: (asset: Asset) => void;
  visible?: boolean;
}

const Filter: FC<IFilter> = ({
  typeAssets,
  formatAssets,
  vendorAssets,
  specificAssets,
  updateAssetFilter,
  visible,
}) => {
  return (
    <aside className={visible ? styles.visible : styles.hidden}>
      <Title className={styles.filterTitle}>Filters</Title>
      <FilterSection
        subtitle="Type"
        assets={typeAssets}
        updateAssetFilter={updateAssetFilter}
      />
      <FilterSection
        subtitle="Format"
        assets={formatAssets}
        updateAssetFilter={updateAssetFilter}
      />
      <FilterSection
        subtitle="Vendor"
        assets={vendorAssets}
        updateAssetFilter={updateAssetFilter}
      />
      <SpecificFilters assets={specificAssets} updateAssetFilter={updateAssetFilter}/>
    </aside>
  )
};

export default Filter;
