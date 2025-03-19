import React, { useState } from 'react';

import Vertical from '../../common/components/layouts/Vertical';
import { Asset } from '../resources/helpers/resourceFilterHelper';

import { SpecificFilterItem } from './SpecificFilterItem';

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

  return (
    <>
      <div>Specific filters:</div>
      <button onClick={handleAddNew}>Add Filter</button>
      <Vertical>
        {addNew && (
          <SpecificFilterItem
            currentAsset={null}
            assets={assets}
            updateAssetFilter={updateAssetFilter}
            key="new-filter" // Added key for the new item
          />
        )}
        {assets.map((asset) =>
          asset?.specificFilterValueSelected && (
            <SpecificFilterItem
              key={asset.id}
              currentAsset={asset}
              assets={assets}
              updateAssetFilter={updateAssetFilter}
            />
          )
        )}
      </Vertical>
    </>
  );
};
