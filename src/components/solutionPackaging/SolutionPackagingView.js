import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateFilterCriteria } from "../../actions";
import * as S from "../../common/styles";
import SearchView from "../discovery/search/SearchView";
import LoadingView from "../loading_view/LoadingView";
import SlotDetails from "./SlotDetails";

const SolutionPackagingView = () => {
    
    const {id} = useParams();

    const dispatch = useDispatch();

    const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/services/${id}/details/`;
    const {t} = useTranslation();
    
    const [addItem, setAddItem] = useState(-1);
    const [solutionPkgCopy, setSolutionPkgCopy] = useState(null);
    const [solutionPkg, setSolutionPkg] = useState(null);

    const [fakeData,setFakeData] = useState( {dependent_services:[{
        available_services: 3,
        "id": "97",
        "name": "The Service Power",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Android_O_Preview_Logo.png/1200px-Android_O_Preview_Logo.png",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
        "features": "features",
        "stack": "stack",
        "security": "security",
        "location": "Magdeburg",
        "category": "Category #7",
        "tags": [
          "Atag",
          "Btag",
          "Ctag"
        ],
        "img_preview_url": "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
        "ppr_name": "The Service Power",
        "ppr_url": "https://my.company.url",
        "location_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/2880px-Flag_of_Germany.svg.png",
        "last_updated": "2022-06-09",
        "terms_of_use": "term of use"
      },
        {available_services: 1},
        {available_services: 4}]})

    const [fakeDataCopy, setFakeDataCopy] = useState(null);

    useEffect(() => {
         if(!fakeDataCopy) {
                setFakeDataCopy(fakeData);
        }
        }, [fakeData]);

    useEffect(() => {
        if(!solutionPkgCopy)
            setSolutionPkgCopy(solutionPkg);
    }, [solutionPkg]);

    
    
    const onSaveClick = () => {
       // TODO: missing things
    }

    
    const onResetClick = () => {
        setFakeData(fakeDataCopy);
        setSolutionPkg(solutionPkgCopy);
        setAddItem(-1);
    }
    const onBookClick = () => {
        console.log('fakeData', fakeData);
        console.log('fakeDataCopy', fakeDataCopy);
    }

    const successView = ({data}) => {
        if (!data) return null;
        if (!solutionPkg) {
            setSolutionPkg(data);
            return null;
        }
        return (<>
                    {showDetails(solutionPkg)}
                    {showSlots(fakeData)}
                    {showButtons(solutionPkg)}
                </>);
    }
    
    const showButtons = (data) => {
        return (
            <S.Row margin="32px;" gap='20px'>
                <S.BlueButton onClick={onResetClick} >Reset</S.BlueButton>
                <S.BlueButton onClick={onSaveClick}>Save</S.BlueButton>
                <S.BlueButton onClick={onBookClick}>Book</S.BlueButton>
            </S.Row>
        );
    } 

    // TODO: change index in scopeServiceId for right id
    const onAddClick = (index) => {
        setAddItem(index);
    }

    const showSlots = (data) => {
        return (
            <S.Row margin="32px;" gap='20px'>
                {data.dependent_services.map((service,i) => {return (<SlotDetails service={service} 
                                onRemove={()=>removeSlot(service,i)} 
                                onAdd={()=>onAddClick(i)}
                                selected={addItem===i}
                                key={i}/>

                )})}
            </S.Row>
        );
    } 
  
    // todo: change to right elements
    const removeSlot = (service, i) => {
        let copy = JSON.parse(JSON.stringify(fakeData));
        copy.dependent_services[i].id= null; 
        copy.dependent_services[i].available_services=copy.dependent_services[i].available_services+1;
        setFakeData(copy);
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
                    <S.BodyBoldText>Description</S.BodyBoldText>
                    <S.Style marginTop='14px'>
                    <S.BodyText>{data.description}</S.BodyText>
                    </S.Style>
                </S.Style>
                <S.Row margin='auto 0 0 0' gap="24px">
                    <S.Column> 
                        <S.Style marginBottom='8px'>
                            <S.CaptionText color="#B2B2B2">FEATURES</S.CaptionText>
                        </S.Style>
                        <S.BodySmallText>{data.features}</S.BodySmallText>
                    </S.Column>
                    <S.Column> 
                        <S.Style marginBottom='8px'>
                        <S.CaptionText color="#B2B2B2">STACK</S.CaptionText>
                        </S.Style>
                        <S.BodySmallText>{data.stack}</S.BodySmallText>
                    </S.Column>
                    <S.Column> 
                        <S.Style marginBottom='8px'>
                            <S.CaptionText color="#B2B2B2">LOCATION</S.CaptionText>
                        </S.Style>
                        <S.BodySmallText>{data.location}</S.BodySmallText>
                    </S.Column>
                    <S.Column> 
                        <S.Style marginBottom='8px'>
                            <S.CaptionText color="#B2B2B2">LAST UPDATED</S.CaptionText>
                        </S.Style>
                        <S.BodySmallText>{data.last_updated}</S.BodySmallText>
                    </S.Column>
                    
                </S.Row>
            </S.Column>
        </S.Row>
                    </>
        )

    }
    const onSelect = (params) => {
        console.log (params);
    }

    if (!id) return null;
    return(
            <S.Column>
                <S.Style textAlign="left">
                    <S.H2Text>Solution Packaging</S.H2Text>
                    <S.BodyText>Lorem ipsum dolor si jet subtitle</S.BodyText>
                </S.Style>
                <LoadingView url={URL} successView={successView}/>
                {addItem>=0?<SearchView type="solution_pkg" onSelect={onSelect} serviceId={id} slot={addItem}/>:null}
            </S.Column>
            );
}

export default SolutionPackagingView;