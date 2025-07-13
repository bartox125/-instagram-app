import {tags} from "./model.js"
import { makeArray, makeObject } from "./jsonController.js";
import getRequestData from "./getRequestData.js";
import { isInArray } from "./tagsController.js";
import {getId} from "./utilis.js"
let tagsArray
const router = async (req, res) => {
  if (req.url == "/api/tags/raw" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(tags));
  } 
  else if (req.url == "/api/tags" && req.method == "GET") {
      if(!tagsArray){
          tagsArray = makeArray(tags);
      }
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(tagsArray));
  } 
  else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
      let data
      let id=getId(req.url)
      if(tagsArray){
          data=tagsArray[id]
      }
      else{
          tagsArray = makeArray(tags)
          data=tagsArray[id]
      }
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(data));
  } 
  else if (req.url == "/api/tags" && req.method == "POST") {
      let data = await getRequestData(req);
      let toSend = {message: "taki tag już istnieje"}
      if(tagsArray){
        if(isInArray(tagsArray,data)!=false){
          toSend = makeObject(tagsArray, data);
          tagsArray.push(toSend)
        }
      }
      else{
        tagsArray=makeArray(tags)
        if(isInArray(tagsArray,data)!=false){
          toSend = makeObject(tagsArray, data);
          tagsArray.push(toSend)
        }
      }
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(toSend));
  } 
  else if (req.url == "/api/photos/tags" && req.method == "PATCH") {
    let x = await getRequestData(req)
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(x));
  } 
  else if (req.url == "/api/photos/tags/mass" && req.method == "PATCH") {

  } 
  else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && method == "GET") {

  }
};
export default router;
