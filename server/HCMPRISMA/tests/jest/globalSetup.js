require('@babel/register')
require('@babel/polyfill/noConflict')
const server = require('../../src/server').default

module.exports = async () => {
    console.log("TEST Server starting")
    global.httpServer = await server.start({ port: 5000 })

}