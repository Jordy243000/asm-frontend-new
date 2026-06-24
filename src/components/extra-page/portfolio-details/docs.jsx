import Link from 'next/link';
import React from 'react';

const Docs = () => {
    return (
        <div className="sidebar__widget mb-40">
            <div className="sidebar-title mb-25">
                <h4>Download Docs</h4>
            </div>
            <ul className="widget-services downloads">
                <li><Link href="#"><i className="fal fa-file-pdf"></i>Sender Instructions</Link></li>
                <li><Link href="#"><i className="fal fa-file-music"></i>Audio Record</Link></li>
                <li><Link href="#"><i className="fal fa-file-signature"></i>CEO Signature</Link></li>
                <li><Link href="#"><i className="fal fa-file-word"></i>Product Details</Link></li>
            </ul>
        </div>
    );
};

export default Docs;