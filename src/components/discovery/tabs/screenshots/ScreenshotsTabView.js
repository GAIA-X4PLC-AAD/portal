import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

import { Style } from '../../../../common/styles';

const ScreenshotsTabView = (props,) => {
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {

    if (props.data !== undefined) {
      const _screenshots = props.data[0]['preview_imgs']
      setSlideImages(_screenshots)
    }

  }, [props.data]);

  var _images = (slideImages && slideImages.map((p, index) => {
    return {
      'original': p['url'],
      'originalHeight': '500px',
      'originalWidth': '100%',
      'thumbnail': p['url'],
      // 'thumbnailHeight': '128px',
      'thumbnailWidth': '128px'
    }
  })) || []

  return (
    <Style maxWidth='760px'>
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
