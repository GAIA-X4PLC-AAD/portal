import React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from "react-i18next";
import * as S from "./styles.js";

const SampleRecordFactory = ({data, t}) => {

    const samples = data || [];

    const DefaultSample = ({sample }) =>  {
        return (
            <S.Sample>
                <S.Description>{sample.description}</S.Description>
                <S.Link href={sample.run_url} target="_blank" rel="noreferrer">Run this query</S.Link>
                
            </S.Sample>
        );
    }
    DefaultSample.propTypes = {
        sample: PropTypes.object
    }
   
    const showSamples = (samples) => {
        return (samples.map((sample, index)=> {
                        return <DefaultSample sample={sample} key={`${sample.id}:${index}`}/>;
            }
        ));
    }
    console.log(data);
    return (<>
        <S.Header>{t('service-tile.sample_header_text')}</S.Header>
        {showSamples(samples)}
        </>
    );
};
SampleRecordFactory.propTypes = {
    data: PropTypes.array,
    t: PropTypes.func
}

export default withTranslation()  (SampleRecordFactory);
