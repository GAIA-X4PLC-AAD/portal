import React, { useEffect }  from "react";
import PropTypes from 'prop-types';
import SearchFilterFactory from "./SearchFilterFactory";
import { Row, Style, Column } from "../../../common/styles";
import { Padding } from "../tabs/style";
import SearchContent from "./SearchContent";
import SearchTerm from "./SearchTerm";
import { useDispatch, useSelector} from "react-redux";
import { updateSearchType, updateSeartTypeWithTerm } from "../../../actions";
import AdminHeader from "../../admin/AdminHeader";


const SearchView = ({type}) => {
    

    const store = useSelector(state => state.searchCriteriaStore);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if (store.type !== "home")
            dispatch(updateSearchType(type));
        else dispatch(updateSeartTypeWithTerm(type, store.searchTerms));
    },[type]);

    return (
        <React.Fragment key={type}>
            <Row>
            <Column width='345px'>
                    <Style maxWidth='313px'>
                        <AdminHeader type={type}/>
                    </Style>
                    <Style maxWidth='313px'>
                        <SearchFilterFactory type={type} />
                    </Style>

            </Column>
            <Column maxWidth='100%'>
                <SearchTerm type={type}/>

                <Padding horizontal='12px' />
                <Style maxWidth='900px'>
                    <SearchContent type={type} />
                </Style>

            </Column>
            </Row>
        </React.Fragment>

    );

}

SearchView.propTypes = {
    type: PropTypes.string
}

export default SearchView;