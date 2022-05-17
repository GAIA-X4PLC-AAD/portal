import React from "react";
import "./VerticalSteps.css";

import PropTypes from 'prop-types';

const VerticalSteps = ({ current, numSteps }) => {
    const steps = () => {
        let steps = [];
        for (var i = 1; i < Number(numSteps) + 1; i++) {
            const incompleted = i > current ? "nexts-steps" : null;
            steps.push(
                <React.Fragment key={i}>
                    <div className="vertical-line"></div>
                    <div className={`circle ${incompleted}`}>
                        <h5>{i}</h5>
                    </div>
                </React.Fragment>
            );
        }
        return steps;
    };

    return (
        <div className="number-wrapper">
            {steps()}
            <div className="vertical-line bottom"></div>
        </div>
    );
}

VerticalSteps.propTypes = {
    current: PropTypes.number,
    numSteps: PropTypes.number,
}

export default VerticalSteps;