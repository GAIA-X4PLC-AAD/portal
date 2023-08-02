import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import TileFactory from "../TileFactory";
import { HeaderTitle, Row, Column, Style, Padding } from "../../../common/styles";
import { useTranslation } from "react-i18next";
import * as S from "./style";
import SearchSort from "./SearchSort";
import ServicePreview from "../../solutionPackaging/ServicePreview";
import Carousel from "react-multi-carousel";
import NextPrevButtons from "./NexPrevButtons";
import NP from "../../../common/vertical_steps/next_prev_buttons";


const SearchContent = ({ type, onSelect, serviceId, slot }) => {

    const addParams = serviceId || slot || '' != '' ? `/${serviceId}/${slot}` : '';

    const criteria = useSelector(state => state.searchCriteriaStore);
    // const PROVIDER_URL = process.env.REACT_APP_EDGE_API_URI + `/admin/pr/registrations/search?${criteria.parameters}`;
    const PROVIDER_URL = `/admin/pr/registrations/search?${criteria.parameters}`;
    // const MANAGEMENT_URL = process.env.REACT_APP_EDGE_API_URI + `/admin/management/requests/search?${criteria.parameters}`;
    const MANAGEMENT_URL = `/admin/management/requests/search?${criteria.parameters}`;
    // const SP_URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/services${addParams}/search?${criteria.parameters}`;
    const SP_URL = `/discovery/services${addParams}/search?${criteria.parameters}`;
    // const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${type}/search?${criteria.parameters}`;
    const URL = `/discovery/${type}/search?${criteria.parameters}`;
    const [refresh, setRefresh] = useState(0);

    const { t, i18n } = useTranslation();

    const searchRefresh = () => {
        setRefresh(refresh + 1);
    }

    const showData = (data) => {
        if (!data || !data.data || data.data.length === 0) return NoResults();
        else {
            let _data = data.data
            return _data.map((item) => { return (<TileFactory data={item} id={`${item['id']}`} key={`${item['id']}`} searchRefresh={searchRefresh} />) })
        }
    }

    const CarouselComp = ({ data }) => {
        // use state and useEffect are required in order to force carousel to re-render
        const [items, setItems] = useState([]);

        useEffect(() => {
            if (items.length === 0) {
                setItems(data);
            }
        }, [data]);

        const shouldDisplayNextPrev = items.length > 2;
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 3,
                slidesToSlide: 3
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 2,
                slidesToSlide: 2
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1
            }
        };
        return (
            <Carousel
                arrows={false}
                swipeable={false}
                draggable={false}
                responsive={responsive}
                renderButtonGroupOutside={shouldDisplayNextPrev}
                customButtonGroup={<NP bottom='470px' />}
            >
                {items.map((item) => { return (<ServicePreview service={item} key={`${item['id']}`} onSelect={onSelect} />) })}
            </Carousel>
        );
    }
    CarouselComp.propTypes = {
        data: PropTypes.array
    }

    const showCarousel = (items) => {
        if (!items || !items.data || items.data.length === 0) return NoResults();
        else {
            let _data = items.data
            return (<CarouselComp data={_data} />);

        }
    }
    showCarousel.propTypes = {
        items: PropTypes.object
    }

    const NoResults = () => {
        return (<>
            <Row margin="24px 0 0 0">
                <Column><S.AlertIcon /></Column>
                <Column><S.ErrorHeader>{t('discovery.search.noResults')}</S.ErrorHeader></Column>
            </Row>
            <Row><S.ErrorMessage>{t('discovery.search.noResultsMessage')}</S.ErrorMessage></Row>
        </>);
    }

    const showHeader = (type) => {
        if (type === 'management' || type === 'participant') return null;
        return (<HeaderTitle>{t(`discovery.lists.${type}`)}</HeaderTitle>);
    }

    const loadData = ({ data }) => {
        if (data) {
            return (
                <div style={{ marginLeft: '24px' }}>
                    {showHeader(type)}
                    <SearchSort type={type} data={data} />
                    {type === 'solution_pkg' ? showCarousel(data) : showData(data)}
                    <Padding vertical='12px'>
                        <NextPrevButtons data={data} />
                    </Padding>
                </div>
            )
        } else {
            return null;
        }
    }

    const getURL = (type) => {
        switch (type) {
            case 'participant': return `${PROVIDER_URL}`;
            case 'management': return `${MANAGEMENT_URL}`;
            case 'solution_pkg': return `${SP_URL}`;
            default: return `${URL}`;
        }
    }


    return (<LoadingView url={`${getURL(type)}`}
        successView={loadData} key={URL + refresh} />);
}

SearchContent.propTypes = {
    type: PropTypes.string,
    onSelect: PropTypes.func,
    serviceId: PropTypes.string,
    slot: PropTypes.number
};


export default SearchContent;
