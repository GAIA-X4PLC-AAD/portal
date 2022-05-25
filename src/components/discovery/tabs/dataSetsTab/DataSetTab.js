import React from "react";
import DataPreview from "../dataPreview/DataPreview";
import PropTypes from 'prop-types';
import * as S from './style';
import configData from "../../../../config/config.json";
import LoadingView from "../../../loading_view/LoadingView";

const DataSetTab = ({id}) => {
    
    const URL = configData.EDGE_API_URI + `/discovery/ppr/${id}/data/`;

   const dataMock = [{id:"1",name:"name 1",description:"description 1",source:"source 1",location:"location 1",tags:"tags 1",category:"category 1",img_preview_url:"https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",ppr_name:"ppr name 1",ppr_url:"http://localhost",cloud_service:"http://localhost",location_flag:"http://localhost",frequency_of_update:"frequency update 1",last_updated:"2022-05-25"},
                     {id:"1",name:"name 1",description:"description 1",source:"source 1",location:"location 1",tags:"tags 1",category:"category 1",img_preview_url:"https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",ppr_name:"ppr name 1",ppr_url:"http://localhost",cloud_service:"http://localhost",location_flag:"http://localhost",frequency_of_update:"frequency update 1",last_updated:"2022-05-25"}]
    const providerLink = (data) => {
        return (<a href={data.ppr_url} target="_blank" rel="noreferrer">{data.ppr_name}</a>);
    }

    const showParsedDatasets = ({data}) => {
        const data2 = data || [];
        if (data2 === undefined ){
            return null;
        }
        else {
            return (
                <S.Columns>
                    {data2.map ((record,i) => {
                        let parsed = {headline: record.name, 
                            img_preview_url: record.img_preview_url , 
                            subline: providerLink(record), 
                            description: record.description, 
                            onDetailsClick:()=>{return;}}
                        return <DataPreview data={parsed} key={i}/>
                    })}
              </S.Columns>
    
            );     
        }
    }

    return (
        <LoadingView
        url={URL}
        successView={showParsedDatasets}/>
    );
}

DataSetTab.propTypes = {
    id: PropTypes.string
};

export default DataSetTab;