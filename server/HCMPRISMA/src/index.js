import "@babel/polyfill/noConflict";
import server from "./server";

server.start(() => {
  console.log("HCM Back End server is up!");
});
