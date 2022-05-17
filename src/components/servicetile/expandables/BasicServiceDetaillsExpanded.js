import React from 'react';

import * as S from './style';
import PropTypes from 'prop-types';

const ColumnItem = ({ title, subtitle }) => {
  return <>
    <S.Padding vertical='20px' horizontal='4px'>
      <S.VerticalContainer>
        <S.Subtitle>{title}</S.Subtitle>
        <S.Body>{subtitle}</S.Body>
      </S.VerticalContainer>
    </S.Padding>
  </>
}

ColumnItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

const BasicServiceDetailsExpanded = ( { serviceId, showImage = true } ) => {

  return (
    <>
      <S.ExpandedContainer>
        { showImage ? <S.Image src="https://images.pexels.com/photos/2458118/pexels-photo-2458118.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" /> : <></>}
        
        <S.VerticalContainer horizontal='8px'>
          <S.SmallPadding>
            <S.Title>Description</S.Title>
            <S.Body>The data (“Data”) is provided for your personal, internal use only and not for resale.  It is protected by copyright, and is subject to the following terms and conditions which are agreed to by you, on the one hand, and [OWNER] and its licensors (including their licensors and suppliers) on the other hand.</S.Body>

            <S.Padding vertical='8px' horizontal='0px'>
              <S.Subtitle>TAGS</S.Subtitle>
            </S.Padding>

            <S.HorizontalContainer>
              <S.Tag>Tag Name 1</S.Tag>
              <S.Tag>Tag Name 2</S.Tag>
              <S.Tag>Tag Name 3</S.Tag>
              <S.Tag>Tag Name 4</S.Tag>
            </S.HorizontalContainer>

            <S.HorizontalContainer>
              <ColumnItem title='STACK' subtitle='Stack' />
              <ColumnItem title='DATE' subtitle='01.05.2022' />
              <ColumnItem title='TERMS OF USE' subtitle='Terms of Use' />
              <ColumnItem title='LOCATION' subtitle='Germany'/>
              <ColumnItem title='CATEGORY' subtitle='Category'/>
            </S.HorizontalContainer>
          </S.SmallPadding>
        </S.VerticalContainer>

      </S.ExpandedContainer>
    </>
  )
}

BasicServiceDetailsExpanded.propTypes = {
  serviceId: PropTypes.string,
  showImage: PropTypes.bool,
}

export default BasicServiceDetailsExpanded


