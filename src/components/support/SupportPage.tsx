import Main from 'common/components/layouts/Main';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../../common/components/header/Header';

const SupportPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('left-menu.support')}/>
      <Main>
      </Main>
    </>
  );
}

export default SupportPage;
