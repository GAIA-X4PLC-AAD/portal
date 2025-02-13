import classnames from 'classnames'

import styles from './Subtitle.module.css';

interface ISubtitle {
  children: string;
  className?: string;
}

export default function Subtitle({ children, className }: Readonly<ISubtitle>) {
  return <h3 className={classnames([className, styles.subtitle])}>{children}</h3>;
}
