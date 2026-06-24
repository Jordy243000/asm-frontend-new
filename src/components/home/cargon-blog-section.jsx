"use client";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { truncateText } from "@/utils/cargon-helpers";
import { useSiteContent } from "@/context/site-content-provider";

function getBlogTypeLabel(type) {
  if (type === "article") return "Article";
  if (type === "news") return "Actualité";
  if (type === "statement") return "Communication";
  return "Publication";
}

function getBlogImage(item, index) {
  const url = item?.attributes?.image?.data?.attributes?.url;
  if (url) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    const origin =
      item?._assetsOrigin || process.env.NEXT_PUBLIC_ASSETS_ORIGIN || "";
    return `${origin}${url}`;
  }
  return `/cargon/img/blog/ca-blog-2.${(index % 3) + 1}.png`;
}

function BlogMeta({ item }) {
  return (
    <div className="ca-b-meta ca-b-meta-2">
      {item?.attributes?.author ? (
        <span className="ca-blog-meta ca-blog-meta-2">
          <div className="ca-meta-icon">
            <span>
              <img src="/cargon/img/icon/ca-user2.1.svg" alt="" />
            </span>
          </div>
          <div className="ca-meta-title ca-meta-title-2">
            <span>{item.attributes.author}</span>
          </div>
        </span>
      ) : null}
      <span className="ca-blog-meta ca-blog-meta-2">
        <div className="ca-meta-icon">
          <span>
            <img src="/cargon/img/icon/ca-calender2.1.svg" alt="" />
          </span>
        </div>
        <div className="ca-meta-title ca-meta-title-2">
          <span>{moment(item?.attributes?.publishedAt).format("DD MMMM YYYY")}</span>
        </div>
      </span>
    </div>
  );
}

function BlogCardContent({ item }) {
  return (
    <>
      <BlogMeta item={item} />
      <h4 className="ca-blog-title fnw-600">
        <Link href={`/blog/${item.id}`}>{item?.attributes?.title}</Link>
      </h4>
      <p className="pb-8">
        <span className="theme-color-2 fnw-600">{getBlogTypeLabel(item?.attributes?.type)}</span>
        {" — "}
        {truncateText(item?.attributes?.description, 100)}
      </p>
      <div className="blog-rearmore">
        <Link href={`/blog/${item.id}`} className="read-more">
          Lire plus{" "}
          <span>
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </Link>
      </div>
    </>
  );
}

const CargonBlogSection = ({ blogData = [] }) => {
  const { homePage } = useSiteContent();
  const posts = blogData.filter(Boolean);
  const [first, second, featured, ...rest] = posts;
  const sidePosts = posts.length >= 3 ? [first, second].filter(Boolean) : [];
  const highlight = posts.length >= 3 ? featured : posts.length === 1 ? first : null;
  const singlePost = posts.length === 1 ? first : null;
  const twoPosts = posts.length === 2 ? [first, second] : [];

  return (
    <section className="ca-blog pt-100 pb-70">
      <div className="container">
        <div
          className="ca-blog-content ca-sec-content-2 text-center mb-60"
          data-aos="fade-up"
        >
          <h5 className="ca-section-subtitle subtitle-bg-4 p-relative theme-color-2 d-inline-block">
            {homePage.blogSubtitle}
          </h5>
          <h2 className="ca-section-title theme-black-2 fnw-600 pt-16">
            {homePage.blogTitle}
          </h2>
          <p className="pt-16">{homePage.blogDescription}</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center cream-bg-2 br-7 p-40 mb-30" data-aos="fade-up">
            <p className="mb-20">
              Aucune actualité publiée pour le moment. Revenez bientôt pour découvrir nos
              dernières nouvelles.
            </p>
          </div>
        ) : null}

        {singlePost ? (
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div
                className="ca-team-box ca-blog-box-2 cream-bg-2 br-7 fix p-relative z-index-1 mb-30"
                data-aos="fade-up"
              >
                <div className="ca-team-img ca-blogimg-2 ca-lar-img-2">
                  <Link href={`/blog/${singlePost.id}`}>
                    <img
                      className="w-100"
                      src={getBlogImage(singlePost, 0)}
                      alt={singlePost?.attributes?.title}
                    />
                  </Link>
                </div>
                <div className="ca-blog-box-content ca-blog-box-content-2">
                  <BlogCardContent item={singlePost} />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {twoPosts.length === 2 ? (
          <div className="row">
            {twoPosts.map((item, index) => (
              <div key={item.id} className="col-lg-6 col-md-6 mb-30" data-aos="fade-up">
                <div className="ca-team-box ca-blog-box-2 cream-bg-2 br-7 fix p-relative z-index-1">
                  <div className="ca-team-img ca-blogimg-2 ca-lar-img-2">
                    <Link href={`/blog/${item.id}`}>
                      <img
                        className="w-100"
                        src={getBlogImage(item, index)}
                        alt={item?.attributes?.title}
                      />
                    </Link>
                  </div>
                  <div className="ca-blog-box-content ca-blog-box-content-2">
                    <BlogCardContent item={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {posts.length >= 3 ? (
          <div className="row">
            <div className="col-lg-6 col-md-6">
              {sidePosts.map((item, index) => (
                <div
                  key={item.id}
                  className="ca-team-box ca-blog-box-2 cream-bg-2 br-7 fix p-relative z-index-1 d-flex mb-30"
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <div className="ca-team-img ca-blogimg-2">
                    <Link href={`/blog/${item.id}`}>
                      <img src={getBlogImage(item, index)} alt={item?.attributes?.title} />
                    </Link>
                  </div>
                  <div className="ca-blog-box-content ca-blog-box-content-2">
                    <BlogCardContent item={item} />
                  </div>
                </div>
              ))}
            </div>

            {highlight ? (
              <div className="col-lg-6 col-md-6">
                <div
                  className="ca-team-box ca-blog-box-2 cream-bg-2 br-7 fix p-relative z-index-1 mb-30"
                  data-aos="fade-left"
                >
                  <div className="ca-team-img ca-blogimg-2 ca-lar-img-2">
                    <Link href={`/blog/${highlight.id}`}>
                      <img
                        className="w-100"
                        src={getBlogImage(highlight, 2)}
                        alt={highlight?.attributes?.title}
                      />
                    </Link>
                  </div>
                  <div className="ca-blog-box-content ca-blog-box-content-2">
                    <BlogCardContent item={highlight} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {rest.length > 0 ? (
          <div className="row pt-10">
            {rest.map((item, index) => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-30" data-aos="fade-up">
                <div className="ca-team-box ca-blog-box-2 cream-bg-2 br-7 fix p-relative z-index-1">
                  <div className="ca-team-img ca-blogimg-2 ca-lar-img-2">
                    <Link href={`/blog/${item.id}`}>
                      <img
                        className="w-100"
                        src={getBlogImage(item, index + 3)}
                        alt={item?.attributes?.title}
                      />
                    </Link>
                  </div>
                  <div className="ca-blog-box-content ca-blog-box-content-2">
                    <BlogCardContent item={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="text-center pt-20" data-aos="fade-up">
          <Link href={homePage.blogButtonLink} className="ca-btn-primary-22">
            {homePage.blogButtonText}{" "}
            <span>
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CargonBlogSection;
