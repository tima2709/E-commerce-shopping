import React from 'react';
import './Slider.scss';
import {sliderImages} from '../../utils/images';



const Slider = () => {
    return (
        <div className={'hero-slider'}>
            <div className="hero-slider-item">
                <img src={sliderImages[0]} alt=""/>
            </div>
        </div>
    );
};

export default Slider;