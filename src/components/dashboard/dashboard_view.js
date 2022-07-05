import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonText, H4Text, HeaderTitle, Image, Row, Style } from "../../common/styles";
import PropTypes from 'prop-types';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Plot from 'react-plotly.js';
import MyServiceViewCard from "./my_service_view_card";
import { Padding } from "../discovery/tabs/style";
import LoadingView from "../loading_view/LoadingView";
import NextPrevButtons from "../../common/vertical_steps/next_prev_buttons";
import PlotLoadingView from "./plot_view";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};



const DashboardView = () => {

    const { t, i18n } = useTranslation();

    const buildPlot1 = () => {
        const _myDatasetsUrl = process.env.REACT_APP_EDGE_API_URI + `/api/dashboard/statistics`;

        return <PlotLoadingView url={_myDatasetsUrl} title="testing" />
    }

    const buildList = () => {

        const _myServicesUrl = process.env.REACT_APP_EDGE_API_URI + `/api/dashboard/services`;
        const _myDatasetsUrl = process.env.REACT_APP_EDGE_API_URI + `/api/dashboard/datasets`;

        return (
            <>
                {/* <HeaderTitle>{t(`dashboard.reporting`)}</HeaderTitle> */}
                {buildPlot1()}
                {ServicesLoadingListView({ url: _myServicesUrl, title: t('dashboard.my_services') })}
                {ServicesLoadingListView({ url: _myDatasetsUrl, title: t('dashboard.my_data_sets') })}
                {ServicesLoadingListView({ url: _myDatasetsUrl, title: t('dashboard.solution_packages') })}
            </>
        );
    }

    return buildList();
}

DashboardView.propTypes = {
    type: PropTypes.string
};

const ServicesListView = (props,) => {

    const [_items, setItems] = useState([]);

    useEffect(() => {
        if (props.data !== undefined) {
            const _items = props.data['results']
            setItems(_items)
        }

    }, [props.data]);

    const itemsViews = _items.map((element, _index) => {
        return <MyServiceViewCard key={`${element['id']}`} data={element} />
    })

    const shouldDisplayNextPrev = _items.length > 3;

    return <>
        <H4Text>{props.params['title']}</H4Text>
        <Carousel
            arrows={false}
            swipeable={false}
            draggable={false}
            responsive={responsive}
            renderButtonGroupOutside={shouldDisplayNextPrev}
            customButtonGroup={<NextPrevButtons />}>
            {(_items !== undefined || _items != null) ? itemsViews : <></>}
        </Carousel>
    </>;
}


ServicesListView.propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
}

const ServicesLoadingListView = ({ url, title, }) => {

    return (
        <>
            <LoadingView
                url={url}
                successView={ServicesListView}
                params={{ 'title': title }}
            />
        </>
    )
}

ServicesLoadingListView.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default DashboardView;