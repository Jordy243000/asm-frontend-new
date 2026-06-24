import React from "react";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 0.1;
const MIN = 0;
const MAX = 500;

const RangeSlider = () => {
  const [values, setValues] = useState([25, 225]);

  return (
    <div className="product-left-item mb-50">
      <h6 className="product-widget-title">Filter by price</h6>
      <div className="filter-widget-content">
        <div className="filter-price">
          <div className="slider-range">
            <label htmlFor="s-amount" className="mb-20">
              Price:
              <output id="output">
                ${values[0].toFixed(1)} - ${values[1].toFixed(1)}
              </output>
            </label>
            <div className="slider-range-wrap">
              <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                  setValues(values);
                }}
                renderTrack={({ props, children }) => (
                  <div className="slider-range-wrap-inner"
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "6px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values,
                          colors: ["#ccc", "#db1c29", "#ccc"],
                          min: MIN,
                          max: MAX,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div className="slider-range-button"
                    {...props}
                  >
                    <div className="slider-range-button-bar"
                      style={{
                        height: "16px",
                        width: "5px",
                        backgroundColor: isDragged ? "#db1c29" : "#db1c29",
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
