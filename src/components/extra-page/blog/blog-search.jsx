import React from 'react';

const BlogSearch = () => {

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    return (
        <div className="sidebar__widget mb-40">
            <div className="sidebar__widget-content">
                <h3 className="sidebar__widget-title mb-25">Search</h3>
                <div className="sidebar__search">
                    <form onSubmit={handleSubmit}>
                        <div className="single-input-field">
                            <input name="name" type="text" placeholder="Search Here" />
                            <i className="fas fa-search"></i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogSearch;