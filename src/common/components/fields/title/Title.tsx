import classnames from 'classnames';
import {FC} from 'react';

import styles from './Title.module.css';

interface ITitle {
  children: string;
  className?: string;
}

const Title: FC<ITitle> = ({ className, children }) => {
  return <h2 className={classnames([className, styles.title])}>{children}</h2>;
};

export default Title;
