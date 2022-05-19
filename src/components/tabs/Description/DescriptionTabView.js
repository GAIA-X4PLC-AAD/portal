
import React, { useState, useRef, useEffect } from "react";

import * as S from './style';
import '../../../common/styles';
import PropTypes from 'prop-types';


import { HorizontalContainer, VerticalContainer,  } from "../../../common/styles";

const ColumnItem = ({ title, subtitle }) => {
  return <>
    <S.Padding vertical='20px' horizontal='4px'>
      <VerticalContainer>
        <S.Subtitle>{title}</S.Subtitle>
        <S.Body>{subtitle}</S.Body>
      </VerticalContainer>
    </S.Padding>
  </>
}

ColumnItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

const DescriptionTabView = (props,) => {

  useEffect(() => {
    console.log(`DescriptionTab, props.data: ${props.data}`)
  }, [props.data]);

  return (
    <>

      <S.ExpandedContainer>
        <S.Image src="https://images.pexels.com/photos/2458118/pexels-photo-2458118.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        <VerticalContainer horizontal='8px'>
          <S.Padding horizontal='8px'>
            <S.Title>Description</S.Title>
            <S.Body>The data (“Data”) is provided for your personal, internal use only and not for resale.  It is protected by copyright, and is subject to the following terms and conditions which are agreed to by you, on the one hand, and [OWNER] and its licensors (including their licensors and suppliers) on the other hand.</S.Body>

            <S.Padding vertical='8px' horizontal='0px'>
              <S.Subtitle>TAGS</S.Subtitle>
            </S.Padding>

            <HorizontalContainer>
              <S.Tag>Tag Name 1</S.Tag>
              <S.Tag>Tag Name 2</S.Tag>
              <S.Tag>Tag Name 3</S.Tag>
              <S.Tag>Tag Name 4</S.Tag>
            </HorizontalContainer>

            <HorizontalContainer>
              <ColumnItem title='STACK' subtitle='Stack' />
              <ColumnItem title='DATE' subtitle='01.05.2022' />
              <ColumnItem title='TERMS OF USE' subtitle='Terms of Use' />
              <ColumnItem title='LOCATION' subtitle='Germany' />
              <ColumnItem title='CATEGORY' subtitle='Category' />
            </HorizontalContainer>
          </S.Padding>
        </VerticalContainer>

      </S.ExpandedContainer>
    </>
  )
}

DescriptionTabView.propTypes = {
  // serviceId: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

export default DescriptionTabView
