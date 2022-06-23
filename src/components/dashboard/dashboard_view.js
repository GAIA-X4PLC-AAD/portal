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

const NextPrevButtons = ({ next, previous, goToSlide, ...rest }) => {
    const activeColor = 'invert(14%) sepia(71%) saturate(5805%) hue-rotate(243deg) brightness(56%) contrast(132%)'
    const disabledColor = 'invert(74%) sepia(0%) saturate(1%) hue-rotate(3deg) brightness(96%) contrast(95%)'
    const { carouselState: { currentSlide } } = rest;
    return (
        <Style display='flex' position='relative' justifyContent='end' bottom='460px'>
            <Padding horizontal='4px'>
                <ButtonText disabled={currentSlide === 0} onClick={() => previous()} >
                    <Image src='/images/arrow_left.svg' alt="arrow-left" width='12px'
                        filter={currentSlide === 0 ? disabledColor : activeColor} />
                </ButtonText></Padding>
            <Padding horizontal='4px'>
                <ButtonText disabled={currentSlide !== 0} onClick={() => next()} >
                    <Image src='/images/arrow_right.svg' alt="arrow-right" width='12px'
                        filter={currentSlide !== 0 ? disabledColor : activeColor}
                    />
                </ButtonText></Padding>
        </Style>

    );
};

NextPrevButtons.propTypes = {
    next: PropTypes.func,
    previous: PropTypes.func,
    goToSlide: PropTypes.func,
};

const DashboardView = () => {

    const { t, i18n } = useTranslation();

    const buildPlot1 = () => {

        var trace1 = {
            x: [1, 2, 3, 4],
            y: [0, 2, 3, 5],
            fill: 'tozeroy',
            fillcolor: 'rgba(186, 0, 255, 0.1)',
            line_color: "#0000ff",
            type: 'scatter'
        };

        var trace2 = {
            x: [1, 2, 3, 4],
            y: [3, 5, 1, 7],
            fill: 'tozeroy',
            fillcolor: 'rgba(141, 141, 255, 0.1)',
            line_color: 'indigo',
            type: 'scatter'
        };
        var data = [trace1, trace2,];

        return <Plot
            data={data}
            layout={{

            }}

        />
    }

    const buildList = () => {

        const _myServicesUrl = process.env.REACT_APP_EDGE_API_URI + `/dashboard/services`;
        const _myDatasetsUrl = process.env.REACT_APP_EDGE_API_URI + `/dashboard/datasets`;

        return (
            <>
                <HeaderTitle>{t(`dashboard.reporting`)}</HeaderTitle>
                {buildPlot1()}
                {ServicesLoadingListView({ url: _myServicesUrl, title: t('dashboard.my_services') })}
                {ServicesLoadingListView({ url: _myDatasetsUrl, title: t('dashboard.my_data_sets') })}
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
            const _items = props.data['data']
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

const ServicesLoadingListView = ({ url, title }) => {
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
    title: PropTypes.string.isRequired
}

export default DashboardView;