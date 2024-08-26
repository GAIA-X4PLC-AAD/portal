import { FC, ReactNode } from 'react';

interface IResultContainer {
    children: ReactNode;
    visible: boolean;
}

const CardContainer: FC<IResultContainer> = ({ children, visible }) => {
  return (
    <div>
      {visible && children}
    </div>
  )
}

export default CardContainer;
