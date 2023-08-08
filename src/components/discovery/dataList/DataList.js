import React from "react";
import PropTypes from "prop-types";
import DataTile from "../dataTile/DataTile";
import './DataList.css';
const DataList = (props) => {
    console.log('DataList', props.data);
    return (
        <div className='data-list'>
            <ul>
                {props.data.map(selfDescription => (
                    <DataTile key={selfDescription.id} input={selfDescription} id={selfDescription.id} />
                ))}
            </ul>
        </div>
    );
}
DataList.propTypes = {
    data: PropTypes.object,
}
export default DataList;
