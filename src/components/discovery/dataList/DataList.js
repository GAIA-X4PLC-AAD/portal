import React from "react";
import PropTypes from "prop-types";
import DataItem from "./DataItem";
import DataTile from "../dataTile/DataTile";

const DataList = (props) => {
    console.log('DataList', props.data);
    return (
        <ul>
            {props.data.map(selfDescription => (
                <DataTile key={selfDescription.id} input={selfDescription} id={selfDescription.id} />
            ))}
        </ul>
    );
}
DataList.propTypes = {
    data: PropTypes.object,
}
export default DataList;
