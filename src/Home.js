import React from "react";
import {useTranslation, withTranslation} from "react-i18next";
import "react-multi-carousel/lib/styles.css";
import PropTypes from 'prop-types';
import {BodyText, Column, H2Text, Style} from "./common/styles.js";
import {Padding} from "./components/discovery/tabs/style.js";
import SearchTerm from "./components/discovery/search/SearchTerm.js";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Home = () => {

  const { t, i18n } = useTranslation();

  // const buildSliderContent = ({ index = 0 }) => {
  //     return <Column key = {`${index}`} justifyContent='center' $alignItems='center'>
  //     <H2Text color={'#fff'}>{t('article.what-is-new')} {index}</H2Text>
  //       <Style maxWidth='600px'>
  //       <BodyText color={'#fff'} $textAlign='center'>{t('filler')}</BodyText>
  //       </Style>
  //
  //     <h4></h4>
  //       <Padding vertical='20px' />
  //     </Column>
  //   }
  //
  // const slides = [
  //   buildSliderContent({ index: 1 }),
  //   buildSliderContent({ index: 2 }),
  //   buildSliderContent({ index: 3 }),
  //   buildSliderContent({ index: 4 }),
  //   buildSliderContent({ index: 5 }),
  // ]

  // const CustomDot = ({ onClick, ...rest }) => {
  //   const {
  //     onMove,
  //     index,
  //     active,
  //     carouselState: { currentSlide, deviceType }
  //   } = rest;
  //
  //   const carouselItems = [
  //     <SliderBullet key='sb01' isActive={active} onClick={() => onClick()} />,
  //     <SliderBullet key='sb02' isActive={active} onClick={() => onClick()} />,
  //     <SliderBullet key='sb04' isActive={active} onClick={() => onClick()} />,
  //     <SliderBullet key='sb05' isActive={active} onClick={() => onClick()} />,
  //     <SliderBullet key='sb06' isActive={active} onClick={() => onClick()} />,
  //   ];
  //   return <>
  //     {React.Children.toArray(carouselItems)[index]}
  //   </>;
  // }

  // CustomDot.propTypes = {
  //   onClick: PropTypes.func
  // }

  // const HomeSlider = () => {
  //   return <Carousel
  //     arrows={false}
  //     swipeable={true}
  //     draggable={true}
  //     showDots
  //     customDot={<CustomDot />}
  //     responsive={responsive}
  //   >
  //     {slides}
  //   </Carousel>
  // }


  return (
    <>
      <div className='banner-container'>
        <Column $alignItems='center' $height='100px'>
          <Padding key='i01' $paddingTop='140px' />
          <H2Text $color={'#fff'}>{t('home.marketplace')}</H2Text>
          <Padding key='i03' $paddingTop='40px' />
          <Style $justifyContent="justify" $marginLeft="2em" $marginRight="2em">
            <BodyText $color={'#fff'} $textAlign='center'>{t('home.marketplace_text')}</BodyText>
          </Style>
        </Column>
      </div >

      <div className='search-container'>
        <Padding $vertical='40px'>
          <SearchTerm type='home'
                      inputWidth="320px" advancedTextColor="#fff" advancedSearchBgColor='#8D8DFF'
                      displayAsColumn={false}
                      />
        </Padding>
      </div>
    </>
  );
}

Home.propTypes = {
  t: PropTypes.func,
}

export default withTranslation()(Home);
