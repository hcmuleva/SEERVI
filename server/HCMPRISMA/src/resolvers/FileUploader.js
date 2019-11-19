import shortid from 'shortid'
import { createReadStream, createWriteStream } from 'fs';
const storeUpload=async ({stream,fileName})=>{
    const id=shortid.generate();
    const path=`images/${id}-${fileName}`
    return new Promise((resolve,reject)=>
        stream
        .pipe(createWriteStream(path))
        .on('finish',()=>resolve({id,path}))
        .on('error',reject)
    );
}

 export async function ProcessUpload(upload){
    const {stream, fileName,mimetype,encoding}=await upload
    const {path}=await storeUpload({stream,fileName})
    return path
}
 
 