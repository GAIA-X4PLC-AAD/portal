import React, {useEffect} from 'react';
import createTextSparks from "./sparky.js";
import "./SparksText.css";

export const SparksText = () => {

    useEffect(() => {
        createTextSparks();
    }, [])

    return (
        <div className='sparky1'>
            <div className='sparky'>
                <ul data-time="3000">
                    <li data-hue="283">G</li>
                    <li data-hue="283">A</li>
                    <li data-hue="283">I</li>
                    <li data-hue="283">A</li>
                    <li data-hue="283">-</li>
                    <li data-hue="283">X</li>
                </ul>
            </div>
            <canvas></canvas>
        </div>
    );
}
