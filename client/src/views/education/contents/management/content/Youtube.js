import React ,{useState} from 'react';
import styled from 'styled-components';
import { TextField, NoSsr } from '@material-ui/core';

const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: green;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red;
    }
    &:hover fieldset {
      border-color: yellow;
    }
    &.Mui-focused fieldset {
      border-color: green;
    }
  }
`;

export default function Youtube(props) {
    const[youtubeUrl,setYoutubeUrl]=useState()
  return (
    <NoSsr>
      <StyledTextField label="Paste youtube url here" variant="outlined" id="deterministic-outlined-input" onChange={(e)=>{
          setYoutubeUrl(e.target.value)
      }}/>
      <div
  css={`
    background: papayawhip;
    color: ${props => props.theme.colors.text};
  `}
/>
<button
  css="padding: 0.5em 1em;"
  onClick={()=>{
      console.log("Save URL of YOUTUBE \n",youtubeUrl)
      
      }}
>Save</button>
    </NoSsr>
  );
}
