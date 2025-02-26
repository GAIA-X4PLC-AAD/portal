import PropTypes from 'prop-types';
import React from 'react';

import LoadingViewDeprecated from '../../../../common/components/loadingIndicator/LoadingViewDeprecated';
import DataPreview from '../dataPreview/DataPreview';

import * as S from './style';

const ServicesTab = ({ id }) => {
  const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/ppr/${id}/services/`;

  const providerLink = (data) => {
    return (<a href={data.ppr_url} target="_blank" rel="noreferrer">{data.ppr_name}</a>);
  }

  const showParsedServices = ({ data }) => {
    const data2= data || [];
    return (
      <S.Columns justifyContent='start'>
        {data2.map (record => {
          let parsed = { headline: record.name,
            img_preview_url: record.img_preview_url ,
            subline: providerLink(record),
            description: record.description,
            onDetailsClick:()=>{return;} }
          return <DataPreview data={parsed} key={record.id} margin="0 10px 10px 0" marginRight="10px" />
        })
        }
      </S.Columns>
    );
  }
  showParsedServices.propTypes = {
    data: PropTypes.array
  };

  return  (
    <LoadingViewDeprecated
      url={URL}
      successView={showParsedServices}/>
  );
}

ServicesTab.propTypes = {
  id: PropTypes.string
};

export default ServicesTab;
