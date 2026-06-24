import Link from 'next/link';
import React from 'react';

const BlogTag = () => {
    return (
        <div className="sidebar__widget">
            <h3 className="sidebar__widget-title mb-25">Popular Tag</h3>
            <div className="sidebar__widget-content">
                <div className="tagcloud">
                    <Link href="/blog-details">Covid-19</Link>
                    <Link href="/blog-details">Gene</Link>
                    <Link href="/blog-details">Test</Link>
                    <Link href="/blog-details">Lab</Link>
                    <Link href="/blog-details">data</Link>
                    <Link href="/blog-details">Virus</Link>
                    <Link href="/blog-details">Pandemic </Link>
                    <Link href="/blog-details">Symptoms</Link>
                    <Link href="/blog-details">Medicine</Link>
                    <Link href="/blog-details">Bacteria</Link>
                </div>
            </div>
        </div>
    );
};

export default BlogTag;