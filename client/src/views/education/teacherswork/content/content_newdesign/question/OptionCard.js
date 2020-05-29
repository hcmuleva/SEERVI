import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";

import { compose, spacing, palette } from "@material-ui/system";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  FormRadio,
  FormInput,
} from "shards-react";

const Box = styled("div")(compose(spacing, palette));

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OptionCard(props) {
  const classes = useStyles();
  const options = [
    { option: "firstoption" },
    { option: "2firstoption" },
    { option: "3firstoption" },
    { option: "4firstoption" },
  ];
  return (
    <Card small className="mb-3">
      {/**   <object
            type="text/html"
            data={props.optionData.optionurl}
            width="60px"
            height="50px"
          />*/}
      <ListGroup flush>
        <ListGroupItem className="px-3 pb-1">
          <FormControlLabel
            labelPlacement="top"
            control={
              <Box color="white" bgcolor="lightgray" p={1}>
                {options.map((option, index) => {
                  return (
                    <Box color="white" bgcolor="lightgray" p={1}>
                      <FormRadio
                        className="mb-1"
                        value="CQ"
                        onChange={(event) => {}}
                      >
                        {option.option}
                      </FormRadio>
                    </Box>
                  );
                })}
              </Box>
            }
            label="What is your mode of question creation?Please select from below options"
          />
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
