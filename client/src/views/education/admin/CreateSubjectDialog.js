import React, { useState } from 'react'
import { styled } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';

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

const formObjectInit = {
  name: '',
  board: '',
  category: '',
  group: '',
  subgroup: '',
  medium: '',
  std: ''
}
   

const CreateSubjectDataDialog = props => {
  const [formObject, setFormObject] = useState(formObjectInit)
  const { createDataHandler } = props
  const [open, setOpen] = React.useState(false)

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  })

  const handleSwitchChange = stdname => event => {
    setSwitchState({ ...switchState, [stdname]: event.target.checked })
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
    createDataHandler(formObject)
   
    if(switchState.addMultiple){
      setOpen(true)
    } else {
       setOpen(false)  
      setFormObject(formObjectInit)
    }
     
     
  }

  const handleChange = formkey => ({ target: { value } }) => {
    setFormObject({ ...formObject, [formkey]: value })
  }
   function iconStyles(type) {
 return {formObjectIcon: {
      color: 'blue',
    }}
  
}
const classes = makeStyles(iconStyles)((props.type));

  return (
    <div>
      <Tooltip title={props.subtitle}>
        <IconButton aria-label={props.subtitle} onClick={handleClickOpen}>
          <AddIcon className={classes.formObjectIcon} />
          <GroupWorkIcon className={classes.formObjectIcon}/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="subformObjectform-dialog-title"
      >
        <DialogTitle id="subformObjectform-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.subtitle}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={props.label1}
            type="text"
            fullWidth
            value={formObject.stdname}
            onChange={handleChange('name')}
          />
          <TextField
            margin="dense"
            label={props.label2}
            type="text"
            fullWidth
            value={formObject.board}
            onChange={handleChange('board')}
          />
          
           <TextField
            margin="dense"
            label={props.label3}
            type="text"
            fullWidth
            value={formObject.category}
            onChange={handleChange('category')}
          />
           <TextField
            margin="dense"
            label={props.label4}
            type="text"
            fullWidth
            value={formObject.group}
            onChange={handleChange('group')}
          />
          <TextField
            margin="dense"
            label={props.label5}
            type="text"
            fullWidth
            value={formObject.subgroup}
            onChange={handleChange('subgroup')}
          />
          <TextField
            margin="dense"
            label={props.label6}
            type="text"
            fullWidth
            value={formObject.medium}
            onChange={handleChange('medium')}
          />
          <TextField
            margin="dense"
            label={props.label7}
            type="text"
            fullWidth
            value={formObject.std}
            onChange={handleChange('std')}
          />
          
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
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
      </Dialog>
    </div>
  )
}

CreateSubjectDataDialog.propTypes = {
  createDataHandler: PropTypes.func.isRequired,
}

export default CreateSubjectDataDialog
