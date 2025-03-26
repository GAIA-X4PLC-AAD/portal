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

  console.log('Options:', currentAsset.specificFilterPossibleValues); // Debugging log

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
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        clearOnEscape
        disableClearable={false}
        renderInput={(params) => (
          <TextField
            {...params}
            label={!value ? 'Please select one' : ''}
            variant="outlined"
          />
        )}
      />
    </div>
  );
};
