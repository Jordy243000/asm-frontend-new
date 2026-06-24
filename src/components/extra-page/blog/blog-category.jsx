import Link from 'next/link';
import React from 'react';

const BlogCategory = () => {
    return (
        <div className="sidebar__widget mb-40">
            <h3 className="sidebar__widget-title mb-25">Category</h3>
            <div className="sidebar__widget-categories">
                <ul>
                    <li><Link href="/blog-details">Chemistry<span>03</span></Link></li>
                    <li><Link href="/blog-details">Forensic science <span>07</span></Link></li>
                    <li><Link href="/blog-details">Gemological <span>09</span></Link></li>
                    <li><Link href="/blog-details">Covid Analysis <span>01</span></Link></li>
                    <li><Link href="/blog-details">Becteriology <span>00</span></Link></li>
                    <li><Link href="/blog-details">Angiosperm <span>26</span></Link></li>
                </ul>
            </div>
        </div>
    );
};

export default BlogCategory;