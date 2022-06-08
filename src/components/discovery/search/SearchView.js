import React from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";
import { Row, Style } from "../../../common/styles";
import { Padding } from "../tabs/style";
import SearchContent from "./SearchContent";

const SearchView = ({ type }) => {

    return (
        <>
            <Row>
                <Style maxWidth='313px'>
                    <SearchFilterFactory type={type} />
                </Style>

                <Padding horizontal='12px' />
                <Style maxWidth='864px'>
                    <SearchContent type={type} />
                </Style>

            </Row>
        </>

    );

}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;