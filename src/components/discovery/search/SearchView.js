import React  from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";
import { Row } from "../../../common/styles";
import { Padding } from "../tabs/style";
import SearchContent from "./SearchContent";

const SearchView = ({type}) => {

    return (
        <>
            <Row>
                <SearchFilterFactory type={type}/>
                <Padding horizontal='12px'/>
                <SearchContent type={type}/>
            </Row>
        </>

    );

}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;