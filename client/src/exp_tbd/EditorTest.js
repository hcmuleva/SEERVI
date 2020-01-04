import React, { Component } from 'react'
import ReactQuill, { Quill } from "react-quill";
import PropTypes from 'prop-types';
 export default class EditorTest extends Component {
    constructor (props) {
        super(props)
        this.state = { editorHtml: '', theme: 'snow' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
      }
      
      handleChange (html) {
          this.setState({ editorHtml: html });
          console.log(html)
      }
      
      handleThemeChange (newTheme) {
        console.log("NAVE THEAM",this.state)
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme })
        
      }
      handleSubmit(e){
          e.preventDefault()
          console.log(this.state)
      }
      render () {
        return (
          <div>
          <form>
            <ReactQuill 
              theme={this.state.theme}
              onChange={this.handleChange}
              value={this.state.editorHtml}
              modules={EditorTest.modules}
              formats={EditorTest.formats}
              bounds={'.app'}
              placeholder={this.props.placeholder}
             />
            <div className="themeSwitcher">
              <label>Theme </label>
              <select onChange={(e) => 
                  this.handleThemeChange(e.target.value)}>
                <option value="snow">Snow</option>
                <option value="bubble">Bubble</option>
                <option value="core">Core</option>
              </select>
            </div>
            <button type="submit" onSubmit={this.handleSubmit}>Submit</button>
            </form>
           </div>
         )
      }
    }
    
    /* 
     * Quill modules to attach to editor
     * See https://quilljs.com/docs/modules/ for complete options
     */
    EditorTest.modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    }
    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    EditorTest.formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
    
    /* 
     * PropType validation
     */
    EditorTest.propTypes = {
      placeholder: PropTypes.string,
    }
    
