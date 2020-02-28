import React from 'react'

export const CheckBox = props => {
    console.log("Props key ",props.ukey)
    return (
      <div>
       <input key={props.ukey}  onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
      </div>
    )
}

export default CheckBox