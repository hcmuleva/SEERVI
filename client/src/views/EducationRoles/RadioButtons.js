import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

export default function RadioButtons(props) {
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleChange = (event,id) => {
    console.log("id ", id, "  andd Event ",event.target.value)
    setSelectedValue(event.target.value);
    
  };
  console.log("SELECTED VALUE ===",selectedValue)
  const getRadio=(val,elm)=>{
       return ( <FormControlLabel
          value={val}
          key={val}
          onChange={(event,id)=>{
            console.log("ID OF ITEM ",elm.id, "  object",elm)
            props.selectedRole(elm)
            handleChange(event,elm.id)
            }}
          control={<GreenRadio key={val}
        checked={selectedValue === `${val}`}
       
        value={val}
        label={val}
        
        color="default"
        name="radio-button-demo"
        inputProps={{ 'aria-label': {val}}}
      />}
          label={val}
          labelPlacement="start"
        />
        )
  }
  const myRadioList=["STUDENT", "TEACHER","PARENT"]
  return (
    <div>
      {props.roleList.map((elm)=>{
        return getRadio(elm.name,elm)
      })}
     
    </div>
  );
}
