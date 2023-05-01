import { submitArticle } from "@/services/article";
import { fetchData } from "@/services/mix";
import { useRouter } from "next/router";
import { useEffect, useState, lazy, Suspense } from "react"
import { Alert, Button, Col, Container, Form, Row, Stack } from "react-bootstrap"
import SpinnerLoading from "../layouts/PageSpinnerLoading";
import Recommendations from "./Recommendations";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import PageSpinnerLoading from "../layouts/PageSpinnerLoading";
const CKeditor = lazy(() => import('./CKeditor'))

export default function ArticleForm(props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [data, setData] = useState("");
  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [showViewRecommendations, setShowViewRecommendations] = useState(false)
  const [operationMode, setOperationMode] = useState('Create')
  const [imageSrc, setImageSrc] = useState('')
  const [validated, setValidated] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [article, setArticle] = useState({
    title: "",
    category: { title: "" },
    subcategory: { title: "" },
    content: "",
    description: ""
  })
  const [recommendation, setRecommendation] = useState([{
    title: "",
    author: "",
    link: "",
    time: "",
    picture: ""
  }])
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // GET DATA
  const getSubcategories = async (event) => {
    const param = event.hasOwnProperty('target') ? event.target.value : event
    let response = await fetchData(`${process.env.backurl}/api/admin/categories/find/title/${param}`)
    setSubCategories(response.subcategory)
    article.category.title = param
  }

  const getRecommendations = async (event) => {
    // setIsLoading(true)
    const param = event.target.value
    article.subcategory.title = param
    const response = await fetchData(`${process.env.backurl}/api/admin/articles/scrap/wired/${param}`)
    setRecommendation(response.articles)
    // setIsLoading(false)
  }

  const getCategories = async () => {
    setCategories(await fetchData(`${process.env.backurl}/api/admin/categories/find-all`))
  }
  // HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      await submitArticle(event, operationMode, data)
      if (props.user == 'admin')
        router.push('/admin/articles')
      else
        router.push('/articles/my-articles')

    }
    setValidated(true);
  }
  // HANDLE IMAGE
  const handleImageChange = (event) => {
    if (event.target.files[0])
      setImageSrc(URL.createObjectURL(event.target.files[0]))
    else
      setImageSrc('')
  }

  // COPY TO CLIPBOARD
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  const handleCopyClick = () => {
    copyTextToClipboard(transcript)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // RECOMMENDATIONS MODAL
  const handleCloseViewRecommendations = () => setShowViewRecommendations(false)
  const handleShowViewRecommendations = () => setShowViewRecommendations(true)

  useEffect(() => {
    getCategories()
    setEditorLoaded(true)
    if (props.article !== undefined) {
      setArticle(props.article)
      setData(props.article.content)
      getSubcategories(props.article.category.title)
      setImageSrc(`${process.env.backurl}/${props.article.thumbnail}`)
      setOperationMode('Modify')
    }
  }, [])

  const handleSpeech = () => {
    SpeechRecognition.startListening()
    setShowTranscript(true)
  }

  return (
    <>
      {
        !listening
          ? <div onClick={handleSpeech} className="dictaphone">
            <i style={{ color: 'white', margin: '17% auto 20% 28%' }} className="fa fa-microphone fa-4x" aria-hidden="true"></i>
          </div>
          : <div onClick={SpeechRecognition.stopListening} className="dictaphone">
            <i style={{ color: 'red', margin: '17% auto 20% 25%' }} className="fa fa-microphone-slash fa-4x" aria-hidden="true"></i>
          </div>
      }
      {
        showTranscript &&
        <Alert className="transcript" variant="warning" onClose={() => { setShowTranscript(false); resetTranscript() }} show={showTranscript} dismissible>
          <Alert.Heading>Dictaphone</Alert.Heading>
          <p>
            {transcript}
          </p>
          <div className="d-flex justify-content-end">
            <button onClick={handleCopyClick} className="btn button">
              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </Alert>
      }
      <Container className="article-form-container">
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
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <p className="btn button" onClick={() => { document.getElementById('imageInput').click() }}>Upload thumbnail</p>
                  {imageSrc != '' && operationMode !== 'Modify' && <p className="btn button" onClick={() => { setImageSrc(''); document.getElementById('imageInput').value = '' }}>Clear image</p>}
                </div>
                {imageSrc != '' && <>
                  <img style={{ width: '400px' }} src={imageSrc} alt="image preview"></img>
                </>}
              </div>
              {operationMode === 'Modify'
                ? <>
                  <Form.Control style={{ display: 'none' }}
                    id="imageInput"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="thumbnail"
                    onChange={handleImageChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a thumbnail of type : png, jpg, jpeg.
                  </Form.Control.Feedback>
                </>
                : <>
                  <Form.Control style={{ display: 'none' }}
                    id="imageInput"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="thumbnail"
                    required
                    onChange={handleImageChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a thumbnail of type : png, jpg, jpeg.
                  </Form.Control.Feedback>
                </>
              }
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
              <Form.Control placeholder="Description" defaultValue={article.description} as="textarea" name="description" style={{ minHeight: '100px' }} required minLength={10} maxLength={1000}></Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please write a description, minimum length : 10, maximum length : 1000.
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
            <Suspense fallback={<PageSpinnerLoading></PageSpinnerLoading>}>
              <Recommendations show={showViewRecommendations} handleClose={handleCloseViewRecommendations} recommendations={recommendation}></Recommendations>
            </Suspense>

          </Stack>
          <button className="btn button" type="submit">Submit</button>
          {recommendation.length > 1 &&
            <>
              <button className="btn button" type="button" onClick={() => handleShowViewRecommendations()}>View recommendations</button>
            </>
          }
        </Form>
      </Container>
    </>

  )
}


