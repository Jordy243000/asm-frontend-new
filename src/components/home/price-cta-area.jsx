import React from 'react';
import price_cta from '@assets/img/price-cta/price-cta-bg.png';
import Link from 'next/link';
import PriceFrom from '@components/forms/price-from';

const PriceCtaArea = () => {
    return (
        <section className="price__cta pt-120 bg-css"
            style={{ backgroundImage: `url(${price_cta.src})` }}>
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-xxl-7 col-xl-8">
                        <div className="price__cta-content-shadow">
                            <div className="price__cta-content">
                                <div className="section__title mb-55 wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".3s">
                                    <span className="sub-title">call to action</span>
                                    <h2 className="title">price calculation</h2>
                                </div>
                                <div className="price__cta-form wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".5s">
                                    <PriceFrom />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceCtaArea;