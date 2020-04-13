import S3 from 'aws-sdk/clients/s3';
import {aws} from './keys'
const fetch = require('node-fetch');
const downloadFile=(bucket,key )=>{

    fetch('https://zbimages.s3-ap-southeast-1.amazonaws.com/12th/profile/igP1qxQeTgge1myJ38gdPa.html')
       .then(res => res.text())
    .then(body => console.log("Finally able to read usiing fetch",body));
    
}
export default  downloadFile