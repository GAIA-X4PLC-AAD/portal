import React, { FC, useEffect, useState } from "react";

import FilterCollapseToggleArrowDown from "../../assets/images/FilterCollapseToggleArrowDown.svg";
import FilterCollapseToggleArrowUp from "../../assets/images/FilterCollapseToggleArrowUp.svg";
import Subtitle from "../../common/components/fields/subtitle/Subtitle";
import { Asset } from "../resources/helpers/resourceFilterHelper";

import styles from "./Filter.module.css";

interface IFilterSection {
  subtitle: string;
  assets: Asset[];
  updateAssetFilter: (asset: Asset) => void;
}

export const FilterSection: FC<IFilterSection> = ({
  subtitle,
  assets,
  updateAssetFilter,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [filtersSelected, setFiltersSelected] = useState(0);

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleCheckboxSelected = (asset: Asset) => {
    updateAssetFilter({
      ...asset,
      value: !asset.value,
    });

    const selectCount = assets.filter(
      (a) => !a.disabled && a.id !== asset.id && a.value
    ).length;

    setFiltersSelected(selectCount + (!asset.value ? 1 : 0));
  };

  useEffect(() => {
    const selectedCount = assets.filter(
      (asset) => !asset.disabled && asset.value
    ).length;
    setFiltersSelected(selectedCount);
  }, [assets]);

  return (
    <section>
      <div className={styles.filterContainer}>
        <Subtitle className={styles.filterGroup}>{subtitle}</Subtitle>
        <div>
          {filtersSelected > 0 && (
            <span className={styles.selectedFilterCounter}>
              {filtersSelected}
            </span>
          )}
          <img
            className={styles.filterCollapseToggleArraow}
            src={
              collapsed
                ? FilterCollapseToggleArrowDown
                : FilterCollapseToggleArrowUp
            }
            alt="Toggle Arrow"
            onClick={handleToggleCollapsed}
          />
        </div>
      </div>

      {!collapsed &&
        assets.map((item) => (
          <div
            className={styles.checkboxContainer}
            key={`${item.type} ${item.id}`}
          >
            <label className={styles.label}>
              <input
                id={item.id}
                type="checkbox"
                className={styles.checkbox}
                name={item.label}
                checked={!item.disabled && item.value}
                onChange={() => handleCheckboxSelected(item)}
                disabled={item.disabled}
              />
              {item.label}
            </label>
          </div>
        ))}
    </section>
  );
};
