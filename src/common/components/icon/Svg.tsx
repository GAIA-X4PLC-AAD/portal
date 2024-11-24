import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import classnames from 'classnames'
import React, { FC } from 'react'

import styles from './Svg.module.css';

interface MenuIconProps {
    onClick: () => void;
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
    className?: string;
    visible?: boolean
}

const Svg: FC<MenuIconProps> = ({ onClick, Icon, className, visible = true }) => {
  if (!visible) {
    return <></>
  }

  return (
    <div
      className={classnames([className, styles.icon])}
      onClick={onClick}
    >
      <Icon style={{ fill: 'var(--normal-button--bg-color)' }}/>
    </div>
  )
}

export default Svg;
