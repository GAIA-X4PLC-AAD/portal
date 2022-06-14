import React, { useEffect }  from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";
import { Row, Style } from "../../../common/styles";
import { Padding } from "../tabs/style";
import SearchContent from "./SearchContent";
import SearchTerm from "./SearchTerm";
import { useDispatch, useSelector} from "react-redux";
import { updateSearchType, updateSeartTypeWithTerm } from "../../../actions";

const SearchView = ({type}) => {
    

    const store = useSelector(state => state.searchCriteriaStore);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        console.log(`type of store.type = ${store.type} , type= ${type}, searchSterm = ${store.searchTerms}`)
        if (store.type !== "home")
            dispatch(updateSearchType(type));
        else dispatch(updateSeartTypeWithTerm(type, store.searchTerms));
    },[type]);

    return (
        <React.Fragment key={type}>
            <Row margin="0 0 0 auto" width="fit-content">
                <SearchTerm type={type}/>
            </Row>
            <Row>
                <Style maxWidth='313px'>
                    <SearchFilterFactory type={type} />
                </Style>

                <Padding horizontal='12px' />
                <Style maxWidth='864px'>
                    <SearchContent type={type} />
                </Style>

            </Row>
        </React.Fragment>

    );

}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;