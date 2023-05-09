import { createComment } from "@/services/article";
import { deleteData, fetchData, generateKey } from "@/services/mix";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";

export default function SingleArticle({ article, comments, user }) {

    const [content, setContent] = useState('');
    const [comment, setComments] = useState(comments);

    const refreshComment = async () => {
        const response = await fetchData(`${process.env.backurl}/api/comment/find/${article._id}`)
        setComments(response)
    }

    const postComment = async () => {
        await createComment(article._id, user._id, content)
        await refreshComment()
        setContent('')
    }

    return (
        <article style={{ width: "700px", marginRight: "20px" }}
            className="post-single post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
            <div className="post_content">
                <div className="post-meta-content-box">
                    <div className="single_post_img">
                        <img width="730" height="520" src={`${process.env.backurl}/${article.thumbnail}`}
                            className="img-fluid wp-post-image" alt="" decoding="async"
                            sizes="(max-width: 730px) 100vw, 730px" />
                    </div>
                    <div className="post_meta">
                        {/* <span>
                            <img src="https://secure.gravatar.com/avatar/43a895c298015d854080cdfe5daac351?s=96&amp;d=mm&amp;r=g"
                                className="avatar rounded-circle" alt="author-img" /> <a
                                    href="../author/hamzashatelaoutlook-com/index.html">John Martin</a></span> */}
                        <span><a href="#" className="blog-admin">{article.createdAt.split('T')[0]}</a></span>
                        {/* <span>
                            <a href="../category/cannabis/index.html" rel="category tag">Cannabis</a> , <a
                                href="../category/products/index.html" rel="category tag">Products</a> </span> */}
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: article.content }}></div>

                </div>
                {article.status == 'published' && user != null &&
                    <>
                        <div className="post-details-tags-social">
                            <div className="row">
                                <div className="col-lg-8 col-md-6">
                                    {/* <div className="tag-box">
                                <h5>Related Tags:</h5>
                                <ul>
                                    <li><a href="../tag/foods/index.html" rel="tag">Foods</a><a href="../tag/organic/index.html"
                                        rel="tag">Organic</a><a href="../tag/tasty/index.html" rel="tag">Tasty</a></li>
                                </ul>
                            </div> */}
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="social-media-box">
                                        <h5>Social Share</h5>
                                        <ul>
                                            <li><a
                                                href="https://www.facebook.com/sharer/sharer.php?u=https://slidesigma.com/themes/wp/weefly/grow-cannabis-at-farm-with-weefly-from-the-cannabis/"
                                                className="fb-post-share"><i className="fab fa-facebook-f ss-facebook"></i></a></li>
                                            <li><a
                                                href="https://twitter.com/intent/tweet?text=Grow%20cannabis%20at%20farm%20with%20Weefly%20from%20the%20cannabis&amp;url=https://slidesigma.com/themes/wp/weefly/grow-cannabis-at-farm-with-weefly-from-the-cannabis/&amp;via=Crunchify"
                                                className="tw-post-share"><i className="fab fa-twitter ss-twitter"></i></a></li>
                                            <li><a
                                                href="https://plus.google.com/share?url=https://slidesigma.com/themes/wp/weefly/grow-cannabis-at-farm-with-weefly-from-the-cannabis/"
                                                className="gg-post-share"><i className="fab fa-google-plus-g ss-google-plus"></i></a></li>
                                            <li><a
                                                href="http://www.linkedin.com/shareArticle?mini=true&amp;titleGrow%20cannabis%20at%20farm%20with%20Weefly%20from%20the%20cannabis=&amp;url=https://slidesigma.com/themes/wp/weefly/grow-cannabis-at-farm-with-weefly-from-the-cannabis/"
                                                className="ln-post-share"><i className="fab fa-linkedin-in ss-linkedin"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment-box">
                            <div id="comment-box">
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="lead">Comments</h5>
                                        <ul className="comments">
                                            {comment && comment.map((element, index) => {
                                                return (
                                                    <li id="comment-38" className="comment" key={index}>
                                                        <article key={generateKey('article')}>
                                                            <div className="comment-avatar" key={generateKey('comment-avatar')}>
                                                                {element.user.image
                                                                    ? <img alt='user image' src={`${process.env.backurl}/${element.user.image}`}
                                                                        className='avatar avatar-70 photo' height='70' width='70' loading='lazy' decoding='async'
                                                                        key={element.user.image} />
                                                                    :
                                                                    <img alt='alt image' src={`${process.env.backurl}/uploads/User/altUser.png`}
                                                                        key={element.user.image}
                                                                        className='avatar avatar-70 photo' height='70' width='70' loading='lazy' decoding='async' />
                                                                }
                                                            </div>
                                                            <div className="comment-content" key={generateKey('comment-content')}>
                                                                <div className="comment-meta" key={generateKey('comment-meta')}>
                                                                    <div className="comment-meta-header" key={generateKey('comment-meta-header')}>
                                                                        <span className="wd-primary-color author" key={element.user.fullname}>{element.user.fullname}</span>
                                                                        <span className="entry-date" key={element.data}><i className="far fa-calendar-alt" key={generateKey('calendar-alt')}></i> {element.date.split('T')[0]}</span>
                                                                    </div>
                                                                    <div className="comment-meta-reply">
                                                                        {user && <>
                                                                            {user._id == element.user._id &&
                                                                                <button className="btn" onClick={async () => { await deleteData(`${process.env.backurl}/api/comment/delete/${element._id}`); await refreshComment() }} type="button">
                                                                                    <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                                                                                </button>
                                                                            }
                                                                        </>}

                                                                    </div>
                                                                </div>
                                                                <div className="comment">
                                                                    <p>{element.content}</p>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div id="respond" className="comment-respond">
                                    <form id="comment-form" className="comment-form">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Comment" className="form-control" required rows="3" name="comment"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="form-submit">
                                            <button onClick={postComment} type="button" name="comment-submit" className="btn wd-btn-round-2">
                                                <span>Post Comment</span>
                                            </button>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div >
                    </>
                }
            </div>
        </article >
    )
}