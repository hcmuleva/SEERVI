import React, {useState} from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import {GET_SUBGROUPS} from '../queries/getAllOrgs'
import { useQuery ,useMutation} from '@apollo/react-hooks';


export default function SubGroupList(props) {
    const style ={
    display: 'flex',
    justifyContent: 'center'
}


    const mysubGroups =props.subgroups;
    
    console.log("mysubGroups",mysubGroups)
    return (
        <div>
                           <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>SubGroupName</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody> 
                           {mysubGroups? mysubGroups.map((row)=>{
                               return (
                                <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right" onClick={() => {console.log("Edit Row", row.id)}}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => {console.log("Delete Row",row.id)}}><DeleteIcon /></TableCell>
                                </TableRow>

                               )
                           }) : <tr><td></td></tr>}
                        
                        </TableBody>
                    </Table>
        </div>
    )
}
