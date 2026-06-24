import Link from "next/link";
import React from "react";
import moment from "moment";

const PostBox = ({ item }) => {
  return (
    <div className="postbox__item format-image mb-55">
      <div className="postbox__thumb w-img mb-35">
        <img
          // src={item.image}
          src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${item?.attributes?.image?.data?.attributes?.url}`}
          style={{ width: "100%", height: "auto" }}
          alt={`Blog-${item?.attributes?.title}-African Shipping Management(ASM) RDC`}
        />
      </div>
      <div className="postbox__content">
        <div className="postbox__meta mb-10">
          <div className="blog__meta">
            <span>
              <Link href="#">
                <i className="fas fa-list"></i>
                {item.attributes?.type === "article"
                  ? `Article`
                  : item.attributes?.type === "news"
                  ? `Actualité`
                  : "Communication"}
              </Link>
            </span>
            <span>
              <Link href="/blog-details">
                <i className="fas fa-user"></i>
                {item?.attributes?.author}
              </Link>
            </span>
            <span>
              <i className="far fa-calendar-alt"></i>{" "}
              {moment(item?.attributes?.publishedAt).format(
                "DD MMM YYYY, h:mm a"
              )}
            </span>
          </div>
        </div>
        <div className="section__title mb-20">
          <h3 className="title-sm">{item?.attributes?.title}</h3>
        </div>
        <div className="postbox__text mb-30">
          <p className="content-para">{item?.attributes?.description}</p>

          {item?.attributes?.content?.map((datum, idx) => {
            return (
              <React.Fragment key={idx}>
                {datum?.title?.length > 0 ? (
                  <div className="section__title mb-20">
                    <h4 className="">{datum?.title}</h4>
                  </div>
                ) : (
                  ""
                )}

                {datum?.textual?.map((text, i) => {
                  return (
                    <React.Fragment key={i}>
                      <p className="content-para">{text?.text}</p>

                      {text?.list?.length > 0 ? (
                        <ul className="mb-25">
                          {text?.list?.map((datum, idx) => {
                            return <li key={idx}>{datum?.list}</li>;
                          })}
                        </ul>
                      ) : (
                        ""
                      )}

                      {text?.image?.data ? (
                        <div className="postbox__thumb w-img mb-30">
                          <img
                            // src={item.image}
                            src={`${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${text?.image?.data?.attributes?.url}`}
                            style={{ width: "100%", height: "auto" }}
                            alt={`Blog-${item?.attributes?.title}-African Shipping Management(ASM) RDC`}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}

          {/* <PostTags /> */}
        </div>
      </div>
    </div>
  );
};

export default PostBox;
