import { submitArticle } from "@/services/article";
import { fetchData } from "@/services/mix";
import { useEffect, useState, lazy } from "react"
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap"
import SpinnerLoading from "../layouts/PageSpinnerLoading";
const CKeditor = lazy(() => import('./CKeditor'))

export default function ArticleForm(props) {

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
    await submitArticle(event, operationMode, data)
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
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <Stack gap={4}>
          <Form.Group>
            <input type="hidden" name="id" defaultValue={article._id}></input>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control defaultValue={article.title} placeholder="Title" type="text" id="title" name="title" required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Thumbnail</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg, .jpeg"
              name="thumbnail"
            />
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <Form.Select value={article.category.title} name="category" onChange={getSubcategories} aria-label="Default select example">
                  <option value="nothing">Select a category</option>
                  {categories && categories.map((category, index) => {
                    return <option value={category.title} key={index}>{category.title}</option>
                  })}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select value={article.subcategory.title} name="subcategory" onChange={getRecommendations} aria-label="Default select example">
                  <option value="nothing">Select a subcategory</option>
                  {subcategories && subcategories.map((subcategory, index) => {
                    return <option value={subcategory.title} key={index}>{subcategory.title}</option>
                  })}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Control placeholder="Description" defaultValue={article.description} as="textarea" name="description" style={{ height: '100px' }}></Form.Control>
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
          </Form.Group>
          <Form.Group>
            <Form.Control
              rows={9} placeholder="Recommendation" value={recommendation} as="textarea" readOnly name="recommendation"></Form.Control>
          </Form.Group>
        </Stack>
        <Button variant="success" type="submit">Submit</Button>
      </form>
    </Container>
  )
}


