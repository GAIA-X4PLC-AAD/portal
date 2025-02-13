import classnames from 'classnames';
import {FC, ReactElement} from 'react';

import styles from './Text.module.css';

interface IText {
  className?: string;
  visible?: boolean;
  children?: ReactElement | string | (ReactElement | string)[];
}

const Text: FC<IText> = ({ className, visible = true, children }) => {
  if (!visible || !children) {
    return <></>
  }
  if (typeof children === 'string') {
    return <p className={classnames([className, styles.text])}>{children}</p>;
  }
  if (Array.isArray(children)) {
    return (<div>
      {
        children.map((child, index) => {
          if (typeof child === 'string') {
            return (<span key={index} className={classnames([className, styles.text])}>{child}</span>)
          }
          return <>{child}</>
        })
      }
    </div>)
  }
  return <>{children}</>
};

export default Text;
