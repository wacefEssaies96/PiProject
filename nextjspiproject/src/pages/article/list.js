import Link from "next/link";
import { Container, Table, Button } from "react-bootstrap";
import { fetchData } from "@/services/mix";
import { useState, lazy, Suspense } from "react";
import { confirmDelete } from "@/components/article/Alerts";
import SpinnerLoading from "@/components/article/SpinnerLoading";
const CategoriesAndSubCategories = lazy(() => import('@/components/article/CategoriesAndSubCategories'))
const Categories = lazy(() => import('@/components/article/Categories'))

export default function List({ articles }) {

  const [list, setList] = useState(articles)
  const [showAddCat, setShowAddCat] = useState(false);
  const [showViewCat, setShowViewCat] = useState(false);

  const handleCloseAddCat = () => setShowAddCat(false);
  const handleShowAddCat = () => setShowAddCat(true);
  const handleCloseViewCat = () => setShowViewCat(false);
  const handleShowViewCat = () => setShowViewCat(true);
  const refresh = async () => setList(await fetchData(`${process.env.backurl}/api/admin/articles/find-all`))
  const deleteOneArticle = async (id) => confirmDelete(`${process.env.backurl}/api/admin/articles/delete/${id}`, refresh)

  return (
    <Container>
      <h1>List of Articles</h1>
      <Link className="btn btn-outline-success" href={`/article/create`}>Create new article</Link>
      <Button variant="outline-success" onClick={handleShowAddCat}>
        Create new category
      </Button>
      <Button variant="outline-success" onClick={handleShowViewCat}>
        Show categories
      </Button>
      <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
        <CategoriesAndSubCategories refresh={refresh} operation={'Add'} category={{ title: '', subcategory: [] }} show={showAddCat} handleClose={handleCloseAddCat}></CategoriesAndSubCategories>
        <Categories show={showViewCat} handleClose={handleCloseViewCat}></Categories>
      </Suspense>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Sub category</th>
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
                <td key={article._id}>
                  <Link className="btn btn-outline-secondary me-3 ms-3" href={`/article/edit/${article._id}`}>Edit</Link>
                  <Button onClick={() => deleteOneArticle(article._id)} variant="outline-danger">Delete</Button>
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
  const data = await fetchData(`${process.env.backurl}/api/admin/articles/find-all`);
  return {
    props: {
      articles: data
    }
  }
}