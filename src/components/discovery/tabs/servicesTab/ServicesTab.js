import React from "react";
import DataPreview from "../dataPreview/DataPreview";
import PropTypes from 'prop-types';
import * as S from './style';
import configData from "../../../../config/config.json";
import LoadingView from "../../../loading_view/LoadingView";

const ServicesTab = ({id}) => {
    const URL = configData.EDGE_API_URI + `/discovery/ppr/${id}/services/`;

    const providerLink = (data) => {
        return (<a href={data.ppr_url} target="_blank" rel="noreferrer">{data.ppr_name}</a>);
    }

    const showParsedServices = ({data}) => {
        const data2= data || [];
        return (
            <S.Columns>
                {data2.map (record => {
                    let parsed = {headline: record.name, 
                        img_preview_url: record.img_preview_url , 
                        subline: providerLink(record), 
                        description: record.description, 
                        onDetailsClick:()=>{return;}}
                    return <DataPreview data={parsed} key={record.id}/>
                    })
                }
            </S.Columns>
        );
    }
    showParsedServices.propTypes = {
        data: PropTypes.array
    };

    return  (
        <LoadingView
        url={URL}
        successView={showParsedServices}/>
    );
}

ServicesTab.propTypes = {
    id: PropTypes.string
};

export default ServicesTab;