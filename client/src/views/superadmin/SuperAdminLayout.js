import React, { useState, useEffect ,useContext} from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ORGS } from "../queries/getAllOrgs";
import { Divider } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SubOrgPage from "./SubOrgPage";
import gql from "graphql-tag";
import MediaCard from "./MediaCard";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    maxWidth: 275
  },
  media: {
    height: 10
  }
}));

export default function SuperAdminLayout() {
const ContextContainer = React.createContext(null);

  const classes = useStyles();
  const dividerColor = "blue";
  const [orgid, setOrgId] = useState("");
  const [subOrgs, setSubOrgs] = useState([]);
  const { loading, error, data } = useQuery(GET_ORGS);
if (error ) return <p>ERROR: {error.message}</p>;
if (loading) {
    return <div>Orgs are Loading</div>;
} 


const myOrgData = data.getOrg.map(org => {
    return (
    <Col lg="3" md="6" sm="12" className="mb-4" key={org.id}>
       {/** <MediaCard data={org} orgSetter={orgSelection} /> */}
    </Col>
    );
});

// const isSuborg =subOrgs.length>0?true:false
// function orgSelection(selectedOrg) {
//     console.log("Seelected ORG ",selectedOrg)
//     data.getOrg.filter(org => {
//       if (org.id === selectedOrg.id) {
//         setSubOrgs(org.subOrgs);
//       }
//        setOrgId(selectedOrg.id);
//     })
// };

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}

      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Add New Post"
          subtitle="Blog Posts"
          className="text-sm-left"
        />
      </Row>

      <Row>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {/* Editor */}
            <Col xs="12">
              <Paper className={classes.paper}>
                <Row>{myOrgData}</Row>
              </Paper>
              <Divider dark={dividerColor} />
              {/****
              <ContextContainer.Provider value={{ subOrgs, setSubOrgs }}>
              <MediaCard/>
              </ContextContainer>
               */}
            
            </Col>
          </Grid>
          <Grid item xs={6}>
            {/* Sidebar Widgets */}
            <Divider dark={dividerColor} />
            <Col xs="12">
            
            </Col>
          </Grid>
        </Grid>
      </Row>
    </Container>
  );
}
