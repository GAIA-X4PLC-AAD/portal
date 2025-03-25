import * as React from 'react';

import { Asset } from '../resources/helpers/resourceFilterHelper';

import styles from './SpecificFilterItem.module.css';
import { SpecificFilterItemProperty, SpecificFilterItemPropertyOperation } from './SpecificFilterItemProperty';

export interface ISpecificFilterItem {
  currentAsset?: Asset | undefined;
    assets: Asset[];
  handleChange: (operation: FilterItemOperation, asset?: Asset, newAsset?: Asset) => void;
}

export type FilterItemOperation =
    'add-filter'
    | 'remove-filter'
    | 'change-filter'
    | 'cancel-filter'
    | 'filter-value-changed';

export const SpecificFilterItem: React.FC<ISpecificFilterItem> = ({ currentAsset, assets, handleChange }) => {

  const updatePropertyValue = (operation: SpecificFilterItemPropertyOperation, asset?: Asset, newAsset?: Asset) => {
    switch (operation) {
    case 'add-filter':
      asset && handleChange('add-filter', asset);
      break;
    case 'remove-filter':
      asset && handleChange('remove-filter', asset);
      break;
    case 'change-filter':
      asset && newAsset && handleChange('change-filter', asset, newAsset);
      break;
    case 'cancel-filter':
      handleChange('cancel-filter');
      break;
    default:
      console.warn(`Unsupported operation: ${operation}`);
    }
  };

  return (
    <div className={styles.specificFilterItem}>
      <SpecificFilterItemProperty currentAsset={currentAsset} assets={assets}
        updateAssetFilter={updatePropertyValue}/>
      {/*{(currentAsset &&*/}
      {/*      <SpecificFilterItemValue currentAsset={currentAsset} assets={assets}*/}
      {/*        updateAssetFilter={updateAssetFilter}/>)}*/}
    </div>
  )
};
