import React, { FC } from 'react';

import Subtitle from '../../common/components/fields/subtitle/Subtitle';
import { Asset } from '../resources/helpers/resourceFilterHelper';

import styles from './Filter.module.css';

interface IFilterSection {
    subtitle: string;
    assets: Asset[];
    updateAssetFilter: (asset: Asset) => void;
}

export const FilterSection: FC<IFilterSection> = ({ subtitle, assets, updateAssetFilter }) => {
  return (
    <section>
      <Subtitle className={styles.filterGroup}>{subtitle}</Subtitle>
      {assets.map((item) => (
        <div className={styles.checkboxContainer} key={`${item.type} ${item.id}`}>
          <label className={styles.label}>
            <input
              id={item.id}
              type="checkbox"
              className={styles.checkbox}
              name={item.label}
              checked={!item.disabled && item.value}
              onChange={() => updateAssetFilter({
                ...item,
                value: !item.value
              })}
              disabled={item.disabled}
            />
            {item.label}
          </label>
        </div>
      ))}
    </section>
  );
}
