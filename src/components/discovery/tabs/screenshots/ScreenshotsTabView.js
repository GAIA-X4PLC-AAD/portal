import React, { useState, useRef, useEffect } from "react";


import ImageGallery from 'react-image-gallery';

import { Center, Image, Row, Style } from "../../../../common/styles";

import PropTypes from 'prop-types';


const ScreenshotsTabView = (props,) => {
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {
    console.log(`ScreenshotsTabView, props.data: ${props.data}`)
    if (props.data !== undefined) {
      const _screenshots = props.data[0]['preview_imgs']
      setSlideImages(_screenshots)
    }

  }, [props.data]);


  var _images = slideImages?.map((p, index) => {
    return {
      'original': p['url'],
      'originalHeight': '500px',
      'originalWidth': '100%',
      'thumbnail': p['url'],
      // 'thumbnailHeight': '128px',
      'thumbnailWidth': '128px'
    }
  })

  return (
    <Style minWidth='100%'>
      <ImageGallery items={_images}
        showFullscreenButton={false}
        showBullets={true}
        showPlayButton={false} />
    </Style>
  )
}

ScreenshotsTabView.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ScreenshotsTabView
