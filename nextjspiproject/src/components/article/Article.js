import { Button, Card } from "react-bootstrap";

export default function Article({ article }) {
    return (
        // <Card style={{ width: '18rem', height : '22rem' }}>
        //     <Card.Img style={{ height: '15rem' }} variant="top" src={`${process.env.backurl}/${article.thumbnail}`} />
        //     <Card.Body>
        //         <Card.Title>{article.title}</Card.Title>
        //         <Card.Text>
        //             {article.description}
        //         </Card.Text>
        //     </Card.Body>
        // </Card>

        <>
            <article id="post-157"
                class="post_wrap post-157 post type-post status-publish format-standard has-post-thumbnail hentry category-cannabis category-products tag-foods tag-organic tag-tasty">
                <div class="post_img">
                    <a href="../grow-cannabis-at-farm-with-weefly-from-the-cannabis/index.html">
                        <img width="730" height="520"
                            src={`${process.env.backurl}/${article.thumbnail}`} class=" wp-post-image"
                            alt="" decoding="async"
                            sizes="(max-width: 730px) 100vw, 730px" /> </a>
                </div>
                <div class="post-info">
                    <div class="post_meta">
                        <span>
                            <img
                                src="https://secure.gravatar.com/avatar/43a895c298015d854080cdfe5daac351?s=96&amp;d=mm&amp;r=g"
                                class="avatar rounded-circle" alt="author-img" /> <a
                                    href="../author/hamzashatelaoutlook-com/index.html">John Martin</a></span>
                        <span><a href="/admin/articles">{article.createdAt}</a></span>
                    </div>
                    <h2 class="post-title">
                        <a href="../grow-cannabis-at-farm-with-weefly-from-the-cannabis/index.html">{article.title}</a>
                    </h2>
                    <p class="post-excerpt">{article.description}</p>
                    <div class="wd-blog-bottom-meta">
                        <div class="wd-author-meta">
                            <div class="wd-post_date">
                                <a href="../grow-cannabis-at-farm-with-weefly-from-the-cannabis/index.html"
                                    class="btn wd-btn-round-2">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}