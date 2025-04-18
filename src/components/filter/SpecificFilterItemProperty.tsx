import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { Asset } from '../resources/helpers/resourceFilterHelper';

import styles from './SpecificFilterItemProperty.module.css';

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
  const [value, setValue] = React.useState<Asset | null>(currentAsset ?? null);

  React.useEffect(() => {
    setValue(currentAsset ?? null);
  }, [currentAsset]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue, reason) => {

        if (reason === 'clear') {
          if (value) {
            value.specificFilterSelected = false;
            updateAssetFilter('remove-filter', value);
            setValue(null);
          } else {
            updateAssetFilter('cancel-filter');
          }
          return;
        }

        if (reason === 'selectOption' && newValue !== null) {
          if (value === null) {
            newValue.specificFilterSelected = true;
            updateAssetFilter('add-filter', newValue);
          } else if (value.id !== newValue.id) {
            value.specificFilterSelected = false;
            newValue.specificFilterSelected = true;
            updateAssetFilter('change-filter', value, newValue);
          }
          setValue(newValue);
        }
      }}
      options={assets}
      getOptionLabel={(option) => {
        return String(option.label) || '';
      }}
      getOptionKey={(option) => String(option.id)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      clearOnEscape
      disableClearable={false} // Ensures the 'X' is always present
      clearIcon={
        <IconButton
          aria-label="clear"
          size="small"
          className={styles.iconButton}
        >
          <CloseIcon/>
        </IconButton>
      }
      slotProps={{
        popupIndicator: { style: { display: 'none' } }, // Hides the dropdown arrow
        clearIndicator: { style: { visibility: 'visible' } }, // Ensures 'X' is always visible
      }}
      renderOption={(props, option) => (
        <Tooltip title={`${option.id}`} arrow>
          <li {...props}>{option.label}</li>
        </Tooltip>
      )}
      renderInput={(params) => (
        <Tooltip title={value ? `${value.id}` : ''} arrow>
          <TextField
            {...params}
            label={'Property'}
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: true,
                sx: { fontWeight: 'bold' },
              },
            }}
          />
        </Tooltip>
      )}
    />
  );
};
