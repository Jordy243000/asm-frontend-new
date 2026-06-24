import Breadcrumb from '@components/common/breadcrumb/breadcrumb';
import React from 'react';
import PortfolioDetails from './portfolio-details';


const index = ({ item }) => {
    return (
        <main>
            <Breadcrumb title={'Portfolio Details'} subTitle={'Portfolio Details'} />
            <PortfolioDetails item={item} />
        </main>
    );
};

export default index;