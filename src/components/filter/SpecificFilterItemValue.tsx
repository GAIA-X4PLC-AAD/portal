import * as React from 'react';

import { Asset } from '../resources/helpers/resourceFilterHelper';

export interface ISpecificFilterItemValue {
    currentAsset: Asset | undefined;
    assets: Asset[];
    updateAssetFilter: (asset: Asset) => void;
}

export const SpecificFilterItemValue: React.FC<ISpecificFilterItemValue> = ({
  currentAsset,
  assets,
  updateAssetFilter
}) => {
  return (
    <>
      {currentAsset && (<>defined</>)}
      {currentAsset === undefined && (<>
        <div>undefined</div>
      </>)}
    </>
  )
};
