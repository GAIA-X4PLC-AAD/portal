import { FC, ReactNode } from 'react';

import Vertical from '../layout/Vertical';

interface IResultContainer {
    children: ReactNode;
    visible: boolean;
}

const CardContainer: FC<IResultContainer> = ({ children, visible }) => {
  return (
    <Vertical>
      {visible && children}
    </Vertical>
  )
}

export default CardContainer;