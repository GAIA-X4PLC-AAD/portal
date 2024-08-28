import { FC, ReactNode } from 'react';

interface IResultContainer {
    children: ReactNode;
    isLoaded: boolean;
}

const CardContainer: FC<IResultContainer> = ({ children, isLoaded }) => {
  return (
    <div className={'card-container'}>
      {isLoaded && children}
    </div>
  )
}

export default CardContainer;
