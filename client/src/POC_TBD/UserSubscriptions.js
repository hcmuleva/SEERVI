import React,{useState} from 'react'
import content from './content'
import Grid from '@material-ui/core/Grid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TransferList from './TransferList'
import { makeStyles } from '@material-ui/core/styles';
import{CREATE_USER} from '../views/mutations/user.js'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 350,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));
export default function UserSubscriptions(props) {
     const [userCreate] = useMutation(CREATE_ORG);
      const classes = useStyles();

    const [subscriptionList, setSubscriptionList] =useState('KG');
    const [subList, setSubList] = useState(content['KG']);
    const getList =(type)=>{
        const myList= content[type]
        console.log("myList",myList)
        return myList
    }
    const mySubscriptioins=(data)=>{
        console.log("DATA recieved from Transfer list ",data)
        
    }
    return (
        <div>
           <h1>REGIsTER</h1>
               <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>


        {  subscriptionList==="KG"?<button className="btn btn-primary" onClick={(e)=>{console.log("KG CLICKED")  ;
            setSubscriptionList('KG')
                console.log()
                getList('KG')
                //props.compSetter("GROUPSELECTION")
                }}>KG</button>:
            <button className="btn btn-secondary" onClick={(e)=>{console.log("KG CLICKED")  ;
            setSubscriptionList('KG')
                console.log()
                getList('KG')
                //props.compSetter("GROUPSELECTION")
                }}>KG</button>
        }

    {subscriptionList==="PRIMARY"?<button className="btn btn-primary" onClick={(e)=>{console.log("PRIMARY CLICKED")  ;
                setSubscriptionList('PRIMARY')
                     getList('PRIMARY')
                
                }}>PRIMARY</button>:<button className="btn btn-secondary" onClick={(e)=>{console.log("PRIMARY CLICKED")  ;
                setSubscriptionList('PRIMARY')
                     getList('PRIMARY')
                //props.compSetter("GROUPSELECTION")
                }}>PRIMARY</button>}
                

      {  subscriptionList==="MIDDLESCHOOL"?<button className="btn btn-primary" onClick={(e)=>{console.log("MIDDLESCHOOL CLICKED")  ;
            setSubscriptionList('MIDDLESCHOOL')
                console.log()
                getList('MIDDLESCHOOL')
                //props.compSetter("GROUPSELECTION")
                }}>MIDDLESCHOOL</button>:
            <button className="btn btn-secondary" onClick={(e)=>{console.log("MIDDLESCHOOL CLICKED")  ;
            setSubscriptionList('MIDDLESCHOOL')
                console.log()
                getList('MIDDLESCHOOL')
                //props.compSetter("GROUPSELECTION")
                }}>MIDDLESCHOOL</button>
        }
        {  subscriptionList==="HIGHSCHOOL"?<button className="btn btn-primary" onClick={(e)=>{console.log("HIGHSCHOOL CLICKED")  ;
            setSubscriptionList('HIGHSCHOOL')
                console.log()
                getList('HIGHSCHOOL')
              
                }}>HIGHSCHOOL</button>:
            <button className="btn btn-secondary" onClick={(e)=>{console.log("HIGHSCHOOL CLICKED")  ;
            setSubscriptionList('HIGHSCHOOL')
                console.log()
                getList('HIGHSCHOOL')
                
                }}>HIGHSCHOOL</button>
        }



                  
            </Grid>
                
             <button className="btn btn-secondary" onClick={(e)=>{console.log("REGISTER CLICKED")  ;
                props.compSetter("GROUPSELECTION")}}>Register</button>

            <TransferList data={getList(subscriptionList) } subs={mySubscriptioins} />
        </div>


    )
}
