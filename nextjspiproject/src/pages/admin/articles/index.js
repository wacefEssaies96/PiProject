import Link from "next/link";
import { Container, Table, Button } from "react-bootstrap";
import { fetchData } from "@/services/mix";
import { useState, lazy, Suspense } from "react";
import { confirmDelete } from "@/services/alerts";
import SpinnerLoading from "@/components/layouts/SpinnerLoading";

const CategoriesAndSubCategories = lazy(() => import('@/components/cat_and_subcat/CatAndSubCatList'))
const ManageArticlesList = lazy(() => import('@/components/article/ManageArticlesList'))


export default function Index({ articles }) {

  const [list, setList] = useState(articles)
  const [showMode, setShowMode] = useState('');
  const [showViewCatAndSubCat, setShowViewCatAndSubCat] = useState(false);

  const handleCloseViewCatAndSubCat = () => setShowViewCatAndSubCat(false)
  const handleShowViewCatAndSubCat = (mode) => {
    setShowMode(mode)
    setShowViewCatAndSubCat(true)
  }
  const refresh = async () => setList(await fetchData(`${process.env.backurl}/api/admin/articles/find-all`))
  const deleteOneArticle = async (id) => confirmDelete(`${process.env.backurl}/api/admin/articles/delete/${id}`, refresh)
  const deleteAll = () => confirmDelete(`${process.env.backurl}/api/admin/articles/delete-all`, refresh)

  return (
    <Container style={{ minHeight: '600px' }}>
      <h1>List of Articles</h1>
      <Link className="btn btn-outline-success" href={`/admin/articles/create`}>Create new article</Link>
      <Button variant="outline-warning" onClick={deleteAll}>
        Delete all articles
      </Button>

      <Button variant="outline-success" onClick={() => handleShowViewCatAndSubCat('Category')}>
        Categories management
      </Button>
      <Button variant="outline-success" onClick={() => handleShowViewCatAndSubCat('Sub Category')}>
        Sub categories management
      </Button>


      <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
        <CategoriesAndSubCategories show={showViewCatAndSubCat} handleClose={handleCloseViewCatAndSubCat} mode={showMode}></CategoriesAndSubCategories>
      </Suspense>

      <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
        <ManageArticlesList refresh={refresh} user="admin" list={list} deleteOneArticle={deleteOneArticle}></ManageArticlesList>
      </Suspense>

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