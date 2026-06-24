import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
const RecentPost = ({ blogData }) => {
  return (
    <div className="sidebar__widget mb-40">
      <h3 className="sidebar__widget-title mb-25">Posts récents</h3>
      <div className="sidebar__widget-content">
        <div className="sidebar__post">
          {blogData?.slice(0, 5)?.map((item, idx) => (
            <div className="rc__post d-flex mb-20" key={item?.id}>
              <div className="rc__post-thumb">
                <Link href={`/blog/${item?.id}`}>
                  <img
                    // src={item.image}
                    src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.image?.data?.attributes?.url}`}
                    style={{ width: "100%", height: "auto" }}
                    alt={`Blog-${item?.attributes?.name}-African Shipping Management(ASM) RDC`}
                  />
                </Link>
              </div>
              <div className="rc__post-content">
                <div className="rc__meta">
                  <span>
                    {moment(item?.attributes?.publishedAt).format(
                      "DD MMM YYYY, h:mm a"
                    )}
                  </span>
                </div>
                <h3 className="rc__post-title">
                  <Link href={`/blog/${item?.id}`}>
                    {item?.attributes?.title}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
