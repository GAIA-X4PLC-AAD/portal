import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import DiscoveryItem from "../DiscoveryItem";
import { Pagination } from "./Pagination";


const ListView = (props,) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1)
    let params = useParams();

    useEffect(() => {

        if (props.data !== undefined) {
            const _items = props.data['data']
            console.log(`_items: ${JSON.stringify(_items)}`)
            setItems(_items)
        }

        let newPage = params.page || 1;
        setPage(newPage)

    }, [props.data]);

    return (
        <>
            {items.map((item, index) => {
                switch (item.type) {
                    default:
                        return <DiscoveryItem type="service" />;
                }
            }
            )}
            <Pagination page={page} type={'services'}/>
        </>

    )
}

ListView.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
}

export default ListView
