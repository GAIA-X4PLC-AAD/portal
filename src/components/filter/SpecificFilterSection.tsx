import Subtitle from "common/components/fields/subtitle/Subtitle";
import { useState } from "react";

import styles from "./Filter.module.css";

interface ISpecificFilterSection {
  subtitle: string;
}

export const SpecificFilterSection: React.FC<ISpecificFilterSection> = ({
  subtitle,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleOnChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <section>
      {/* Title - One of the Types selected from the above Filters */}
      <Subtitle className={styles.filterGroup}>{subtitle}</Subtitle>

      {/* // Input field with dropdown regarding the properties for the selected Type */}
      <select
        id="Specific Filter Property"
        value={selectedValue}
        onChange={handleOnChange}
        className={styles.specificFiltersContainer}
      >
        <option value="Select a Specific Filter" disabled />
        <option>Specific Filter</option>

        {/* Array of Specifi Filters */}
      </select>

      {/* // Input field with dropdown regarding the values for the above selected property */}
    </section>
  );
};
