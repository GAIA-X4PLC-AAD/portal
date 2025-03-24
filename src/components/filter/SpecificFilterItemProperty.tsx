import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { Asset } from '../resources/helpers/resourceFilterHelper';

export type SpecificFilterItemPropertyOperation =
    'add-filter' |
    'remove-filter' |
    'change-filter' |
    'cancel-filter';

export interface ISpecificFilterItemProperty {
    currentAsset: Asset | undefined;
    assets: Asset[];
    updateAssetFilter: (operation: SpecificFilterItemPropertyOperation, asset?: Asset, newAsset?: Asset) => void;
}

export const SpecificFilterItemProperty: React.FC<ISpecificFilterItemProperty> = ({
  currentAsset,
  assets,
  updateAssetFilter,
}) => {
  // Initialize local state with currentAsset (if defined).
  const [value, setValue] = React.useState<Asset | null>(currentAsset ?? null);

  // Sync local state when currentAsset prop changes.
  React.useEffect(() => {
    setValue(currentAsset ?? null);
  }, [currentAsset]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (newValue === null) {
          // Clear action (cancel filter)
          if (value) {
            value.specificFilterSelected = false;
          }
          updateAssetFilter('cancel-filter');
          setValue(null);
        } else {
          if (value === null) {
            // First selection (add filter)
            newValue.specificFilterSelected = true;
            updateAssetFilter('add-filter', newValue);
          } else if (value.id !== newValue.id) {
            // Changing selection (change filter)
            value.specificFilterSelected = false; // Unselect previous asset
            newValue.specificFilterSelected = true; // Select new asset
            updateAssetFilter('change-filter', value, newValue);
          }
          setValue(newValue);
        }
      }}
      options={assets}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      clearOnEscape
      renderInput={(params) => (
        <TextField
          {...params}
          label={value ? '' : 'Please select one'}
          variant="outlined"
        />
      )}
      sx={{ width: 300 }}
    />
  );
};
