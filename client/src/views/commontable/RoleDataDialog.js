import React, { useState } from 'react'
import { styled } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables"; 
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { Card,Row,Col
} from "shards-react";
const initialOrgValue = {
  name: '',
  description: '',
}


const RoleDataDialog = props => {
  
  const [role, setRole] = useState(initialOrgValue)
  const { createRoleDataHandler } = props
  const [open, setOpen] = React.useState(false)
  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  })

  const handleSwitchChange = name => event => {
    setSwitchState({ ...switchState, [name]: event.target.checked })
  }

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    resetSwitch()
  }

  const handleAdd = event => {
    createRoleDataHandler(role)
    setRole(initialOrgValue)
    switchState.addMultiple ? setOpen(true) : setOpen(false)
  }

  const handleChange = name => ({ target: { value } }) => {
    setRole({ ...role, [name]: value })
  }
   function iconStyles(type) {
   switch (props.type) {
     case "ORG":
       return {roleIcon: {
      color: 'violet',
    }}
       break;
    case "SUBORG":
       return {roleIcon: {
      color: 'green',
    }}
       break;
    case "GROUP":
       return {roleIcon: {
      color: 'blue',
    }}
       break;
    case "SUBGROUP":
       return {roleIcon: {
      color: 'purple',
    }}
       break;
       
     default:
       break;
   }
  
}
const classes = makeStyles(iconStyles)((props.type));

  return (
    <div>
      <Tooltip title={props.subtitle}>
        <IconButton aria-label={props.subtitle} onClick={handleClickOpen}>
          <AddIcon className={classes.roleIcon} />
          <HowToRegIcon className={classes.roleIcon}/>
        </IconButton>
      </Tooltip>
      

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="subroleform-dialog-title"
      >
          <Row>
        <DialogTitle id="subroleform-dialog-title">{props.title}</DialogTitle>
         </Row>
         <Row>
        <DialogContent>
          <DialogContentText>{props.subtitle}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={props.label1}
            type="text"
            fullWidth
            value={role.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin="dense"
            label={props.label2}
            type="text"
            fullWidth
            value={role.description}
            onChange={handleChange('description')}
          />
          
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add Multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
           </Row>
       <Row>
           
      <MUIDataTable

  data={props.roledata}
  columns={props.rolecolumns}
  options={props.roleoptions}

/>


   </Row>
      </Dialog>
    </div>
  )
}

RoleDataDialog.propTypes = {
  createRoleDataHandler: PropTypes.func.isRequired,
}

export default RoleDataDialog
