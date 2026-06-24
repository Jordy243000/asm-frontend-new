import React from 'react';

const Form = () => {
    const formData = [
        {
            id: 1,
            col: 'col-xl-4 col-lg-6',
            placeholder: 'Full name',
            icon: 'fas fa-user'
        },
        {
            id: 2,
            col: 'col-xl-4 col-lg-6',
            placeholder: 'Phone number',
            icon: 'fas fa-phone'
        },
        {
            id: 3,
            col: 'col-xl-4 col-lg-12',
            placeholder: 'Email address',
            icon: 'fas fa-envelope'
        },

    ]

    const handleSubmit = (event) => {
        event.preventDefualt()
    }
    return (
        <form onSubmit={handleSubmit} action="#">
            <div className="row">
                {
                    formData.map((item) => (
                        <div className={item.col} key={item.id}>
                            <div className="single-input-field mb-30">
                                <input type="text" placeholder={item.placeholder} />
                                <i className={item.icon}></i>
                            </div>
                        </div>
                    ))
                }
                <div className="col-lg-12">
                    <div className="single-input-field textarea mb-30">
                        <textarea name="message" id="message" placeholder="Message"></textarea>
                        <i className="fas fa-edit"></i>
                    </div>
                </div>
                <div className="col-lg-12">
                    <button className="fill-btn clip-btn" type="submit">make a
                        request</button>
                </div>
            </div>
        </form>
    );
};

export default Form;