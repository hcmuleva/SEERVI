import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GET_ORGS } from "../../../graphql/queries/administration/org";
import { Container, Row, Col } from "shards-react";
import OrgCard from "./OrgCardView";
import CreateSubOrgDialog from "./addSubOrg";
const useStyles = makeStyles({
  card: {
    maxWidth: 275,
  },
  media: {
    height: 10,
  },
});
export default function SubOrgCard(props) {
  const suborgs = props.suborgs.suborgs;
  console.log("ORG ID FOR SUBORG ADD ", props.suborgs);
  console.log("SUBORG PROPS ", suborgs);
  const classes = useStyles();
  const [isOrg, setIsOrg] = useState(false);
  const getMediaCard = (suborg) => {
    return (
      <Col lg="5" md="6" sm="12" className="mb-4" key={suborg.id}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="../../../images/avatars/0.jpg"
              alt="Smiley face"
              title={suborg.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                {suborg.name}
              </Typography>
              <div
                className="hcm"
                onClick={() => {
                  const myData = { id: suborg.id, name: suborg.name };

                  console.log("suborg Selected", myData);
                }}
              ></div>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                align="center"
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="secondary">
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                console.log("Secondary button  clicked Remove");
              }}
            ></Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<PersonAddIcon />}
              onClick={() => {
                console.log("Secondary button  clicked Remove");
              }}
            ></Button>
            {suborg.userGroups && suborg.userGroups.length > 0 ? (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  console.log("Secondary button  clicked Temp");
                }}
              >
                Groups
              </Button>
            ) : (
              ""
            )}

            <Button
              size="small"
              color="primary"
              onClick={() => {
                console.log("Secondary button  clicked Temp");
              }}
            >
              Role
            </Button>
          </CardActions>
        </Card>
      </Col>
    );
  };
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <CreateSubOrgDialog org={props.suborgs.id} />
      <Row noGutters className="page-header py-4">
        <Button
          size="small"
          color="primary"
          onClick={() => {
            console.log("suborg STATUS", isOrg);
            setIsOrg(true);
          }}
        >
          BackToOrg
        </Button>
        {isOrg ? (
          <OrgCard />
        ) : (
          suborgs.map((suborg) => {
            console.log("suborg", suborg);
            return getMediaCard(suborg);
          })
        )}
      </Row>
    </Container>
  );
}
