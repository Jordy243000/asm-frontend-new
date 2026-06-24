import NiceSelect from '@ui/niceSelect';
import React from 'react';

const selectHandler = e => {}
const handleSubmit = (e) => {
    e.preventDefault();
  }
const ReplyForm = () => {
    return (
      <div className="post-comment-form">
        <div className="section__title mb-30">
          <h3 className="title-sm">Leave a Reply</h3>
        </div>
        <div className="bd-contact-form-wrapper mb-30">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="single-input-field mb-30">
                  <input type="text" placeholder="Name" />
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-6">
                <div className="single-input-field mb-30">
                  <input type="email" placeholder="Email" />
                  <i className="fas fa-envelope"></i>
                </div>
              </div>
              <div className="col-12">
                <div className="single-input-field select mb-30">
                  <NiceSelect
                    options={[
                      { value: "Select Subject", text: "Select Subject" },
                      { value: "Subject One", text: "Subject One" },
                      { value: "Subject Two", text: "Subject Two" },
                      { value: "Subject Three", text: "Subject Three" },
                    ]}
                    defaultCurrent={0}
                    onChange={selectHandler}
                    name="Select Subject"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="single-input-field mb-30 textarea">
                  <textarea placeholder="Message"></textarea>
                  <i className="fas fa-edit"></i>
                </div>
              </div>
              <div className="col-12">
                <div className="comment-reply-btn">
                  <button type="submit" className="fill-btn clip-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
};

export default ReplyForm;