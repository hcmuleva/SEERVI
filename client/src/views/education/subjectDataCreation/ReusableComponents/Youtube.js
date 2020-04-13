import React from 'react'
/**
This is you tube content creator component. 
    1. Form which accept url and description input 
    2. Save button.
 */
export default function Youtube() {
    return (
        <div>
           <input type="text" name="utubeURL" onChange={()=>{
               console.log("YouTube URL ")
           }} value="Please enter Youtube URL" />
        </div>
    )
}
