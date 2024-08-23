import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContextProvider';
import { ApiService } from '../services/ApiService';

export interface Asset {
    checkboxName: string;
    label: string;
}

interface Filter {
    typeAssets: Asset[];
    formatAssets: Asset[];
    vendorAssets: Asset[];
}

export const useFilterAssets = (): Filter => {
  const authContext = useContext(AuthContext);
  const [typeAssets, setTypeAssets] = useState([]);

  useEffect(() => {
    ApiService
      .getResourceTypes(authContext)
      .then(resourceTypes =>
        setTypeAssets(
          resourceTypes.items[0].types.map((type: string) => ({
            checkboxName: type,
            label: type
          }))))
  }, []);

  return {
    typeAssets,
    formatAssets: [
      {
        checkboxName: 'openDrive',
        label: 'Opendrive',
      },
      {
        checkboxName: 'fbx',
        label: 'FBX',
      },
      {
        checkboxName: 'openScenario',
        label: 'OpenSCENARIO',
      },
    ],
    vendorAssets: [
      {
        checkboxName: 'threeDMapping',
        label: '3D Mapping',
      },
      {
        checkboxName: 'trainGraphics',
        label: 'TrainGraphics',
      },
      {
        checkboxName: 'dlr',
        label: 'DLR',
      },
    ],
  }
};
