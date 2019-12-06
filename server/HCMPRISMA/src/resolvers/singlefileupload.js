async function singleUpload(parent, args, { prisma, request }, info) {     
        console.log("updload",args)
        const { createReadStream, filename, mimetype } = await args.file;
        const stream = createReadStream()
        //const id = shortid.generate()
        const id=`${shortid.generate()}-${filename}`
        console.log("process.env.UPLOAD_DIR",process.env.UPLOAD_DIR)
        let fileAbsUrl=path.join(process.env.UPLOAD_DIR, id)
       
        await new Promise((resolve, reject) => {
            stream
            .on('error', error => {
                unlink(path, () => {
                reject(error)
                })
            })
            .pipe(createWriteStream(fileAbsUrl))
            .on('error', reject)
            .on('finish', resolve)
        }).then((result)=>{
            console.log(result)
            return { id, filename, mimetype,path }})
        
        console.log("MyReturnObject",{ id:fileAbsUrl, filename, mimetype })
        return { id:fileAbsUrl, filename, mimetype  }
   }
 
export default singleUpload
    
