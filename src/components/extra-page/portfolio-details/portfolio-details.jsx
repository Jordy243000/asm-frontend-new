import Link from 'next/link';
import React from 'react';
import SidebarDetails from './sidebar-details';
import PortFolioBox from './portfolio-box';
import Form from './form';
import ServiceContent from './service-content';
import Image from 'next/image';

const PortfolioDetails = ({ item }) => {
    const portfolioContent = [
        {
            id: 1,
            icon: 'flaticon-boat',
            title: 'Innovation & Design',
            description: 'Even though these terms'
        },
        {
            id: 2,
            icon: 'flaticon-plane',
            title: 'Materials & Resources',
            description: 'Even though these terms'
        },
        {
            id: 3,
            icon: 'flaticon-frontal-truck',
            title: 'Location & Linkages',
            description: 'Even though these terms'
        },
    ]

    return (
        <div className="project__details pt-120 pb-60">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8">
                        <div className="portfolio__details-wrapper mb-60">
                            <div className="portfolio__details-img mb-35 m-img">
                                {item?.image && <Image src={item?.image} style={{ width: "100%", height: "auto" }} alt="portfolio" />}
                            </div>
                            <div className="service-details-content">
                                <ServiceContent item={item} />
                                <div className="row portfolio__sd-box">
                                    {
                                        portfolioContent.map((item) => (
                                            <div className="col-lg-4 col-sm-6" key={item.id}>
                                                <div className="portfolio__sd-box-content mb-25">
                                                    <i className={item.icon}></i>
                                                    <h6>{item.title}</h6>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <p className="mb-30">Although both transportation and logistics deal with getting valuables from one
                                    location
                                    to
                                    another,
                                    logistics has added benefits and functions. Logistics executives also have to make
                                    decisions
                                    dealing
                                    with packaging, containerization, documentation, insurance, storage, importing and
                                    exporting
                                    regulations, freight damage claims, working and collaborating, managing vendors and
                                    partners, and
                                    risk mitigation. Even though these terms have been used as a substation for each other,
                                    the
                                    key
                                    differentiators are that logistics deals with the integration of storage.
                                </p>
                                <div className="portfolio-slider mb-45">
                                    <PortFolioBox />
                                </div>
                                <div className="portfolio-form">
                                    <div className="section__title mb-30">
                                        <h3 className="title-sm">Make Custom Request</h3>
                                    </div>
                                    <Form />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4">
                        <SidebarDetails />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetails;