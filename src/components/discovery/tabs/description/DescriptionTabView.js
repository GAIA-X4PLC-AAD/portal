
import React, { useState, useEffect } from "react";

import * as S from '../style';
import PropTypes from 'prop-types';
import { ColumnItem } from "./Common";


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
            <S.Title>{`${details['name']}`}</S.Title>
            <S.Body>{`${details['description']}`}</S.Body>

            <S.Padding vertical='8px' horizontal='0px'>
              <S.Subtitle>TAGS</S.Subtitle>
            </S.Padding>

            <S.HorizontalContainer>
              {details['tags'] && details['tags'].map((elem, i) => { return (<S.Tag key={i}>{elem}</S.Tag>) })}
            </S.HorizontalContainer>

            <S.HorizontalContainer>
              <ColumnItem title='STACK' subtitle={`${details['stack']}`}  />
              <ColumnItem title='DATE' subtitle={`${details['last_updated']}`}  />
              <ColumnItem title='TERMS OF USE' subtitle={`${details['terms_of_use']}`} />
              <ColumnItem title='LOCATION' subtitle={`${details['location']}`}  />
              <ColumnItem title='CATEGORY' subtitle={`${details['category']}`}  />
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
