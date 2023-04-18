import { getScrappedArticle } from '@/services/article';
import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import Recommendation from './Recommendation';
import PageSpinnerLoading from '../layouts/PageSpinnerLoading';
// import Recommendation from '@/components/article/Recommendation';

const Recommendations = ({ show, handleClose, recommendations }) => {

  const [rec, setRecommendation] = useState({
    title: "",
    author: "",
    link: "",
    time: "",
    picture: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState([])
  const [showViewRecommendation, setShowViewRecommendation] = useState(false)

  const handleCloseViewRecommendation = () => setShowViewRecommendation(false)
  const handleShowViewRecommendation = async (recommendation) => {
    setIsLoading(true)
    const response = await getScrappedArticle(recommendation.link)
    setRecommendation(recommendation)
    setContent(response.text)
    setIsLoading(false)
    setShowViewRecommendation(true)
  }

  return (
    <>
      <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Recommendations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {isLoading && <PageSpinnerLoading></PageSpinnerLoading>}

          <Recommendation show={showViewRecommendation} handleClose={handleCloseViewRecommendation} recommendation={rec} content={content}></Recommendation>
          {recommendations.map((recommendation, index) => {
            return (
              <div onClick={() => handleShowViewRecommendation(recommendation)} key={index} className='d-flex' style={{ cursor: 'pointer' }}>
                <div style={{ margin: '0 20px 20px 0' }}>
                  <img style={{ 'float': 'right', width: '200px' }} key={recommendation.picture} src={recommendation.picture} />
                </div>
                <div>
                  <h5 key={recommendation.title}>{recommendation.title}</h5>
                  <p key={recommendation.author}>{recommendation.author}</p>
                  <p key={recommendation.time}>{recommendation.time}</p>
                </div>
              </div>
            )
          })

          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>  
    </>

  )
}

export default Recommendations;