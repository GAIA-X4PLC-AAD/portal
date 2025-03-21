import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import TextEntry from '../../common/components/fields/entry/TextEntry';
import Header from '../../common/components/header/Header';
import Main from '../../common/components/layouts/Main';

const AboutPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('left-menu.about')}/>
      <Main>
        <TextEntry name={'info'} value={t('about.description')} />
      </Main>
    </>
  );
}

export default AboutPage;
