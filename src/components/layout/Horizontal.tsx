import { FC, ReactNode } from 'react';
import './Horizontal.css'

interface IContainer {
    children: ReactNode;
    visible?: boolean;
}

const Horizontal: FC<IContainer> = ({ children, visible = true }) => {
  return (
    <div className={'horizontal'}>
      {visible && children}
    </div>
  )
}

export default Horizontal;
