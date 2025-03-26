import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';

import Vertical from '../../common/components/layouts/Vertical';
import { Asset } from '../resources/helpers/resourceFilterHelper';

import { FilterItemOperation, SpecificFilterItem } from './SpecificFilterItem';
import styles from './SpecificFilters.module.css';

export interface ISpecificFilters {
    assets: Asset[];
    updateAssetFilter: (asset: Asset) => void;
}

export const SpecificFilters: React.FC<ISpecificFilters> = ({ assets, updateAssetFilter }) => {
  const [addNew, setAddNew] = useState<boolean>(false);

  const handleAddNew = () => {
    setAddNew(true); // Toggle to true to show the new filter item
  };

  const handleSelect = () => {
    setAddNew(false); // Toggle to true to show the new filter item
  };

  const handleChange = (operation: FilterItemOperation, asset?: Asset, newAsset?: Asset): void => {
    switch (operation) {
    case 'add-filter':
      asset && updateAssetFilter(asset);
      handleSelect();
      break;
    case 'remove-filter':
      asset && updateAssetFilter(asset);
      handleSelect();
      break;
    case 'change-filter':
      asset && updateAssetFilter(asset);
      newAsset && updateAssetFilter(newAsset);
      break;
    case 'cancel-filter':
      handleSelect();
      break;
    case 'filter-value-changed':
      asset && updateAssetFilter(asset);
      break;
    default:
      console.warn(`Unsupported operation: ${operation}`);
    }
  }

  return (
    <div className={styles.specificFiltersGroup}>
      <div className={styles.specificFiltersTitle}>Specific filters</div>
      <Vertical className={styles.specificFilters}>
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
        {addNew && (
          <SpecificFilterItem
            assets={assets.filter((asset) => !asset.specificFilterSelected && asset?.specificFilterPossibleValues
            )}
            handleChange={handleChange}
            key="new-filter" // Added key for the new item
          />
        )}
      </Vertical>
      <Tooltip title="Add specific filter" arrow>
        <IconButton
          aria-label="add"
          size="small"
          onClick={handleAddNew}
          className={styles.iconButton} // Apply styles from module
        >
          <AddIcon/>
        </IconButton>
      </Tooltip>
    </div>
  );
};
