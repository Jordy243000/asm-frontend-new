import React from 'react';
import img_1 from '@assets/img/portfolio/pr-img1.jpg';
import img_2 from '@assets/img/portfolio/pr-img2.jpg';
import img_3 from '@assets/img/portfolio/pr-img3.jpg';
import img_4 from '@assets/img/portfolio/pr-img4.jpg';

//swiper
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import Image from 'next/image';
SwiperCore.use([Pagination]);


const PortFolioBox = () => {
    const portfolioImage = [
        {
            id: 1,
            image: img_1,
        },
        {
            id: 2,
            image: img_2,
        },
        {
            id: 3,
            image: img_3,
        },
        {
            id: 4,
            image: img_4,
        },
    ]
    return (
        <div className="portfolio-box">
            <div className="swiper-container portfolio-slider-active mb-20">
                <div className="swiper-wrapper">
                    <Swiper
                        modules={[Pagination]}
                        slidesPerView={2}
                        spaceBetween={20}
                        loop={true}
                        pagination={{
                            el: ".portfolio-slider-pagination",
                            clickable: true,
                        }}
                        breakpoints={{
                            1200: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            576: {
                                slidesPerView: 1,
                            },
                            0: {
                                slidesPerView: 1,
                            },
                        }}
                    >
                        {
                            portfolioImage.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="swiper-slide">
                                        <div className="portfolio-slider-item">
                                            <Image src={item.image} style={{ width: "100%", height: "100%" }} alt="portfolio" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
            <div className="portfolio-slider-pagination"></div>
        </div>
    );
};

export default PortFolioBox;