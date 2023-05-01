import { Button, Table } from "react-bootstrap"
import Link from "next/link";
import { approve, reject, sendRequest } from "@/services/article";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";

export default function ManageArticlesList({ list, deleteOneArticle, user, refresh }) {
    const cookies = new Cookies()
    const router = useRouter()
    const successRefresh = (message) => {
        Swal.fire('Success !', message, 'success', {
            buttons: {
                OK: "OK",
            },
        })
            .then((value) => {
                router.reload(window.location.pathname)
            });
    }
    return (
        <>
            {list.length == 0 ? <h2 style={{ marginTop: '50px', marginLeft: '35%', marginRight: '35%' }}>There is no data.</h2>
                : <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Sub category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((article, index) => {
                            return (
                                <tr key={index}>
                                    <td key={article.title}>{article.title}</td>
                                    <td key={article.category.title}>{article.category.title}</td>
                                    <td key={article.subcategory.title}>{article.subcategory.title}</td>
                                    <td key={article.status}>{article.status}</td>
                                    {user === 'admin'
                                        ? <td key={article._id}>
                                            <Link className="btn btn-outline-secondary me-3 ms-3" href={`/articles/${article.title}`}>View</Link>
                                            {article.status == "request" &&
                                                <>
                                                    <Button onClick={async () => { const message = await approve(article._id, cookies.get('user')._id); await refresh; successRefresh(message) }} variant="outline-success">Approve</Button>
                                                    <Button onClick={async () => { const message = await reject(article._id, cookies.get('user')._id); await refresh; successRefresh(message) }} variant="outline-danger">Reject</Button>
                                                </>
                                            }
                                        </td>
                                        : <td key={article._id}>
                                            <Link className="btn btn-outline-secondary me-3 ms-3" href={`/articles/${article.title}`}>View</Link>
                                            {article.status === "draft" &&
                                                <>
                                                    <Link className="btn btn-outline-secondary me-3" href={`/articles/edit/${article._id}`}>Edit</Link>
                                                    <Button onClick={async () => { const message = await sendRequest(article._id, cookies.get('user')._id); await refresh; successRefresh(message) }} className="btn btn-outline-secondary me-3 " variant="outline-warning">Send request</Button>
                                                </>
                                            }
                                            <Button onClick={() => deleteOneArticle(article._id)} variant="outline-danger">Delete</Button>
                                        </td>
                                    }


                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }
        </>
    )
}