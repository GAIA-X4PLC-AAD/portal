import React from "react";
import DataPreview from "../dataPreview/DataPreview";
import PropTypes from 'prop-types';
import * as S from './style';
import configData from "../../../../config/config.json";
import LoadingView from "../../../loading_view/LoadingView";

const ServicesTab = ({id}) => {
    const URL = configData.EDGE_API_URI + `/discovery/ppr/${id}/services/`;
    const mockupData = [{id:"1",name:"name",img_preview_url:"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",logo:"https://cdn.logo.com/hotlink-ok/logo-social.png",ppr_name:"ppr name",ppr_url:"http://localhost",description:"description",features:"features",stack:"stack",security:"security",location:"location",location_flag:"http://localhost",last_updated:"2022-05-25",category:"category",tags:"tags",terms_of_use:"terms of user",dependent_services:[]},
                        {id:"1",name:"name",img_preview_url:"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",logo:"https://cdn.logo.com/hotlink-ok/logo-social.png",ppr_name:"ppr name",ppr_url:"http://localhost",description:"description",features:"features",stack:"stack",security:"security",location:"location",location_flag:"http://localhost",last_updated:"2022-05-25",category:"category",tags:"tags",terms_of_use:"terms of user",dependent_services:[]},]
    const providerLink = (data) => {
        return (<a href={data.ppr_url} target="_blank" rel="noreferrer">{data.ppr_name}</a>);
    }

    const showParsedServices = ({data}) => {
        const data2= mockupData || [];
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