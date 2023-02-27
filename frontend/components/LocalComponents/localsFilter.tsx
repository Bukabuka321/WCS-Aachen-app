import React from "react";
import styles from "../../styles/localsFilter.module.css";
import { ILocalsFiltersProps } from "../../types/interfaces";

const LocalsFilter = (props: ILocalsFiltersProps) => {
  const { isChecked, label, handleChange } = props;

  return (
    <div className={styles.container}>
      <div className={styles.labelBox}>{label} </div>
      <div className={styles.toggle_switch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={!!isChecked}
          name={label}
          id={label}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
};

export default LocalsFilter;
