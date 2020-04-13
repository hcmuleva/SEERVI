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
import SubOrgCard from "./SubOrgCardView";
import CreateUserDataDialog from "./addUserDialog";
import CreateOrgDialog from "./addOrgdialog";
import CreateSubOrgDialog from "./addSubOrg";
import CreateRoleDialog from "./addRole";
import UserRoleAssignmentTabular from "./UserRoleAssignmentTabular";
const useStyles = makeStyles({
  card: {
    maxWidth: 275,
  },
  media: {
    height: 10,
  },
});
export default function OrgCard(props) {
  const [selectOrg, setSelectOrg] = useState(null);
  const [roleAssing, setRoleAssing] = useState(null);
  const [isAddUser, setIsAddUser] = useState();
  const { loading: orgLoading, error: orgError, data: orgData } = useQuery(
    GET_ORGS
  );
  if (orgError) return <p>Org ERROR: {orgError.message}</p>;
  if (orgData === undefined) return <p>ERROR</p>;
  if (orgLoading) {
    return <div>ORG Loading</div>;
  }
  console.log("orgData", orgData);
  const classes = useStyles();

  const getMediaCard = (org) => {
    return (
      <Col lg="6" sm="12" className="mb-4" key={org.id}>
        <Card small className="card-post card-post--1">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="../../../images/avatars/0.jpg"
              alt="Smiley face"
              title={org.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                {org.name}
              </Typography>
              <div
                className="hcm"
                onClick={() => {
                  const myData = { id: org.id, name: org.name };

                  console.log("org Selected", myData);
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
            <CreateUserDataDialog orgid={org.id} orgname={org.name} />
            <CreateSubOrgDialog orgid={org.id} />
            <CreateRoleDialog orgid={org.id} />

            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setRoleAssing(org);
              }}
            >
              RoleAssign
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                console.log("SubOrg Selected for Suborg", org.id);
                setSelectOrg(org);
              }}
            >
              Suborg
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                return <UserRoleAssignmentTabular orgid={org.id} />;
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
      <CreateOrgDialog />
      {isAddUser ? <h3>AddUser</h3> : ""}
      {/* Page Header */}

      <Row>
        {selectOrg ? (
          <SubOrgCard
            suborgs={selectOrg}
            orgData={orgData}
            resetSuborg={setSelectOrg}
          />
        ) : roleAssing ? (
          <UserRoleAssignmentTabular orgid={roleAssing.id} />
        ) : (
          orgData.allorgs.map((org) => {
            return getMediaCard(org);
          })
        )}
      </Row>
    </Container>
  );
}
