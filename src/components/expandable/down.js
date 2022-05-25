import React from "react";
import cx from "classnames";
import PropTypes from 'prop-types';
import { Arrow } from "./style";

const Down = ({ isOpen }) => {
  return (
    <Arrow>
      <svg
        className={cx("icon-down", { "is-open": isOpen })}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        style={{'align-self': 'center'}}
      >
        <path d="M14.8 4L8 9.6 1.2 4 0 5.333 8 12l8-6.667z" />
      </svg>
    </Arrow>
  );
};
Down.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default Down;
