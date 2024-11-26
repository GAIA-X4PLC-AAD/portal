import PropTypes from 'prop-types';
import React from 'react';

import LoadingViewDeprecated from '../../../../common/components/loadingIndicator/LoadingViewDeprecated';
import DataPreview from '../dataPreview/DataPreview';

import * as S from './style';

const DataSetTab = ({ id }) => {

  const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/ppr/${id}/data/`;

  const providerLink = (data) => {
    return (<a href={data.ppr_url} target="_blank" rel="noreferrer">{data.ppr_name}</a>);
  }

  const showParsedDatasets = ({ data }) => {
    const data2 = data || [];
    if (data2 === undefined ){
      return null;
    }
    else {
      return (
        <S.Columns justifyContent='start'>
          {data2.map ((record,i) => {
            let parsed = { headline: record.name,
              img_preview_url: record.img_preview_url ,
              subline: providerLink(record),
              description: record.description }
            return <DataPreview data={parsed} key={i} margin="0 10px 10px 0" marginRight="10px" />
          })}
        </S.Columns>

      );
    }
  }

  return (
    <LoadingViewDeprecated
      url={URL}
      successView={showParsedDatasets}/>
  );
}

DataSetTab.propTypes = {
  id: PropTypes.string
};

export default DataSetTab;
