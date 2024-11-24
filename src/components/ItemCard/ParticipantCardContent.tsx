/* test coverage not required */
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import Title from '../../common/components/fields/title/Title';
import { Participant } from '../../types/participants.model';

import styles from './ItemCard.module.css';

interface IParticipantCardContent {
    participant: Participant
}

const ParticipantCardContent: FC<IParticipantCardContent> = ({ participant }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    const encodedUri = encodeURIComponent(participant.legalName);
    navigate(`/participants/${encodedUri}`);
  };

  return (
    <section className={styles.content}>
      <Title>{
        participant.legalName
      }
      </Title>
      <div className={styles.button}>
        <GaiaXButton
          label={t('details.more-details')}
          handleOnClick={handleNavigationToDetailsPage}
        />
      </div>
    </section>
  );
}

export default ParticipantCardContent;
