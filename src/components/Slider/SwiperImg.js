import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {sliderImages} from '../../utils/images'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './swiper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SwiperImg() {


    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper container"
            >
                {
                    sliderImages.map((img, index) => (
                        <SwiperSlide key={index}><img src={img} alt=""/></SwiperSlide>
                    ))
                }

            </Swiper>
        </>
    );
}
