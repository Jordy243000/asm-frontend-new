import React from 'react';
import portfolio_img from '@assets/img/portfolio/portfolio-details-img-2.jpg';
import Image from 'next/image';

const ServiceContent = ({ item }) => {
    return (
        <>
            <div className="section__title mb-20">
                <h3 className="title-sm">{item?.title && item.title}</h3>
            </div>
            <p className="content-para">These are inbound logistics, outbound logistics, and reverse logistics.
                The information
                about these three supply chain directions is essential to know, especially to people inclined
                in the
                logistics industry.
            </p>
            <p className="mb-25">Logistics is the overseeing of both the inward and outward flow of goods from
                the
                manufacturing point
                to the end user or point of use. The movement of these goods is known as transportation.
                While some
                use these terms interchangeably, they are two very unique aspects of the supply chain.
                Here’s what you
                need to know about logistics vs. transportation.
            </p>
            <div className="row align-items-center overview-list">
                <div className="col-sm-6">
                    <div className="overview-list-img w-img mb-25">
                        <Image src={portfolio_img} style={{ width: "100%", height: "100%" }} alt="portfolio" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <ul className="mb-25">
                        <li>Integrated Shipping</li>
                        <li>Logistics Services</li>
                        <li>Product Distribution</li>
                        <li>Product Sustainability</li>
                    </ul>
                </div>
            </div>
            <p className="mb-30">The movement of people, goods, and animals from one location to another by air,
                rail,
                road,
                sea, cable,
                space, or pipeline is known as transportation. Transportation services are divided into
                three aspects:
                infrastructure, vehicles, and operations. Transportation is very important because it
                allows
                communication and trade between two parties.
            </p>
        </>
    );
};

export default ServiceContent;