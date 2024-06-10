import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Tabs = (props, { title }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <ul>
        {React.Children.map(props.children, (elem, index) => {
          let style = index === selectedIndex ? 'selected' : '';
          return (
            <li
              key={index}
              className={style}
              onClick={() => setSelectedIndex(index)}>
              {elem.props.title}
            </li>
          );
        })}

      </ul>
      <div className="tab">{props.children[selectedIndex]}</div>
    </>
  );
}

Tabs.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array,
};

export default Tabs;
