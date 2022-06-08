
import React, { useState, useEffect } from "react";

import * as S from '../style';
import PropTypes from 'prop-types';
import { ColumnItem } from "./Common";
import { Image, Column } from "../../../../common/styles";
import { Columns } from "../dataPreview/style";
import DataPreview from "../dataPreview/DataPreview";


const DescriptionTabView = (props,) => {
  const [details, setDetails] = useState({});

  const providerLink = (data) => {
    return (<a href={data.ppr_url} target="_blank" rel="noreferrer">{data.ppr_name}</a>);
  }


  const buildCompositeServices = () => {
    if (details == undefined) { return }

    const data2 = details['dependent_services'] || [];
    return (
      <Columns>
        {data2.map(record => {
          let parsed = {
            headline: record.name,
            img_preview_url: record.img_preview_url,
            subline: providerLink(record),
            description: record.description,
            onDetailsClick: () => { return; }
          }
          return <DataPreview data={parsed} key={record.id} />
        })
        }
      </Columns>
    );
  }

  buildCompositeServices.propTypes = {
    data: PropTypes.array
  };

  useEffect(() => {

    if (props.data !== undefined) {
      console.log(`DescriptionTab, props.data['dependent_services']: ${props.data['dependent_services']}`)

      setDetails(props.data)
    }

  }, [props.data]);

  return (
    <>

      <Column>
        <S.ExpandedContainer>
          <Image src={`${details['img_preview_url']}`} minWidth='128px' maxWidth='256px' />
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
                <ColumnItem title='STACK' subtitle={`${details['stack']}`} />
                <ColumnItem title='DATE' subtitle={`${details['last_updated']}`} />
                <ColumnItem title='TERMS OF USE' subtitle={`${details['terms_of_use']}`} />
                <ColumnItem title='LOCATION' subtitle={`${details['location']}`} />
                <ColumnItem title='CATEGORY' subtitle={`${details['category']}`} />
              </S.HorizontalContainer>
            </S.Padding>
          </S.VerticalContainer>
        </S.ExpandedContainer>
        {console.log(`details['dependent_services']: ${details['dependent_services']}`)}
        {buildCompositeServices()}

      </Column>
    </>
  )
}

DescriptionTabView.propTypes = {
  // serviceId: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}

export default DescriptionTabView
