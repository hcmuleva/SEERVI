import React from 'react'

export default function RadioBtton(props) {
    return (
      
      <form>
    <label className="radio-inline">
      <input key='uiid' type="radio" name="optradio" checked={props.selectedOption === 'YOUTUBE'} onChange={(e)=>{
          console.log("Selected Value ", "YOUTUBE")
          props.handleOptionChange("YOUTUBE")
          
          }
          }   />&nbsp;YouTube  
    </label>
    &nbsp;
    &nbsp;
    &nbsp;
    <label className="radio-inline">
    &nbsp;
      <input key='htmlid' type="radio" name="optradio" checked={props.selectedOption === 'HTML'} onChange={(e)=>{
          console.log("Selected Value ", "HTML")
          props.handleOptionChange("HTML")
          
          }
          }   />&nbsp;HTML 
    </label>
    &nbsp;
    &nbsp;
    &nbsp;
    <label className="radio-inline">
    &nbsp;
      <input key='fileiid' type="radio" name="optradio" checked={props.selectedOption === 'FILE'} onChange={(e)=>{
          console.log("Selected Value ", "FILE")
          props.handleOptionChange("FILE")
          
          }
          }  />&nbsp;File 
    </label>
    &nbsp;
    &nbsp;
    &nbsp;
  </form>

    )
}
