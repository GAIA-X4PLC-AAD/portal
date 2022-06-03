import React  from "react";
import {  useSelector } from "react-redux";

const SearchContent = () => {

    const criteria = useSelector(state => state.searchCriteriaStore);


    console.log(criteria.parameters);

    return (criteria.filterCriteria.map((criteria, i)=> {
        return(
            <div key={i}>
                {`${criteria.key}: ${criteria.value}`}
            </div>
        )}));
}

export default SearchContent;