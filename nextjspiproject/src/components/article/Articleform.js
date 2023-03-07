import { submitArticle } from "@/services/article";
import { fetchData } from "@/services/mix";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { useEffect, useState, lazy } from "react"
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap"
import SpinnerLoading from "../layouts/PageSpinnerLoading";
const CKeditor = lazy(() => import('./CKeditor'))

export default function ArticleForm(props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [data, setData] = useState("");
  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [recommendation, setRecommendation] = useState('')
  const [operationMode, setOperationMode] = useState('Create')
  const [article, setArticle] = useState({
    title: "",
    category: { title: "" },
    subcategory: { title: "" },
    content: "",
    description: ""
  })
  const [validated, setValidated] = useState(false);

  const getSubcategories = async (event) => {
    const param = event.hasOwnProperty('target') ? event.target.value : event
    let response = await fetchData(`${process.env.backurl}/api/admin/categories/find/title/${param}`)
    setSubCategories(response.subcategory)
    article.category.title = param
  }

  const getRecommendations = async (event) => {
    setIsLoading(true)
    const param = event.target.value
    article.subcategory.title = param
    const response = await fetchData(`${process.env.backurl}/api/admin/articles/scrap/wired/${param}`)
    setRecommendation(response.text)
    setIsLoading(false)
  }

  const getCategories = async () => {
    setCategories(await fetchData(`${process.env.backurl}/api/admin/categories/find-all`))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    setValidated(true);
    await submitArticle(event, operationMode, data)
    if (form.checkValidity() === true) {
      router.push('/article/admin')
    }
  }

  useEffect(() => {
    getCategories()
    setEditorLoaded(true)
    if (props.article !== undefined) {
      setArticle(props.article)
      setData(props.article.content)
      getSubcategories(props.article.category.title)
      setOperationMode('Modify')
    }
  }, [])

  return (
    <Container>
      {isLoading && <SpinnerLoading></SpinnerLoading>}
      <h3>{operationMode}</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit} encType='multipart/form-data'>
        <Stack gap={4}>
          <Form.Group>
            <input type="hidden" name="id" defaultValue={article._id}></input>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control defaultValue={article.title} placeholder="Title" type="text" id="title" name="title" required minLength={4} maxLength={50}></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a title,
              minimum length : 4,
              maximum length : 50.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Thumbnail</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg, .jpeg"
              name="thumbnail"
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a thumbnail of type : png, jpg, jpeg.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Select required value={article.category.title} name="category" onChange={getSubcategories} aria-label="Default select example">
                  <option value="">Select a category</option>
                  {categories && categories.map((category, index) => {
                    return <option value={category.title} key={index}>{category.title}</option>
                  })}
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please select a category.
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Select required value={article.subcategory.title} name="subcategory" onChange={getRecommendations} aria-label="Default select example">
                  <option value="">Select a subcategory</option>
                  {subcategories && subcategories.map((subcategory, index) => {
                    return <option value={subcategory.title} key={index}>{subcategory.title}</option>
                  })}
                </Form.Select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please select a sub category.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder="Description" defaultValue={article.description} as="textarea" name="description" style={{ height: '100px' }} required minLength={10} maxLength={200}></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please write a description, minimum length : 10, maximum length : 200.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="content">Content</Form.Label>
            <CKeditor
              name="content"
              editorLoaded={editorLoaded}
              value={article.content}
              change={(data) => {
                setData(data);
              }}
            />
            <Form.Control defaultValue={data} hidden required minLength={50}></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please write a content, minimum length : 50.
            </Form.Control.Feedback>
          </Form.Group>
          {recommendation.length > 0 &&
            <Form.Group>
              <Form.Label>Recommadation</Form.Label>
              <div style={{ minHeight: "max-content" }}>
                {recommendation}
              </div>
            </Form.Group>
          }
        </Stack>
        <Button variant="success" type="submit">Submit</Button>
      </Form>
    </Container >
  )
}


