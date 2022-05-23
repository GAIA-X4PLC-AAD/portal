import React, { useState, useRef, useEffect } from "react";

import SimpleImageSlider from "react-simple-image-slider";

import '../../../common/styles';

import * as S from './style';
import { Center, HorizontalContainer, VerticalContainer, } from "../../../common/styles";
import PropTypes from 'prop-types';


const slideImages = [
  {
    url: 'https://images.pexels.com/photos/10892833/pexels-photo-10892833.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    caption: 'Slide 3'
  },
  {
    url: 'https://images.pexels.com/photos/11781702/pexels-photo-11781702.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    caption: 'Slide 1'
  },
  {
    url: 'https://images.pexels.com/photos/2288279/pexels-photo-2288279.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    caption: 'Slide 2'
  },
];


const ScreenshotsTabView = (props,) => {

  useEffect(() => {
    console.log(`DescriptionTab, props.data: ${props.data}`)
  }, [props.data]);

  return (
    <>
      <Center>
        <SimpleImageSlider
          style={{ position: 'relative' }}
          width={600}
          height={400}
          images={slideImages}
          showBullets={true}
          showNavs={true}
        />
      </Center>

    </>
  )
}

ScreenshotsTabView.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ScreenshotsTabView
