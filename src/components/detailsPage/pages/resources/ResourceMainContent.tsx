import Title from 'components/Title/Title';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Text from '../../../../common/components/fields/Text/Text';
import Markdown from '../../../../common/components/markdown/Markdown';
import { ResourceDetailsContext } from '../../../../context/ResourceDetailsContext';
import SectionHeader from '../../../sectionHeader/Sectionheader';

import styles from './ResourceMainContent.module.css';

const ResourceMainContent = () => {
  const { t } = useTranslation();
  const resourceDetails = useContext(ResourceDetailsContext);

  if (!resourceDetails) {
    return <>{t('resources.not-found')}</>;
  }

  return (
    <div className={styles['container']}>
      <Title>{resourceDetails.name}</Title>
      <Markdown>{resourceDetails.description}</Markdown>
      <Text>
        <span style={{ fontWeight: 'bold' }}>{t('resources.provided-by')}:</span> {resourceDetails.legalName}
      </Text>

      <SectionHeader>{t('common.general-details')}</SectionHeader>

      <table className={styles['table']}>
        <tbody>
          <tr>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.copyright-owned-by')}:</span> {resourceDetails.legalName}
              </Text>
            </td>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.expiration-date-time')}:</span> {resourceDetails.expirationDateTime}
              </Text>
            </td>
          </tr>

          <tr>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.license')}:</span> {resourceDetails.license}
              </Text>
            </td>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.obsolete-date-time')}:</span> {resourceDetails.obsoleteDateTime}
              </Text>
            </td>
          </tr>

          <tr>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.containsPII')}:</span> {resourceDetails.containsPII ? t('common.yes') : t('common.no')}
              </Text>
            </td>
          </tr>
        </tbody>
      </table>

      <SectionHeader>{t('common.content-details')}</SectionHeader>

      <table className={styles['table']}>
        <tbody>
          <tr>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.road-types')}:</span> {resourceDetails.roadTypes || t('common.not-specified')}
              </Text>
            </td>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.level-of-detail')}:</span> {resourceDetails.levelOfDetail || t('common.not-specified')}
              </Text>
            </td>
          </tr>

          <tr>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.lane-types')}:</span> {resourceDetails.laneTypes || t('common.not-specified')}
              </Text>
            </td>
            <td className={styles['cell']}>
              <Text>
                <span style={{ fontWeight: 'bold' }}>{t('resources.traffic-direction')}:</span> {resourceDetails.trafficDirection || t('common.not-specified')}
              </Text>
            </td>
          </tr>
        </tbody>
      </table>

      <table className={styles['table']}>
        <tbody>
          <tr>
            <td className={styles['cell']}>
              <SectionHeader>{t('common.compatible-offerings')}</SectionHeader>
            </td>
            <td className={styles['cell']}>
              <SectionHeader>{t('common.directly-related-offerings')}</SectionHeader>
              {resourceDetails.claimsGraphUri.map((uri, index) => (
                <div key={index} className={styles['cell']}>
                  <Text key={index}>{uri}</Text>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ResourceMainContent;
