"use client";
import React from "react";
import axios from "axios";

//swiper style
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const TestimonialArea = ({}) => {
  const [testiData, setTestiData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const testimonialResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/testimonials?populate=*`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTestiData(testimonialResponse?.data?.data);

        //setPages(solutionResponse?.data?.meta?.pagination?.pageCount);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg(
          error.response?.data?.error?.message
            ? error?.response?.data?.error?.message
            : error.toString()
        );
      }
    };

    fetchData();
  }, []);
  //console.log(testiData, "les testiiii");
  return (
    <section className="testimonial-area testimonial-space pb-120 pt-120 bg-css">
      <div className="container">
        <div
          className="row justify-content-center wow fadeInUp"
          data-wow-duration="1.5s"
          data-wow-delay=".3s"
        >
          <div className="col-xl-5">
            <div className="section__title text-center mb-35">
              <span className="sub-title">Témoignages</span>
              <h2 className="title">Ce que disent nos clients à notre sujet</h2>
            </div>
          </div>
        </div>

        <div
          className="testimonial-box wow fadeInUp"
          data-wow-duration="1.5s"
          data-wow-delay=".5s"
        >
          {/* <div className="testimonial-active testimonial-one"> */}
          <div className="testimonial-one">
            <div>
              <Swiper
                slidesPerView={3}
                spaceBetween={32}
                //centeredSlides={true}
                loop={true}
                // Responsive breakpoints
                breakpoints={{
                  1400: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    centeredSlides: false,
                  },
                  768: {
                    slidesPerView: 2,
                    centeredSlides: false,
                    spaceBetween: 15,
                  },
                  576: {
                    slidesPerView: 1,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
              >
                {testiData?.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div>
                      <div className="testimonial-shadow">
                        <div className="testimonial-items">
                          <div className="testimonial__icon rate">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                          <div className="testimonial__text">
                            <p>{item?.attributes?.testimonial}</p>
                          </div>
                          <div className="testimonial__auth">
                            {/* <div className="testimonial__auth-img f-left mr-20">
                              <Image
                                src={item.image}
                                style={{ width: "100%", height: "auto" }}
                                alt="Testimonial"
                              />
                            </div> */}
                            <div className="testimonial__auth-text fix">
                              <h4>{item?.attributes?.name}</h4>
                              <span>{item.attributes?.job}</span>,&nbsp;
                              <small style={{ textDecoration: "none" }}>
                                {item?.attributes?.company}
                              </small>
                            </div>
                          </div>
                          <div className="testimonial__quote-icon quote">
                            <i className="fas fa-quote-left"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialArea;
