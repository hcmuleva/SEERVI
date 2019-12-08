const fs = require("fs");

async function getPhoto(parent, args, { prisma, request }, info) {
    if(args.url){
        fs.readFile(args.url, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                console.log("\n File Data", data, " \nEnd \n")
                return data
            } else {
                console.log(err);
                return err;
            }
        });
    }
    

}
export default getPhoto