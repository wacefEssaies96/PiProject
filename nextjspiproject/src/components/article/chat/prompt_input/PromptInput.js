import { useEffect, useRef, useCallback } from 'react';
import ContentEditable from 'react-contenteditable';
// import '@/styles/PromptInput.module.css'

const PromptInput= ({ prompt, onSubmit, updatePrompt }) => {
  const checkKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.ctrlKey || e.shiftKey) {
        document.execCommand('insertHTML', false, '<br/><br/>');
      } else {
        onSubmit();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  const contentEditableRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", checkKeyPress);
    return () => {
      window.removeEventListener("keydown", checkKeyPress);
    };
  }, [checkKeyPress]);

  return (
    <ContentEditable
      innerRef={contentEditableRef}
      html={prompt}
      disabled={false}
      id="prompt-input"
      className="prompt-input"
      onChange={(event) => updatePrompt(event.target.value)}
    />
  );
};

export default PromptInput;