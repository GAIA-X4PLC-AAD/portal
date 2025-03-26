/* test coverage not required */
import * as React from 'react';

import { Asset } from '../resources/helpers/resourceFilterHelper';

import styles from './SpecificFilterItem.module.css';
import { SpecificFilterItemProperty, SpecificFilterItemPropertyOperation } from './SpecificFilterItemProperty';
import { SpecificFilterItemValue } from './SpecificFilterItemValue';

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

  const updateProperty = (operation: SpecificFilterItemPropertyOperation, asset?: Asset, newAsset?: Asset) => {
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

  const updateValue = (asset: Asset) => {
    handleChange('filter-value-changed', asset);
  };

  return (
    <div className={styles.specificFilterItem}>
      <SpecificFilterItemProperty currentAsset={currentAsset} assets={assets}
        updateAssetFilter={updateProperty}/>
      {(currentAsset &&
          <SpecificFilterItemValue currentAsset={currentAsset}
            updateAssetFilter={updateValue}/>)}
    </div>
  )
};
