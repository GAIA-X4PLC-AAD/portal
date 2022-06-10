import React from "react";
import { useSelector } from "react-redux";
import configData from "../../../config/config.json";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import NextPrevButtons from "./NexPrevButtons";
import TileFactory from "../TileFactory";
import { HeaderTitle, Row, Column, Style } from "../../../common/styles";
import { useTranslation } from "react-i18next";
import * as S from "./style";

const SearchContent = ({ type }) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const URL = configData.EDGE_API_URI + `/discovery/${type}/search?${criteria.parameters}`;

    const { t, i18n } = useTranslation();

    const showData = (data) => {
        if (!data || !data.data || data.data.length === 0) return NoResults();
        else { 
            // let _data = data.data.slice(0, 1)
            let _data = data.data
            return _data.map((item, i) => { return (<TileFactory data={item} id={`${item['id']}`} key={`${item['id']}`} />) })
        }
    }

    const NoResults = () => {
        return (<>
            <Row margin="24px 0 0 0">
                <Column><S.AlertIcon /></Column>
                <Column><S.ErrorHeader>No results found</S.ErrorHeader></Column>
            </Row>
            <Row><S.ErrorMessage>Sorry, we couldn’t find any matching results. Try broadening your filters</S.ErrorMessage></Row>
        </>);
    }

    const loadData = ({ data }) => {
        return (<>
            <HeaderTitle>{t(`discovery.lists.${type}`)}</HeaderTitle>
            {showData(data)}
            <Style display='flex' justifyContent='center'>
                <NextPrevButtons data={data} />
            </Style>
        </>
        );
    }

    console.log(URL);
    return (<LoadingView url={URL}
        successView={loadData} key={URL} />);
}

SearchContent.propTypes = {
    type: PropTypes.string
};


export default SearchContent;