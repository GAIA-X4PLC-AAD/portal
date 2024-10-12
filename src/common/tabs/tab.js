import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './tab.css';

export const Tab = ({ index, currentIndex, link }) => {
  if (link) {
    return <NavLink to={link}>
      <div className="tab-element">
        <div
          className={
            index === currentIndex
              ? 'tab-element-inside  tab-element-inside-active'
              : 'tab-element-inside'}>{index + 1}
        </div>
      </div>
    </NavLink>
  } else {
    return <div className="tab-element">
      <div
        className={
          index === currentIndex
            ? 'tab-element-inside  tab-element-inside-active'
            : 'tab-element-inside'}>{index + 1}</div>
    </div>
  }

};
Tab.propTypes = {
  index: PropTypes.number,
  currentIndex: PropTypes.number,
  link: PropTypes.string
};
