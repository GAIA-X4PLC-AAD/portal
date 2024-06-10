import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Image, Column, Style, Tag, Padding, BlueButton } from '../../../../common/styles';
import DataPreview from '../dataPreview/DataPreview';
import { Columns } from '../dataPreview/style';
import * as S from '../style';

import { ColumnItem } from './Common';

const DescriptionTabView = (props,) => {
  const [details, setDetails] = useState({});

  const { t } = useTranslation();

  const navigate = useNavigate();

  const providerLink = (data) => {
    // return (<a href={data.ppr_url} target="_blank" rel="noreferrer">{data.ppr_name}</a>);
    return data.ppr_name;
  }

  const buildCompositeServices = () => {
    if (details == undefined || props.params['type'] != 'composite-service') { return }

    const data2 = details['dependent_services'] || [];

    if (data2.length == 0) {return;}

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

  const showBuildButton = () => {
    if (props.params['type'] != 'composite-service') {return null;}
    return (
      <Style marginTop='auto' marginBottom='auto'>
        <BlueButton marginLeft='0px' onClick={() => { navigate(`/sp/${details['id']}`) }}>
          {t('discovery.description.build')}
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
      <Padding paddingTop='16px' paddingBottom='26px'>
        <Column>
          <S.ExpandedContainer>
            <Image src={`${details['img_preview_url']}`} width='279px' height='328px' />
            <S.VerticalContainer horizontal='8px'>
              <S.Padding horizontal='8px'>
                <S.Title>{`${details['name']}`}</S.Title>
                <S.Body>{`${details['description']}`}</S.Body>
                {showBuildButton()}

                <S.Padding vertical='8px' horizontal='0px'>
                  <S.Subtitle>{t('service-tile.tags')}</S.Subtitle>
                </S.Padding>

                <S.HorizontalContainer>
                  {details['tags'] && details['tags'].map((elem, i) => { return (<Tag key={`${elem}:${i}`}>{elem}</Tag>) })}
                </S.HorizontalContainer>

                <S.HorizontalContainer>
                  <ColumnItem title={t('service-tile.stack_UP')}  subtitle={`${details['stack']}`} />
                  <ColumnItem title={t('service-tile.last_update_UP')} subtitle={`${details['last_updated']}`} />
                  <ColumnItem title={t('service-tile.terms_of_use_UP')} subtitle={`${details['terms_of_use']}`} />
                  <ColumnItem title={t('service-tile.location_UP')} subtitle={`${details['location']}`} />
                  <ColumnItem title={t('service-tile.security_UP')}  subtitle={`${details['security']}`} />
                  <ColumnItem title={t('service-tile.category_UP')} subtitle={`${details['category']}`} />
                </S.HorizontalContainer>
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
