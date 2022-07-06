import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import * as S from "../../common/styles";
import SearchView from "../discovery/search/SearchView";
import LoadingView from "../loading_view/LoadingView";
import ServiceModalDetails from "./ServiceModalDetails";
import { AvailabeServices, SlotBox } from "./style";

const SolutionPackagingView = () => {
    
    const {id} = useParams();

    const URL = process.env.REACT_APP_EDGE_API_URI + `/discovery/services/${id}/details/`;
    const {t} = useTranslation();
    
    
    const [addItem, setAddItem] = useState(-1);
    const [displayModal, setDisplayModal] = useState(false);
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

    const openLink =  (url) => {
        window.open(url, '_blank').focus();
    }

    const onSaveClick = () => {
        setDisplayModal(true);
    }
    const closeModal = () => {
        setDisplayModal(false);
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

    const showButtons = (data) => {
        return (
            <S.Row margin="32px;" gap='20px'>
                <S.BlueButton onClick={onResetClick} >Reset</S.BlueButton>
                <S.BlueButton onClick={onSaveClick}>Save</S.BlueButton>
                <S.BlueButton onClick={onBookClick}>Book</S.BlueButton>
            </S.Row>
        );
    } 

    const showSlots = (data) => {
        return (
            <S.Row margin="32px;" gap='20px'>
                {data.dependent_services.map((service,i) => {return (<React.Fragment key={i}>{showSlot(service,i)}</React.Fragment>)})}
            </S.Row>
        );
    } 
    const emptySlot = (service, i) => {
        return (
            <S.BlueLinkText onClick={()=>setAddItem(i)}>
            <S.Style textAlign="left">
                {addItem===i?'Select...':'Add'}
            </S.Style>                        
            </S.BlueLinkText>
        );
    }
    //"solution_packaging": {
    //    "available_services": "available service | available services"
    
    const showSlot = (service,i) => {
        return(<S.Column>
            <SlotBox selected={addItem===i}>{slotDetails(service,i)}</SlotBox>    
                <AvailabeServices>
                    <S.CaptionText>
                        {t('solution_pkg.a_s', {as: service.available_services})}
                    </S.CaptionText>
                </AvailabeServices>
        </S.Column>
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
    const slotDetails = (service, i) => {
        if (!service.id) return emptySlot(service, i);
        return (
            <S.Column height="100%">
                <S.Style marginBottom="auto" textAlign="left">
                    <S.Image src={service.img_preview_url} alt={service.name} width='201px' height='134px'/>
                    <S.H4Text>{service.name}</S.H4Text>
                    <S.BlueLinkText><S.Style textAlign="left" onClick={()=>{openLink(service.ppr_url)}}>{service.ppr_url}</S.Style></S.BlueLinkText>
                    <S.Style marginTop="10px">
                        <S.BodySmallText>{service.description}</S.BodySmallText>
                    </S.Style>
                </S.Style>
                <S.Row margin="0 auto 0 0" onClick={()=>removeSlot(service,i)}>
                    <S.BlueLinkText>
                        <S.Style textAlign="left">
                            Remove
                        </S.Style>                        
                        
                    </S.BlueLinkText>
                    <S.Style marginLeft ="15px">
                        <S.Image src='/images/X_image.svg' />    
                    </S.Style>
                    
                </S.Row>
            </S.Column>
        );
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

    return(
            <S.Column>
                <S.Style textAlign="left">
                    <S.H2Text>Solution Packaging</S.H2Text>
                    <S.BodyText>Lorem ipsum dolor si jet subtitle</S.BodyText>
                </S.Style>
                <LoadingView url={URL} successView={successView}/>
                {displayModal?<ServiceModalDetails service={fakeData.dependent_services[0]} closeModal={closeModal}/>:null}
                {addItem>=0?<SearchView type="solution_pkg" />:null}
            </S.Column>
            );
}

export default SolutionPackagingView;