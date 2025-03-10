import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import classnames from 'classnames'
import React, { FC } from 'react'

import styles from './Svg.module.css';

interface MenuIconProps {
    onClick: ((event: React.MouseEvent<HTMLElement>) => void) | (() => void);
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
    className?: string;
    visible?: boolean
    children?: React.ReactNode | string;
}

const Svg: FC<MenuIconProps> = ({ children, onClick, Icon, className, visible = true }) => {
  if (!visible) {
    return <></>
  }

  return (
    <div
      className={classnames([className, styles.iconContainer])}
      onClick={onClick}
    >
      <Icon/>
      {children && <div className={styles.iconChildContainer}>{children}</div>}
    </div>
  )
}

export default Svg;
