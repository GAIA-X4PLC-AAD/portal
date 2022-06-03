import React  from "react";
import PropTypes from 'prop-types';
import { connect, useSelector } from "react-redux";

const SearchContent = () => {

    const criteria = useSelector(state => state.searchCriteriaStore);

    return (criteria.filterCriteria.map((criteria, i)=> {
        return(<div key={i}>
            {`${criteria.key}: ${criteria.value}`}
        </div>
        )}));
}

export default SearchContent;