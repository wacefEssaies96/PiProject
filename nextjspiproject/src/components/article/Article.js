
export default function Article({ article }) {
    return (
        <>
            <article style={{width: "330px"}}
                className="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
                <div className="post_img">
                    <a href={`/articles/${article.title}`}>
                        <img className="article-image  wp-post-image"
                            src={`${process.env.backurl}/${article.thumbnail}`}
                            alt="" decoding="async" />
                    </a>
                </div>
                <div className="post-info">
                    <div className="post_meta">
                        <span>
                            <img
                                src="https://secure.gravatar.com/avatar/43a895c298015d854080cdfe5daac351?s=96&amp;d=mm&amp;r=g"
                                className="avatar rounded-circle" alt="author-img" /> <a
                                    href="#">John Martin</a></span>
                        <span>
                            <a href="#">{article.createdAt}</a>
                        </span>
                    </div>
                    <h2 className="post-title">
                        <a href={`/articles/${article.title}`}>{article.title}</a>
                    </h2>
                    <p className="post-excerpt" style={{height: '50px', overflow:"hidden"}}>{article.description}</p>
                    <div className="wd-blog-bottom-meta">
                        <div className="wd-author-meta">
                            <div className="wd-post_date">
                                <a href={`/articles/${article.title}`}
                                    className="btn wd-btn-round-2">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}