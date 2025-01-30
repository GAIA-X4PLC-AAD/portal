import CheckIcon from '@mui/icons-material/Check';
import SortIcon from '@mui/icons-material/Sort';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { FC, useState } from 'react';

import Svg from '../icon/Svg';

export type SortOrder = 'ASC_NAME' | 'DESC_NAME' | 'ASC_DATE' | 'DESC_DATE';
export interface menuItem {
  label: string,
  alias: string
}

interface ISortListButton {
    menuItems: menuItem[];
    updateSortOrder: (sortOrder: SortOrder) => void;
}

const SortListButton: FC<ISortListButton> = ({ menuItems, updateSortOrder }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [sortOrder, setSortOrder] = useState(0);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (alias: string, index: number) => {
    updateSortOrder(alias as SortOrder);
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
      >
        {menuItems.map((item: menuItem, index: number) => (
          <MenuItem
            key={item.label}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(item.alias, index)}
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
