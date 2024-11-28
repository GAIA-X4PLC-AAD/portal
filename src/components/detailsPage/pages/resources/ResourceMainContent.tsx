/* test coverage not required */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Subtitle from '../../../../common/components/fields/subtitle/Subtitle';
import Text from '../../../../common/components/fields/text/Text';
import Title from '../../../../common/components/fields/title/Title';
import Markdown from '../../../../common/components/markdown/Markdown';
import { ResourceDetailsContext } from '../../../context/ResourceDetailsContext';

import styles from './ResourceMainContent.module.css';

const ResourceMainContent = () => {
  const { t } = useTranslation();
  const resourceDetails = useContext(ResourceDetailsContext);

  if (!resourceDetails) {
    return <></>;
  }

  return (
    <article className={styles['container']}>
      <Title>{resourceDetails.name}</Title>
      <Markdown>{resourceDetails.description}</Markdown>
      <div>
        <span style={{ fontWeight: 'bold' }}>{t('resources.provided-by')}:</span> {resourceDetails.legalName}
      </div>

      <Subtitle>{t('common.general-details')}</Subtitle>
      <table className={styles['table']}>
        <tbody>
          <tr>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.copyright-owned-by')}:</span> {resourceDetails.legalName}
              </div>
            </td>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.expiration-date-time')}:</span> {resourceDetails.expirationDateTime}
              </div>
            </td>
          </tr>

          <tr>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.license')}:</span> {resourceDetails.license}
              </div>
            </td>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.obsolete-date-time')}:</span> {resourceDetails.obsoleteDateTime}
              </div>
            </td>
          </tr>

          <tr>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.containsPII')}:</span> {resourceDetails.containsPII ? t('common.yes') : t('common.no')}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <Subtitle>{t('common.content-details')}</Subtitle>
      <table className={styles['table']}>
        <tbody>
          <tr>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.road-types')}:</span> {resourceDetails.roadTypes || t('common.not-specified')}
              </div>
            </td>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.level-of-detail')}:</span> {resourceDetails.levelOfDetail || t('common.not-specified')}
              </div>
            </td>
          </tr>

          <tr>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.lane-types')}:</span> {resourceDetails.laneTypes || t('common.not-specified')}
              </div>
            </td>
            <td className={styles['cell']}>
              <div>
                <span style={{ fontWeight: 'bold' }}>{t('resources.traffic-direction')}:</span> {resourceDetails.trafficDirection || t('common.not-specified')}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className={styles['table']}>
        <tbody>
          <tr>
            <td className={styles['cell']}>
              <Subtitle>{t('common.compatible-offerings')}</Subtitle>
            </td>
            <td className={styles['cell']}>
              <Subtitle>{t('common.directly-related-offerings')}</Subtitle>
              {
                resourceDetails.claimsGraphUri.map((uri, index) => (
                  <div key={index} className={styles['cell']}>
                    <Text key={index}>{uri}</Text>
                  </div>
                ))
              }
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

export default ResourceMainContent;
