import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';


const ListView = (props,) => {
    const [items, setItems] = useState([]);

    useEffect(() => {

        if (props.data !== undefined) {
            const _items = props.data['data']
            console.log(`_items: ${JSON.stringify(_items)}`)
            setItems(_items)
        }

    }, [props.data]);

    return (
        items.map((item, index) => {
            switch (item.type) {
                default:
                    return <h1>{index}</h1>;
            }
        }
        )
    )
}

ListView.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
}

export default ListView
