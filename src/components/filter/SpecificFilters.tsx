import React, { useState } from 'react';

import Vertical from '../../common/components/layouts/Vertical';
import { Asset } from '../resources/helpers/resourceFilterHelper';

import { FilterItemOperation, SpecificFilterItem } from './SpecificFilterItem';

export interface ISpecificFilters {
    assets: Asset[];
    updateAssetFilter: (asset: Asset) => void;
}

export const SpecificFilters: React.FC<ISpecificFilters> = ({ assets, updateAssetFilter }) => {
  const [addNew, setAddNew] = useState<boolean>(false);

  const handleAddNew = () => {
    setAddNew(true); // Toggle to true to show the new filter item
  };

  const handleSelected = () => {
    setAddNew(false); // Toggle to true to show the new filter item
  };

  const handleChange = (opration: FilterItemOperation, asset?: Asset, newAsset?: Asset): void => {
    switch (opration) {
    case 'add-filter':
      asset && updateAssetFilter(asset);
      handleSelected();
      break;
    case 'remove-filter':
      asset && updateAssetFilter(asset);
      break;
    case 'change-filter':
      asset && updateAssetFilter(asset);
      newAsset && updateAssetFilter(newAsset);
      break;
    case 'cancel-filter':
      handleSelected();
      break;
    default:
      console.warn(`Unsupported operation: ${opration}`);
    }
  }

  return (
    <>
      <div>Specific filters:</div>
      <button onClick={handleAddNew}>Add Filter</button>
      <Vertical>
        {addNew && (
          <SpecificFilterItem
            assets={assets}
            handleChange={handleChange}
            key="new-filter" // Added key for the new item
          />
        )}
        {assets.map((asset) =>
          asset?.specificFilterValueSelected && asset.specificFilterSelected === true && (
            <SpecificFilterItem
              key={asset.id}
              currentAsset={asset}
              assets={assets}
              handleChange={handleChange}
            />
          )
        )}
      </Vertical>
    </>
  );
};
