
import React, { useState,  useEffect } from "react";

import * as S from '../style';
import PropTypes from 'prop-types';


export const ColumnItem = ({ title, subtitle }) => {
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.any.isRequired,
}

// {
// 	"id": "1",
// 	"name": "name",
// 	"img_preview_url": "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
// 	"logo": "https://cdn.logo.com/hotlink-ok/logo-social.png",
// 	"ppr_name": "ppr name",
// 	"ppr_url": "http://localhost",
// 	"description": "description",
// 	"features": "features",
// 	"stack": "stack",
// 	"security": "security",
// 	"location": "location",
// 	"location_flag": "http://localhost",
// 	"last_updated": "2022-05-25",
// 	"category": "category",
// 	"tags": "tags",
// 	"terms_of_use": "terms of user",
// 	"dependent_services": []
// }

const DescriptionTabView = (props,) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    console.log(`DescriptionTab, props.data: ${props.data}`)

    if (props.data !== undefined) {
      setDetails(props.data)
    }

  }, [props.data]);

  return (
    <>

      <S.ExpandedContainer>
        <S.Image src={`${details['img_preview_url']}`} />
        <S.VerticalContainer horizontal='8px'>
          <S.Padding horizontal='8px'>
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
              <ColumnItem title='LOCATION' subtitle='Germany' />
              <ColumnItem title='CATEGORY' subtitle='Category' />
            </S.HorizontalContainer>
          </S.Padding>
        </S.VerticalContainer>

      </S.ExpandedContainer>
    </>
  )
}

DescriptionTabView.propTypes = {
  // serviceId: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

export default DescriptionTabView
