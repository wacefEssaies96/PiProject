import { useState } from 'react';
import axios from "axios";
import PromptInput from "../prompt_input/PromptInput";
import PromptResponseList from "../prompt_response_list/PromptResponseList";
import { Button, Modal } from 'react-bootstrap';

const ChatGPT = () => {
  const [show, setShow] = useState(false);
  const [responseList, setResponseList] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [promptToRetry, setPromptToRetry] = useState(null);
  const [uniqueIdToRetry, setUniqueIdToRetry] = useState(null);
  const [modelValue, setModelValue] = useState('gpt');
  const [isLoading, setIsLoading] = useState(false);
  let loadInterval;

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  }

  const htmlToText = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent;
  }

  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const addLoader = (uid) => {
    const element = document.getElementById(uid);
    element.textContent = ''

    // @ts-ignore
    loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';

      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  }


  const addResponse = (selfFlag, response) => {
    const uid = generateUniqueId()
    setResponseList(prevResponses => [
      ...prevResponses,
      {
        id: uid,
        response,
        selfFlag
      },
    ]);
    return uid;
  }

  const updateResponse = (uid, updatedObject) => {
    setResponseList(prevResponses => {
      const updatedList = [...prevResponses]
      const index = prevResponses.findIndex((response) => response.id === uid);
      if (index > -1) {
        updatedList[index] = {
          ...updatedList[index],
          ...updatedObject
        }
      }
      return updatedList;
    });
  }

  const regenerateResponse = async () => {
    await getGPTResult(promptToRetry, uniqueIdToRetry);
  }

  const getGPTResult = async (_promptToRetry, _uniqueIdToRetry) => {
    // Get the prompt input
    const _prompt = _promptToRetry ?? htmlToText(prompt);

    // If a response is already being generated or the prompt is empty, return
    if (isLoading || !_prompt) {
      return;
    }

    setIsLoading(true);

    // Clear the prompt input
    setPrompt('');

    let uniqueId;
    if (_uniqueIdToRetry) {
      uniqueId = _uniqueIdToRetry;
    } else {
      // Add the self prompt to the response list
      addResponse(true, _prompt);
      uniqueId = addResponse(false);
      await delay(50);
      addLoader(uniqueId);
    }

    try {
      // Send a POST request to the API with the prompt in the request body
      const response = await axios.post(`${process.env.backurl}/api/admin/articles/get-prompt-result`, {
        prompt: _prompt,
        model: modelValue
      });
      if (modelValue === 'image') {
        // Show image for `Create image` model
        updateResponse(uniqueId, {
          image: response.data,
        });
      } else {
        updateResponse(uniqueId, {
          response: response.data.trim(),
        });
      }

      setPromptToRetry(null);
      setUniqueIdToRetry(null);
    } catch (err) {
      setPromptToRetry(_prompt);
      setUniqueIdToRetry(uniqueId);
      updateResponse(uniqueId, {
        // @ts-ignore
        response: `Error: ${err.message}`,
        error: true
      });
    } finally {
      // Clear the loader interval
      clearInterval(loadInterval);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='open-chat' onClick={() => setShow(true)}>
        <i className="fa fa-comment fa-4x" style={{ color: 'white', margin: '17% auto 20% 20%' }}></i>
      </div>

      <Modal show={show} onHide={() => { setShow(false) }} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" size="xl">
        <Modal.Header className='chatgpt-modal' closeButton>
          <Modal.Title>Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body className='chatgpt-modal'>
          <div className='body'>
            <div className="App">
              <div id="response-list">
                <PromptResponseList responseList={responseList} key="response-list" />
              </div>
              {uniqueIdToRetry &&
                (<div id="regenerate-button-container">
                  <button id="regenerate-response-button" className={isLoading ? 'loading' : ''} onClick={() => regenerateResponse()}>
                    Regenerate Response
                  </button>
                </div>
                )
              }
              <div id="model-select-container">
                <label htmlFor="model-select">Select model:</label>
                <select id="model-select" value={modelValue} onChange={(event) => setModelValue(event.target.value)}>
                  <option value="gpt">Chat</option>
                  <option value="image">Create Image</option>
                </select>
              </div>
              <div id="input-container">
                <PromptInput
                  prompt={prompt}
                  onSubmit={() => getGPTResult()}
                  key="prompt-input"
                  updatePrompt={(prompt) => setPrompt(prompt)}
                />
                <button id="submit-button" className={isLoading ? 'loading' : ''} onClick={() => getGPTResult()}></button>
              </div>
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>

  );
}

export default ChatGPT;