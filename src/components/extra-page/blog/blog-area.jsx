import BlogCategory from "./blog-category";
import BlogSearch from "./blog-search";
import BlogTag from "./blog-tag";
import PostArea from "./post-area";
import RecentPost from "./recent-post";

const BlogArea = () => {
  return (
    <div className="postbox-area pt-70 pb-60">
      <div className="container">
        <div className="row">
          <PostArea />
          {/* <div className="col-lg-4">
            <div className="blog__sidebar-wrapper pb-60">
              <BlogSearch />
              <BlogCategory />
              <RecentPost />
              <BlogTag />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogArea;
