import { FC } from 'react';

import { Asset } from '../../hooks/filterAssets';
import Subtitle from '../subtitle/Subtitle';

import styles from './Filter.module.css';

interface IFilterSection {
    subtitle: string;
    assets: Asset[];
    toggleFilter: (filterName: string) => void;
}

export const FilterSection: FC<IFilterSection> = ({ subtitle, assets , toggleFilter }) => {
  return (
    <>
      <Subtitle>{subtitle}</Subtitle>
      {assets.map((item, index) => (
        <div className={styles.checkboxContainer} key={index}>
          <label className={styles.label}>
            <input
              type="checkbox"
              className={styles.checkbox}
              name={item.checkboxName}
              onChange={() => toggleFilter(item.checkboxName)}
            />
            {item.label}
          </label>
        </div>
      ))}
    </>
  );
}
