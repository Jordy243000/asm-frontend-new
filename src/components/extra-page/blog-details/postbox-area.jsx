import React from "react";
import RecentPost from "../blog/recent-post";
import PostBox from "./postbox";

const PostBoxArea = ({ item, blogData }) => {
  return (
    <div className="postbox-area postbox-area-padd pt-70 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="postbox__wrapper mb-60">
              {item ? <PostBox item={item} /> : ""}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="blog__sidebar-wrapper mb-60">
              {/* <BlogSearch /> */}
              {/* <BlogCategory /> */}
              <RecentPost blogData={blogData} />
              {/* <BlogTag /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBoxArea;
