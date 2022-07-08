import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import TileFactory from "../TileFactory";
import { HeaderTitle, Row, Column, Style } from "../../../common/styles";
import { useTranslation } from "react-i18next";
import * as S from "./style";
import SearchSort from "./SearchSort";
import ServicePreview from "../../solutionPackaging/ServicePreview";
import Carousel from "react-multi-carousel";
import NextPrevButtons from "./NexPrevButtons";
import NP from "../../../common/vertical_steps/next_prev_buttons";


const SearchContent = ({ type, onSelect }) => {

    const criteria = useSelector(state => state.searchCriteriaStore);
    const PROVIDER_URL = process.env.REACT_APP_EDGE_API_URI + `/api/admin/pr/registrations/search?${criteria.parameters}`;
    const MANAGEMENT_URL = process.env.REACT_APP_EDGE_API_URI + `/api/admin/management/requests/search?${criteria.parameters}`;
    const SP_URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/services/search?${criteria.parameters}`;
    const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/${type}/search?${criteria.parameters}`;
    const [refresh, setRefresh] = useState(0);
   
    const { t, i18n } = useTranslation();

    const searchRefresh = () =>{
        setRefresh(refresh+1);
    }

    const showData = (data) => {
        if (!data || !data.data || data.data.length === 0) return NoResults();
        else { 
            let _data = data.data
            return _data.map((item) => { return (<TileFactory data={item} id={`${item['id']}`} key={`${item['id']}`} searchRefresh={searchRefresh} />) })
        }
    }

    const CarouselComp = ({data}) => {
        // use state and useEffect are required in order to force carousel to re-render
        const [items, setItems] = useState([]);
     
        useEffect(() => {
            if(items.length === 0){
                console.log('add data to items', data)
                    setItems(data);
            }
        }, [data]);

        const shouldDisplayNextPrev = items.length > 3;
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 4,
                slidesToSlide: 4
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                slidesToSlide: 3
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
                customButtonGroup={<NP bottom='470px'/>}
                >
                {items.map((item) => { return (<ServicePreview service={item} key={`${item['id']}`} onSelect={onSelect}/>)})}
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
             const key = getURL(type);
             return (<CarouselComp data={_data}/>);
     
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
        return (<>
            {showHeader(type)}
            <SearchSort type={type} data={data}/>
            {type==='solution_pkg'?showCarousel(data):showData(data)}
            <Style display='flex' justifyContent='center'>
                <NextPrevButtons data={data} />
            </Style>
        </>
        );
    }

    const getURL = (type) => {
        switch(type) {
            case 'participant': return `${PROVIDER_URL}`;
            case 'management': return `${MANAGEMENT_URL}`;
            case 'solution_pkg': return `${SP_URL}`;
            default: return `${URL}`;
        }
    }


    return (<LoadingView url={`${getURL(type)}`}
        successView={loadData}  key={URL+refresh}/>);
}

SearchContent.propTypes = {
    type: PropTypes.string,
    onSelect: PropTypes.func
};


export default SearchContent;