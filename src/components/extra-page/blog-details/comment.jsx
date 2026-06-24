import React from 'react';
import commentData from '@data/comment-data';
import Image from 'next/image';
import Link from 'next/link';

const Comment = () => {
    return (
        <div className="post-comments mb-55">
            <div className="post-comment-title">
                <div className="section__title mb-30">
                    <h3 className="title-sm">3 Comments</h3>
                </div>
            </div>
            <div className="latest-comments">
                <ul>
                    {
                        commentData.slice(0, 3).map((item) => (
                            <li className={item.listItemClass && item.listItemClass} key={item.id}>
                                <div className="comments-box">
                                    <div className="comments-avatar">
                                        <Image src={item.image} style={{ width: "100%", height: "auto" }} alt="img" />
                                    </div>
                                    <div className="comments-text">
                                        <div className="avatar-name">
                                            <h5>{item.avaterName}</h5>
                                            <span className="post-meta">{item.postMeta}</span>
                                        </div>
                                        <p>{item.comment}</p>
                                        <Link href="#" className="comment-reply"><i className={item.commentIcon}></i> Reply</Link>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Comment;