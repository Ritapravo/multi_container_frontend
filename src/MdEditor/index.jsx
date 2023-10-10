import React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './style.css'
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!



const Editor = ({field, setField}) => {
  function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', text);
    setField(text);
  }
  return (
    <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
  )
}

export default Editor;

// import React from 'react'

// const Editor = () => {
//   return (
//     <div>
//         Editor
//     </div>
//   )
// }

// export default Editor
