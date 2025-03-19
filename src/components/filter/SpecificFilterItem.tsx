import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { Asset } from '../resources/helpers/resourceFilterHelper';

const filter = createFilterOptions<Asset>();

export interface ISpecificFilterItem {
    currentAsset: Asset | null;
    assets: Asset[];
    updateAssetFilter: (asset: Asset) => void;
}

export const SpecificFilterItem: React.FC<ISpecificFilterItem> = ({ currentAsset, assets, updateAssetFilter }) => {
  return (
    <Autocomplete
      value={currentAsset}
      onChange={(event, newValue) => {
        if (newValue) {
          updateAssetFilter({ ...newValue, specificFilterSelected: true });
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      options={assets.sort((a, b) => {
        if (a.type === b.type) {
          return a.label.localeCompare(b.label);
        }
        return a.type.localeCompare(b.type);
      })}
      getOptionLabel={(option) => `${option.label} - ${option.id}`}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Asset"
          variant="outlined"
          // Ensure the default arrow is not overridden
          InputProps={{
            ...params.InputProps,
            endAdornment: params.InputProps.endAdornment, // Preserve the dropdown arrow
          }}
        />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <strong>{params.group}</strong>
          <ul style={{ padding: 0, margin: 0 }}>{params.children}</ul>
        </li>
      )}
      sx={{ width: 300 }}
    />
  );
};
