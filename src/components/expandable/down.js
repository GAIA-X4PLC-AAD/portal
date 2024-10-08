import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Arrow } from './style';

const Down = ({ isOpen, paddingRight, arrowColor }) => {
  return (
    <Arrow paddingRight={paddingRight}>
      <svg
        className={cx('rotate', { down: isOpen })}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill={arrowColor}
        style={{ alignSelf: 'center' }}
      >
        <path d="M14.8 4L8 9.6 1.2 4 0 5.333 8 12l8-6.667z" />
      </svg>
    </Arrow>
  );
};
Down.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  paddingRight: PropTypes.string,
  arrowColor: PropTypes.string,
};

export default Down;
