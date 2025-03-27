import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { Asset } from '../resources/helpers/resourceFilterHelper';

import styles from './SpecificFilterItemValue.module.css';

export interface ISpecificFilterItemProperty {
    currentAsset: Asset;
    updateAssetFilter: (asset: Asset) => void;
}

export const SpecificFilterItemValue: React.FC<ISpecificFilterItemProperty> = ({
  currentAsset,
  updateAssetFilter
}) => {
  const [value, setValue] = React.useState<any>(currentAsset.specificFilterValueSelected ?? null);

  React.useEffect(() => {
    setValue(currentAsset.specificFilterValueSelected ?? null);
  }, [currentAsset, currentAsset.specificFilterPossibleValues]);

  return (
    <div className={styles.filterItemValue}>
      <Autocomplete
        value={value}
        onChange={(event, newValue, reason) => {
          if (reason === 'clear') {
            updateAssetFilter({
              ...currentAsset,
              specificFilterValueSelected: null
            });
            setValue(null);
            return;
          }

          updateAssetFilter({ ...currentAsset, specificFilterValueSelected: newValue });
          setValue(newValue);
        }}
        options={currentAsset.specificFilterPossibleValues || []}
        getOptionLabel={(option) => {
          return String(option) || '';
        }}
        getOptionKey={(option) => String(option)}
        isOptionEqualToValue={(option, value) => String(option) === String(value)}
        clearOnEscape
        disableClearable={false}
        slotProps={{
          popupIndicator: { style: { display: 'none' } },
          clearIndicator: { style: { visibility: 'visible' } },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={'Value'}
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: true,
                sx: { fontWeight: 'bold' },
              },
            }}
          />
        )}
      />
    </div>
  );
};
