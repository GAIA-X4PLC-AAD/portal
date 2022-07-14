
import React, { useState, useEffect } from "react";

import * as S from '../style';
import PropTypes from 'prop-types';
import { ColumnItem } from "./Common";
<<<<<<< HEAD
import { Image, Column, Style, Tag, BlueButton } from "../../../../common/styles";
=======
import { Image, Column, Style, Tag, Padding } from "../../../../common/styles";
>>>>>>> 6c0b2c58a9c8eced34330e434a8fb5f37f73d6ff
import { Columns } from "../dataPreview/style";
import DataPreview from "../dataPreview/DataPreview";
import { useNavigate } from "react-router-dom";


const DescriptionTabView = (props,) => {
  const [details, setDetails] = useState({});

  const navigate = useNavigate();

  const providerLink = (data) => {
    // return (<a href={data.ppr_url} target="_blank" rel="noreferrer">{data.ppr_name}</a>);
    return data.ppr_name;
  }


  const buildCompositeServices = () => {
    if (details == undefined || props.params['type'] != 'composite-service') { return }

    const data2 = details['dependent_services'] || [];

    if (data2.length == 0) return;

    return (
      <>
        <Columns>
          {data2.map((record, index) => {
            let parsed = {
              headline: record.name,
              img_preview_url: record.img_preview_url,
              subline: providerLink(record),
              description: record.description,
              onDetailsClick: () => { return; }
            }
            return <Style marginLeft={index == 0 ? '0px' : '10px'} marginTop={'36px'} key={record.id}>
              <DataPreview data={parsed} width='230px' minHeight='' shouldShowDetailsButton={false} />
            </Style>
          })
          }
        </Columns>

      </>

    );
  }

  buildCompositeServices.propTypes = {
    data: PropTypes.array
  };

  const showBookButton = () => {
    if (props.params['type'] != 'composite-service') return null;
    return (
      <Style marginTop='auto' marginBottom='auto'>
    <BlueButton marginLeft='0px' onClick={() => { navigate(`/sp/${details['id']}`) }}>
      Book
    </BlueButton>
    </Style>
    );

  }
  useEffect(() => {

    if (props.data !== undefined) {
      setDetails(props.data)
    }

  }, [props.data]);

  return (
    <>
<<<<<<< HEAD
      <Column>
        <S.ExpandedContainer>
          <Image src={`${details['img_preview_url']}`} width='279px' height='328px' />
          <S.VerticalContainer horizontal='8px'>
            <S.Padding horizontal='8px'>
              <S.Title>{`${details['name']}`}</S.Title>
              <S.Body>{`${details['description']}`}</S.Body>
              {showBookButton()}
              <S.Padding vertical='8px' horizontal='0px'>
                <S.Subtitle>TAGS</S.Subtitle>
=======
      <Padding paddingTop='16px' paddingBottom='26px'>
        <Column>
          <S.ExpandedContainer>
            <Image src={`${details['img_preview_url']}`} width='279px' height='328px' />
            <S.VerticalContainer horizontal='8px'>
              <S.Padding horizontal='8px'>
                <S.Title>{`${details['name']}`}</S.Title>
                <S.Body>{`${details['description']}`}</S.Body>

                <S.Padding vertical='8px' horizontal='0px'>
                  <S.Subtitle>TAGS</S.Subtitle>
                </S.Padding>

                <S.HorizontalContainer>
                  {details['tags'] && details['tags'].map((elem, i) => { return (<Tag key={`${elem}:${i}`}>{elem}</Tag>) })}
                </S.HorizontalContainer>

                <S.HorizontalContainer>
                  {details['certificates'] && details['certificates'].map((elem, i) => { return (<Tag key={`${elem}:${i}`}>{elem}</Tag>) })}
                </S.HorizontalContainer>

                <S.HorizontalContainer>
                  <ColumnItem title='STACK' subtitle={`${details['stack']}`} />
                  <ColumnItem title='DATE' subtitle={`${details['last_updated']}`} />
                  <ColumnItem title='TERMS OF USE' subtitle={`${details['terms_of_use']}`} />
                  <ColumnItem title='LOCATION' subtitle={`${details['location']}`} />
                  <ColumnItem title='SECURITY' subtitle={`${details['security']}`} />
                  <ColumnItem title='CATEGORY' subtitle={`${details['category']}`} />
                </S.HorizontalContainer>
>>>>>>> 6c0b2c58a9c8eced34330e434a8fb5f37f73d6ff
              </S.Padding>
            </S.VerticalContainer>
          </S.ExpandedContainer>

          {buildCompositeServices()}

        </Column>
      </Padding>
    </>
  )
}

DescriptionTabView.propTypes = {
  // serviceId: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  params: PropTypes.object,
}

export default DescriptionTabView
