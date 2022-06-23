import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import NextPrevButtons from "./NexPrevButtons";
import TileFactory from "../TileFactory";
import { HeaderTitle, Row, Column, Style } from "../../../common/styles";
import { useTranslation } from "react-i18next";
import * as S from "./style";
import SearchSort from "./SearchSort";

const SearchContent = ({ type }) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const PROVIDER_URL = process.env.REACT_APP_EDGE_API_URI + `/admin/pr/registrations/search?${criteria.parameters}`;
    const MANAGEMENT_URL = process.env.REACT_APP_EDGE_API_URI + `/admin/management/requests/search?${criteria.parameters}`;
    const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${type}/search?${criteria.parameters}`;
    const [refresh, setRefresh] = useState(0);

    const { t, i18n } = useTranslation();

    const searchRefresh = () =>{
        setRefresh(refresh+1);
    }

    const showData = (data) => {
        if (!data || !data.data || data.data.length === 0) return NoResults();
        else { 
            let _data = data.data
            return _data.map((item, i) => { return (<TileFactory data={item} id={`${item['id']}`} key={`${item['id']}`} searchRefresh={searchRefresh}/>) })
        }
    }

    const NoResults = () => {
        return (<>
            <Row margin="24px 0 0 0">
                <Column><S.AlertIcon /></Column>
                <Column><S.ErrorHeader>{t('discovery.search.noResults')}</S.ErrorHeader></Column>
            </Row>
            <Row><S.ErrorMessage>{t('discovery.search.noResultsMessage')}</S.ErrorMessage></Row>
        </>);
    }

    const showHeader = (type) => {
        if (type === 'management' || type === 'participant') return null;
        return (<HeaderTitle>{t(`discovery.lists.${type}`)}</HeaderTitle>);
    }


    const loadData = ({ data }) => {
        return (<>
            {showHeader(type)}
            <SearchSort type={type} data={data}/>
            {showData(data)}
            <Style display='flex' justifyContent='center'>
                <NextPrevButtons data={data} />
            </Style>
        </>
        );
    }

    const getURL = (type) => {
        switch(type) {
            case 'participant': return `${PROVIDER_URL}`;
            case 'management': return `${MANAGEMENT_URL}`;
            default: return `${URL}`;
        }
    }


    return (<LoadingView url={`${getURL(type)}`}
        successView={loadData}  key={URL+refresh}/>);
}

SearchContent.propTypes = {
    type: PropTypes.string
};


export default SearchContent;