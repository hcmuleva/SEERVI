import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function ContentTypeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AddCircleOutlineIcon fontSize={"small"} />
      </Button>
      <Menu
        id="content-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            props.setDatatype("CONTENT");
            console.log("Selected CONTENT");
            setAnchorEl(null);
          }}
        >
          CONTENT
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Selected QUESTION");
            props.setDatatype("QUESTION");
            setAnchorEl(null);
          }}
        >
          QUESTION
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Selected EXAMPLE");
            props.setDatatype("EXAMPLE");
            setAnchorEl(null);
          }}
        >
          EXAMPLE
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Selected TIPS&TRICS");
            props.setDatatype("TIPS&TRICS");
            setAnchorEl(null);
          }}
        >
          TIPS&TRICS
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log("Selected FORMULA");
            props.setDatatype("FORMULA");
            setAnchorEl(null);
          }}
        >
          FORMULA
        </MenuItem>
      </Menu>
    </div>
  );
}
