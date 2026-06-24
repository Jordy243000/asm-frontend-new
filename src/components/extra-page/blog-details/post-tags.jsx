import Link from 'next/link';
import React from 'react';

const PostTags = () => {
    return (
        <div className="tagcloud details">
            <div className="section__title mb-25">
                <h3 className="title-sm">Post Tags :</h3>
            </div>
            <Link href="/blog-details">Covid-19</Link>
            <Link href="/blog-details">Gene</Link>
            <Link href="/blog-details">Test</Link>
            <Link href="/blog-details">Lab</Link>
            <Link href="/blog-details">data</Link>
        </div>
    );
};

export default PostTags;