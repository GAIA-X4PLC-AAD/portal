import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ButtonText, H4Text, HeaderTitle, Row, Style } from "../../common/styles";
import PropTypes from 'prop-types';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Plot from 'react-plotly.js';
import MyServiceViewCard from "./my_service_view_card";
import { Padding } from "../discovery/tabs/style";


const DashboardView = () => {

    const { t, i18n } = useTranslation();
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
        const { carouselState: { currentSlide } } = rest;
        return (
            <Style display='flex' position='relative' left='88%' bottom='32.5%'>
                <Padding horizontal='4px'><ButtonText disabled={currentSlide === 0} onClick={() => previous()} >Previous</ButtonText></Padding>
                <Padding horizontal='4px'><ButtonText disabled={currentSlide !== 0} onClick={() => next()} >Next</ButtonText></Padding>
            </Style>
        );
    };
    NextPrevButtons.propTypes = {
        next: PropTypes.func,
        previous: PropTypes.func,
        goToSlide: PropTypes.func,
    };

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

    const buildMyServicesList = () => {

        return (
            <>
                <H4Text>{t('dashboard.my_services')}</H4Text>
                <Carousel
                    arrows={false}
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<NextPrevButtons />}>
                    <MyServiceViewCard isEditable={true} index={0}/>
                    <MyServiceViewCard index={1}/>
                    <MyServiceViewCard isEditable={true} index={2}/>
                    <MyServiceViewCard index={1}/>
                    <MyServiceViewCard index={3}/>
                </Carousel>
            </>
        );
    }


    const buildMyDatasetsList = () => {
        return (
            <>
                <H4Text>{t('dashboard.my_data_sets')}</H4Text>
                <Carousel
                    arrows={false}
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<NextPrevButtons />}>
                    <MyServiceViewCard />
                    <MyServiceViewCard isEditable={true} />
                    <MyServiceViewCard />
                    <MyServiceViewCard isEditable={true} />
                </Carousel>
            </>
        );
    }

    const buildList = () => {
        return (
            <>
                <HeaderTitle>{t(`dashboard.reporting`)}</HeaderTitle>
                {buildPlot1()}
                {buildMyServicesList()}
                {buildMyDatasetsList()}

            </>
        );
    }

    return buildList();
}

DashboardView.propTypes = {
    type: PropTypes.string
};


export default DashboardView;