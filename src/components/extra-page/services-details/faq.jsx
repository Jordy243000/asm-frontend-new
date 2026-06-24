import React from "react";

const FaqSection = ({ faq }) => {
  return (
    <div className="services_faq">
      <div className="section__title mb-30">
        <h3 className="title-sm">FAQ sur nos services.</h3>
      </div>
      <div className="accordion__wrapper accordion__wrapper-1 pr-20">
        <div className="accordion" id="accordionExample">
          {faq?.map((item, idx) => {
            return (
              <div className="accordion-item" key={idx}>
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className={
                      idx == 0
                        ? `accordion-button`
                        : `accordion-button collapsed`
                    }
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idx}`}
                    aria-expanded={idx == 0 ? `true` : `false`}
                    aria-controls={`collapse${idx}`}
                  >
                    {item?.question}
                  </button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className={
                    idx == 0
                      ? `accordion-collapse collapse show`
                      : `accordion-collapse collapse`
                  }
                  aria-labelledby={`heading${idx}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>{item?.response}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
