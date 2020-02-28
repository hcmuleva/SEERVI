import React,{useState} from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SelectComponent(props) {
    console.log("suborgList SelectComponent",props.listdata)
    const [org, setOrg] = useState('');
    const [data,setData]=useState({});
    
    const myorglist=props.listdata
    const handleChange = (event,data) => {
        console.log("Selected ==", event.target.value)
        
        setOrg(event.target.value);
        setData(event.target.name)
        console.log("Selected data==", data)
    };

    const getMenuItems=()=>{
        
        return myorglist.map((org)=>{
            return (<MenuItem key={org.id} value={org}>{org.name}</MenuItem>)
        })
    }
    return (
        <div>
            <FormControl >
        <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={org}
          onChange={(e)=>{
              props.setSelected(e.target.value)
              console.log("E ",e.target.value, " AND ",e.target.key)
             setOrg(e.target.value);
             setData(e.target.name)
            }}
        >
        {getMenuItems()}
         
        </Select>
      </FormControl>
        </div>
    )
}
