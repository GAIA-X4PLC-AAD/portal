import React, { useContext } from 'react';

import TextEntry from '../../../common/components/fields/entry/TextEntry';
import Subtitle from '../../../common/components/fields/subtitle/Subtitle';
import Title from '../../../common/components/fields/title/Title';
import DetailsMainContent from '../../../common/components/layouts/DetailsMainContent';
import DetailsPropertyContainer from '../../../common/components/layouts/DetailsPropertyContainer';
import { ResourceDetailsContext } from '../../context/ResourceDetailsContext';
import { sortDataResources } from '../helpers/resourcesHelper';

import styles from './ResourceDetailMainContent.module.css';

const ResourceDetailMainContent = () => {
  const resourceDetails = useContext(ResourceDetailsContext);

  if (!resourceDetails) {
    return <></>;
  }

  return (
    <DetailsMainContent>
      <Title className={styles.title}>{resourceDetails.details.name}</Title>

      <Subtitle>info</Subtitle>
      <DetailsPropertyContainer>
        {Object.entries(resourceDetails.items[0].dataResource).map(([key, value], index) => (
          <TextEntry key={`entry_${index}`} name={key} value={value} />
        ))}
      </DetailsPropertyContainer>

      {sortDataResources(resourceDetails.items).map((item, index) => (
        <React.Fragment key={`item_${index}`}>
          <Subtitle>{item.resourceItemName}</Subtitle>
          <DetailsPropertyContainer>
            {Object.entries(item.other).map(([key, value], subIndex) => (
              <TextEntry key={`entry_${index}_${subIndex}`} name={key} value={value} />
            ))}
          </DetailsPropertyContainer>
        </React.Fragment>
      ))}

    </DetailsMainContent>
  );
}

export default ResourceDetailMainContent;
