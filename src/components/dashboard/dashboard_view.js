import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HeaderTitle } from "../../common/styles";
import PropTypes from 'prop-types';

import Plot from 'react-plotly.js';
import MyServiceViewCard from "./my_service_view";


const DashboardView = () => {

    const { t, i18n } = useTranslation();


    const buildPlot1 = () => {

        var trace1 = {
            x: [1, 2, 3, 4],
            y: [0, 2, 3, 5],
            fill: 'tozeroy', 
            fillcolor: 'rgba(186, 0, 255, 0.1)',
            line_color: "#0000ff",
            type: 'scatter'
          };

          var trace2 = {
            x: [1, 2, 3, 4],
            y: [3, 5, 1, 7],
            fill: 'tozeroy', 
            fillcolor: 'rgba(141, 141, 255, 0.1)',
            line_color:'indigo',
            type: 'scatter'
          };
        var data = [trace1, trace2, ];

        return <Plot
            data={data}
            layout={{ width: '50%', height: '400px', title: 'A Fancy Plot', showlegend: false,
            // shapes:[
            //     {
            //         type: 'path',
            //         path: 'M 1,4 C 2,8 6,4 8,8',
            //         line: {
            //           color: 'rgb(207, 114, 255)'
            //         }
              
            //       },
            // ]
         }}

        />
    }

    const buildList = () => {
        return (
            <>
                <HeaderTitle>{t(`dashboard.reporting`)}</HeaderTitle>
                {buildPlot1()}
                <MyServiceViewCard>MyServices</MyServiceViewCard>

            </>
        );
    }

    return buildList();
}

DashboardView.propTypes = {
    type: PropTypes.string
};


export default DashboardView;