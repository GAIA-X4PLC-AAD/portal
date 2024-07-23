import { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SelfDescriptionContext } from '../../../../context/SelfDescriptionContext';
import DataField from '../../../../data-field/DataField';
import Text from '../../../Text/Text';
import Title from '../../../Title/Title';
import Divider from '../../../divider/Divider';
import Subtitle from '../../../subtitle/Subtitle';

import styles from './ResourceMainContent.module.css';

const ResourceMainContent: FC = () => {
  const { t } = useTranslation();
  const selfDescription = useContext(SelfDescriptionContext);
  const [name, setName] = useState<string | number | string[]>();
  const [description, setDescription] = useState<string | number | string[]>();
  const [generalPropertiesList, setGeneralPropertiesList] = useState<Array<{ [key: string]: string | number | string[] | undefined }>>();
  const [otherPropertiesList, setOtherPropertiesList] = useState<Array<{ [key: string]: string | number | string[] | undefined }>>();

  useEffect(() => {
    // Ensure cardData.items is an array and has data
    const propertiesList =
            selfDescription && selfDescription.items
              ? selfDescription.items.map((item) => item['properties(n)'])
              : [];

    // Temporary solution to extract name and description for our Card. Will be refactored once we have a better paylaod structure
    if (selfDescription && selfDescription.items && selfDescription.items.length > 0) {
      const propertiesN = selfDescription.items[0]['properties(n)'];
      setName(propertiesN.name);
      setDescription(propertiesN.description);
    }

    // Extracting the general properties from our propertiesList for Details part of our Card
    const listOfGeneralProperties = propertiesList.flatMap((properties) =>
      Object.entries(properties)
        .filter(([key, _]) => /general/i.test(key))
        .map(([key, value]) => ({ [key]: value }))
    );

    // Extracting the Related Offerings properties for lower part of our Card
    const listOfOtherProperties = propertiesList.flatMap((properties) =>
      Object.entries(properties)
        .filter(([key, _]) => !/general/i.test(key))
        .map(([key, value]) => ({ [key]: value }))
    );

    setGeneralPropertiesList(listOfGeneralProperties);
    setOtherPropertiesList(listOfOtherProperties);
  }, []);

  if (!selfDescription) {
    return <div>{t('resources.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <Title>{name as string}</Title>
      <Text>{description as string}</Text>
      <Divider />
      <Subtitle>General Information:</Subtitle>
      <div className={styles['details-grid-container']}>
        {generalPropertiesList &&
                generalPropertiesList.map((properties, index) =>
                  Object.entries(properties).map(([label, content]) => {
                    if (content !== 'Unknown') {
                      return (
                        <DataField
                          key={`${label}-${index}`}
                          label={label}
                          content={String(content)}
                        />
                      );
                    }
                  })
                )}
      </div>
      <Divider />
      <Subtitle>Details:</Subtitle>
      <div className={styles['details-grid-container']}>
        {otherPropertiesList &&
                otherPropertiesList.map((properties, index) =>
                  Object.entries(properties).map(([label, content]) => {
                    if (
                      label !== 'name' &&
                            label !== 'description' &&
                            content !== 'Unknown'
                    ) {
                      return (
                        <DataField
                          key={`${label}-${index}`}
                          label={label}
                          content={String(content)}
                        />
                      );
                    }
                  })
                )}
      </div>
    </div>
  );
};

export default ResourceMainContent;
