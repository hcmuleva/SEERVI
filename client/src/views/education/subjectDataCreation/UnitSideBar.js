import React,{useState} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  FormInput
} from "shards-react";
import MUIDataTable from "mui-datatables"; 
const UnitSidebar = (props) => {
  const [selectedRowData,setSelectedRowData] =useState(null);
  const [rowSel,setRowSel]=useState({})
   const columns = [ {name:"id",options: {display: false,}},"name"];
  const options={
    print: false,
    download:false,
    selectableRows: 'single',
    rowsSelected:rowSel.rowsSelected,
     onRowsSelect: (rowsSelected, allRows) => {
        props.contentFor({"type":"UNIT","dataVal":props.dataList[allRows[0].index]})
      },

    onRowsDelete: (rowsDeleted) => {
     
  },
  }     

  return (  
 <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{props.title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush>
        <MUIDataTable
data={props.dataList}
  columns={columns}
  options={options}/>
  
        <ListGroupItem className="d-flex px-3">
          <InputGroup className="ml-auto">
            <FormInput placeholder="New category" />
            <InputGroupAddon type="append">
              <Button theme="white" className="px-2">
                <i className="material-icons">add</i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);

}
 
UnitSidebar.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UnitSidebar.defaultProps = {
  title: "Categories"
};

export default UnitSidebar;
