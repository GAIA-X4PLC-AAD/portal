/* test coverage not required */
import Main from 'common/components/layouts/Main';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import TextEntry from '../../common/components/fields/entry/TextEntry';
import Header from '../../common/components/header/Header';

const SupportPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('left-menu.support')}/>
      <Main>
        <TextEntry name={''} value={t('support.text-start')} />
        <TextEntry name={''} value={t('support.text-mid')} />
        <TextEntry name={''} value={t('support.text-end')} />
      </Main>
    </>
  );
}

export default SupportPage;
