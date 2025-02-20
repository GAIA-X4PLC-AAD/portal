import CheckIcon from '@mui/icons-material/Check';
import SortIcon from '@mui/icons-material/Sort';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { FC, useState } from 'react';

import Svg from '../icon/Svg';

import styles from './SortListButton.module.css';

export enum SortOrder {
    // eslint-disable-next-line no-unused-vars
    ASC_NAME = 'ASC_NAME',
    // eslint-disable-next-line no-unused-vars
    DESC_NAME = 'DESC_NAME',
    // eslint-disable-next-line no-unused-vars
    ASC_DATE = 'ASC_DATE',
    // eslint-disable-next-line no-unused-vars
    DESC_DATE = 'DESC_DATE'
}

export interface MenuItemObject {
  label: string,
  sortOrder: SortOrder
}

export interface ISortListButton {
    menuItemsObjects: MenuItemObject[];
    updateSortOrder: (sortOrder: SortOrder) => void;
}

const SortListButton: FC<ISortListButton> = ({ menuItemsObjects, updateSortOrder }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [sortOrder, setSortOrder] = useState(0);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (sortOrder: SortOrder, index: number) => {
    updateSortOrder(sortOrder);
    setSortOrder(index);
    setSelectedIndex(index);
    handleClose();
  };

  return (
    <>
      <Svg Icon={SortIcon} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: styles.menu }}
      >
        {menuItemsObjects.map((item: MenuItemObject, index: number) => (
          <MenuItem
            key={item.label}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(item.sortOrder, index)}
            onMouseEnter={() => setSelectedIndex(index)}
            onMouseLeave={() => setSelectedIndex(null)}
          >
            <ListItemIcon>
              {index === sortOrder && <CheckIcon fontSize="small" />}
            </ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default SortListButton;
