import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import { useParams } from "react-router-dom";
import * as S from "../../common/styles";
import SearchView from "../discovery/search/SearchView";
import LoadingView from "../loading_view/LoadingView";
import SlotDetails from "./SlotDetails";
import NP from "../../common/vertical_steps/next_prev_buttons";
import PropTypes from 'prop-types';

const SolutionPackagingView = () => {
    
    const {id} = useParams();


    const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/services/${id}/details/`;
    const {t} = useTranslation();
    
    const [addItem, setAddItem] = useState(-1);
    const [slotsCopy, setSlotsCopy] = useState(null);
    const [slots, setSlots] = useState(null);

  
    useEffect(() => {
        if(!slotsCopy)
            setSlotsCopy();
    }, [slots]);

    
    
    const onSaveClick = () => {
       // TODO: missing things
    }

    const createSlots = (data) => {
        const slotData =  data.dependent_services.reduce((result, service) => {
            var available_services = (result[service.slot_id]?.available_services || 0) + (service.included?0:1);
            var ervice = service.included? {...service, available_services} : {...result[service.slot_id] || null, available_services};
            result[service.slot_id] = ervice;
            return result;
        }, []);
        setSlots(slotData);
    }
    
    const onResetClick = () => {
        setSlots(slotsCopy);
        setAddItem(-1);
    }
    
    const onBookClick = () => {
        console.log('slots', slots);
        console.log('slotsCopy', slotsCopy);
    }

    const successView = ({data}) => {
        if (!data) return null;
        if (!slots) {
            createSlots(data);
        }
        return (<>
                    {showDetails(data)}
                    {show(slots)}
                    {showButtons(data)}
                </>);
    }
    
    const showButtons = (data) => {
        return (
            <S.Row margin="32px;" gap='20px'>
                <S.BlueButton onClick={onResetClick} >{t('solution_pkg.reset')}</S.BlueButton>
                <S.BlueButton onClick={onSaveClick}>{t('solution_pkg.save')}</S.BlueButton>
                <S.BlueButton onClick={onBookClick}>{t('solution_pkg.book')}</S.BlueButton>
            </S.Row>
        );
    } 

    // TODO: change index in scopeServiceId for right id
    const onAddClick = ( index) => {
        setAddItem(index);
    }

    const CarouselComp = ({data}) => {
        // use state and useEffect are required in order to force carousel to re-render
        const [items, setItems] = useState([]);
     
        useEffect(() => {
            if(items.length === 0){
                    setItems(data);
            }
        }, [data]);

        const shouldDisplayNextPrev = items.length > 5;
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 3,
                slidesToSlide: 3
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 5,
                slidesToSlide: 5
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
                customButtonGroup={<NP bottom='510px'/>}
                >
                {items.map((service,i) => {return (<SlotDetails service={service} 
                                onRemove={()=>removeSlot(i)} 
                                onAdd={()=>onAddClick(i)}
                                selected={addItem===i}
                                key={i}/>

                )})}
            </Carousel>
        );
    }
    CarouselComp.propTypes = {
        data: PropTypes.array
    }
    const show = (data) => {
        if (!data) return null;
        console.log(data);
        return (
            <S.Style marginBottom="32px" marginTop="32px">
                <CarouselComp data={data}/>
            </S.Style>
        );
    } 
  
  // clone array with map function to keep keys from original array
    const cloneArray = (array) => {
        let keys= array.keys();
        let newItem = [];
        console.log('keys', keys)
        for (const key  in array) {
            newItem[key] = JSON.parse(JSON.stringify(array[key]));
        }
        return newItem;
    }
    // todo: change to right elements
    const removeSlot = (i) => {
        let copy = cloneArray(slots);
        copy[i].id= null; 
        copy[i].available_services=copy[i].available_services+1;
        setSlots(copy);
        setAddItem(i);
    }

    const showDetails = (data) => {
        return (<>
        <S.Row margin='37px 0 0 0'>
            <S.Style marginRight='101px'>
                <S.Image src={data.img_preview_url} alt={data.name} width='307px' height='310px' objectFit='cover' objectPossition='0 0'/>
            </S.Style>
            <S.Column >
                <S.Row>
                    <S.Image src={data.logo} alt="Provider Logo" width='42px' height='42px' />
                    <S.Style marginTop='auto' marginBottom='auto' marginLeft='24px'>
                        <S.BodyText>{data.name}</S.BodyText>
                    </S.Style>
                </S.Row>
                <S.Style textAlign="left" marginTop='36px'>
                    <S.BodyBoldText>{t('solution_pkg.description')}</S.BodyBoldText>
                    <S.Style marginTop='14px'>
                    <S.BodyText>{data.description}</S.BodyText>
                    </S.Style>
                </S.Style>
                <S.Row margin='auto 0 0 0' gap="24px">
                    <S.Column> 
                        <S.Style marginBottom='8px'>
                            <S.CaptionText color="#B2B2B2">{t('solution_pkg.features')}</S.CaptionText>
                        </S.Style>
                        <S.BodySmallText>{data.features}</S.BodySmallText>
                    </S.Column>
                    <S.Column> 
                        <S.Style marginBottom='8px'>
                        <S.CaptionText color="#B2B2B2">{t('solution_pkg.stack')}</S.CaptionText>
                        </S.Style>
                        <S.BodySmallText>{data.stack}</S.BodySmallText>
                    </S.Column>
                    <S.Column> 
                        <S.Style marginBottom='8px'>
                            <S.CaptionText color="#B2B2B2">{t('solution_pkg.location')}</S.CaptionText>
                        </S.Style>
                        <S.BodySmallText>{data.location}</S.BodySmallText>
                    </S.Column>
                    <S.Column> 
                        <S.Style marginBottom='8px'>
                            <S.CaptionText color="#B2B2B2">{t('solution_pkg.lastUpdated')}</S.CaptionText>
                        </S.Style>
                        <S.BodySmallText>{data.last_updated}</S.BodySmallText>
                    </S.Column>
                    
                </S.Row>
            </S.Column>
        </S.Row>
                    </>
        )

    }
    const onSelect = (service) => {
        console.log ('onSelect' , service);
        let copy = cloneArray(slots);
        copy[addItem] = {...service, available_services:slots[addItem].available_services-1}
        setSlots(copy);
    }

    if (!id) return null;
    return(
            <S.Column>
                <S.Style textAlign="left">
                    <S.H2Text>{t('solution_pkg.solutionPackaging')}</S.H2Text>
                    <S.BodyText>{t('solution_pkg.solutionPackagingSubtitle')}</S.BodyText>
                </S.Style>
                <LoadingView url={URL} successView={successView}/>
                {addItem>=0?<SearchView type="solution_pkg" onSelect={onSelect} serviceId={id} slot={addItem}/>:null}
            </S.Column>
            );
}

export default SolutionPackagingView;