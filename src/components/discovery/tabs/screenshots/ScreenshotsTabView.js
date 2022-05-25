import React, { useState, useRef, useEffect } from "react";

import SimpleImageSlider from "react-simple-image-slider";

import { Center, Row } from "../../../../common/styles";
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
      {/* <Center>
        <Row vertical='10px'>
          {slideImages?.map((p) => (
            <img src={p['url']} key={p['url']} width={200} />
          ))}
        </Row>
      </Center> */}

    </>
  )
}

ScreenshotsTabView.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ScreenshotsTabView
