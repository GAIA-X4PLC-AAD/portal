import CheckIcon from '@mui/icons-material/Check';
import SortIcon from '@mui/icons-material/Sort';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { FC, useState } from 'react';

import { SortOrder } from '../../../components/resources/helpers/resourceFilterReducer';
import Svg from '../icon/Svg';

interface ISortListButton {
    menuItems: string[];
    updateSortOrder: (sortOrder: SortOrder) => void;
}

const SortListButton: FC<ISortListButton> = ({ menuItems, updateSortOrder }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index: number) => {
    switch (index) {
    case 0:
      updateSortOrder('ASC_NAME');
      break;
    case 1:
      updateSortOrder('DESC_NAME');
      break;
    case 2:
      updateSortOrder('ASC_DATE');
      break;
    case 3:
      updateSortOrder('DESC_DATE');
      break;
    }
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
        {menuItems.map((item: string, index: number) => (
          <MenuItem
            key={item}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
            onMouseEnter={() => setSelectedIndex(index)}
            onMouseLeave={() => setSelectedIndex(null)}
          >
            <ListItemIcon>
              {index === sortOrder && <CheckIcon fontSize="small" />}
            </ListItemIcon>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default SortListButton;
