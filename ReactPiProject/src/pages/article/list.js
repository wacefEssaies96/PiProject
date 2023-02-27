import Link from "next/link";
import { Button, Container, Table } from "react-bootstrap";

export default function ListArticles({ articles }) {
  return (
    <Container>
      <h1>List of Articles</h1>
      <Link className="btn btn-outline-success" href={`/article/create`}>Create new article</Link>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <td>Title</td>
            <td>Category</td>
            <td>Sub category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>

          {articles.map((article, index) => {
            return (
              <tr>
                <td key={article.title}>{article.title}</td>
                <td key={article.category.title}>{article.category.title}</td>
                <td key={article.subcategory.title}>{article.subcategory.title}</td>
                <td key={article._id}>
                  <Link className="btn btn-outline-secondary me-3 ms-3" href={`/article/edit/${article._id}`}>Edit</Link>
                  <Button variant="outline-danger">Delete</Button>
                </td>
              </tr>
            )
          })}

        </tbody>
      </Table>
    </Container>
  )
}

export async function getServerSideProps() {
  // Fetching data
  const res = await fetch(`${process.env.backurl}/api/admin/articles/find-all`);
  const data = await res.json();
  // Passing data to the listArticles Page using props
  return {
    props: {
      articles: data
    }
  }
}