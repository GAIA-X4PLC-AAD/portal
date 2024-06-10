import i18next from 'i18next';
import React from 'react';

import { Padding, ButtonText, Card, Circle, Row } from './styles';

const changeLanguage = ({ _lang }) => {
  i18next.changeLanguage(_lang, (err, t) => {
    if (err) {return console.log('something went wrong loading', err);}
    t('key');
  });
}
const buildLanguageItemView = ({ background = '#fff', name, icon, code }) => {
  return (
    <Padding vertical='8px'>
      <Card background={background} borderColor='#E9E9E9' onClick={() => changeLanguage({ _lang: code })}>
        <Padding vertical='4px' horizontal='16px'>
          <Row>
            <Circle radius='56px' borderColor='#0' background='#C4C4C4'>{code}</Circle>
            {/* <Image src={`/images/${icon}`} /> */}
            <Padding paddingLeft='16px' />
            <ButtonText color='#000000'>{name}</ButtonText>
            <Padding paddingLeft='148px' />
          </Row>
        </Padding>
      </Card>
    </Padding>
  )
}

export default buildLanguageItemView
