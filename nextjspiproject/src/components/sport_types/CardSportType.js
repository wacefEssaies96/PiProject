import React, { useState } from 'react';
import SportRating from '../SportRating';

const CardSportType = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        < div className="col-12 col-lg-6 col-md-6" >
            <article
                id="post-157"
                className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty"
            >
                <div className="post_img">
                    <div className="vc_column-inner">
                        <div className="wpb_wrapper">
                            <div className="wpb_single_image wpb_content_element vc_align_center  vc_custom_1641317696669">
                                <video width="100%" controls>
                                    <source src={`${process.env.backurl}/${props.sT.demoVideo}`} />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post-info">
                    <div className='d-flex justify-content-between'>
                        <h2 className="post-title">
                            {props.sT?.title}
                        </h2>
                        <div style={{ marginRight:"10px", marginTop:"5px" }} className="wd-stars">
                            <SportRating sportSubType={props.sT}/>
                        </div>
                    </div>
                    <div>
                        {isExpanded ? props.sT?.definitionHistory : props.sT?.definitionHistory.slice(0, 100)}
                        <div className="wd-blog-bottom-meta">
                            <div className="wd-author-meta">
                                <div className="wd-post_date"></div>
                                <button onClick={toggleExpand} className="btn wd-btn-round-2">{isExpanded ? 'Read less' : 'Read more'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div >
    );
};

export default CardSportType;
