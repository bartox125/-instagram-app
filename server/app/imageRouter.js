import path from "path";
import fileController from "./fileController.js";
import { returnTokens } from "./userRouter.js";
import { log } from "console";
import { findPhoto, addHistory, deleteFromArray, getId, getVersion,getArrayOfPhotos, verifyHeader, getToken, getExtension } from "./utilis.js"
import { verifyToken } from "./tokenController.js";
import getRequestData from "./getRequestData.js"
import filtersController from "./filtersController.js";
console.log(fileController);
const { savePhoto, deletePhoto } = fileController;
const __dirname = path.resolve();
let photos = [{
  id: 1712058845673,
  album: "name@email.pl",
  originalName: "input.jpg",
  url: "upload/name@email.pl/input.jpg",
  lastChange: "original",
  history: [
    {
      status: "original",
      timestamp: "1712058845673"
    }
  ],
  tags: [
    {
      name: "#nowytagdlazdjęcia",
    }
  ]
}]
const router = async (req, res) => {
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
    let id = getId(req.url)
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify((findPhoto(photos, id)) ? findPhoto(photos, id) : { message: "not found" }));
  }
  else if (req.url == "/api/photos" && req.method == "GET") {
    let tokens = returnTokens();
    if (verifyHeader(req, tokens)) {
      let email = verifyToken(getToken(req)).email
      let data = getArrayOfPhotos(photos, email)
      if (data.length == 0) {
        data = "nie masz żadnych zdjęć"
      }
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(data));
    }
    else {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify("błąd pobierania zdjęć"));
    }
  }
  else if (req.url == "/api/photos" && req.method == "POST") {
    let tokens = returnTokens();
    if (verifyHeader(req, tokens)) {
      let email = verifyToken(getToken(req)).email
      const file = await savePhoto(req, res, email);
      photos.push(file)
      addHistory(photos, file.id)
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify("zapisano zdjęcie"));
    }
  }
  else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
    let id = getId(req.url)
    const message = await deletePhoto(req, res, findPhoto(photos, id), id)
    deleteFromArray(photos, id)
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(message));
  }
  else if (req.url == "/api/photos/tags" && req.method == "PATCH") {
    let data = await getRequestData(req)
    data = JSON.parse(data)
    const photo = photos.find(photo => photo.id == data.photoId)
    if (!photo) {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify("nie ma takiego zdjęcia"));
    }
    else{
      const updates = data.tags
      photo.tags=updates
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(photos));
    }
  }
  else if(req.url.match(/^\/api\/getimage\/\d+\/filter\/[a-zA-Z]+$/) && req.method == "PATCH"){
    console.log("Zmień zdjęcie");
    let id=req.url.split("/")[3]
    let filter=req.url.split("/")[5]
    let photo=findPhoto(photos,id)
    console.log(photo);
    let obj={
      url: photo.url.split("/")[1],
      name:photo.url.split("/")[2].split(".")[0],
      version: getVersion(photo),
      extension: photo.url.split("/")[2].split(".")[1]
    }
    console.log(obj);
    let respond
    switch (filter) {
      case "flip":
        respond = await filtersController.flip(obj)
        break;
      case "flop":
        respond = await filtersController.flop(obj)
        break;
      case "tint":
        respond = await filtersController.tint(obj)
        break;
      case "gray":
        respond = await filtersController.grayscale(obj)
        break;
      default:
        break;
    }
    if(respond=="wykonano poprawnie"){
      console.log("wykonano poprawnie");
      let data=await fileController.rename(photo.url, obj)
      console.log(data);
      addHistory(photos,id)
    }
    else{
      console.log("error");
    }
}
else if(req.url.match(/^\/api\/getimage\/\d+\/filter\/[a-zA-Z]+$/) && req.method == "GET"){
  let id=req.url.split("/")[3]
  let filter=req.url.split("/")[5]
  let photo=findPhoto(photos,id)
  let obj={
    url: photo.url.split("/")[1],
    name:photo.url.split("/")[2].split(".")[0],
    version: getVersion(photo),
    extension: photo.url.split("/")[2].split(".")[1]
  }
  let respond
  switch (filter) {
    case "flip":
      respond = await filtersController.flip(obj)
      break;
    case "flop":
      respond = await filtersController.flop(obj)
      break;
    case "tint":
      respond = await filtersController.tint(obj)
      break;
    case "gray":
      respond = await filtersController.grayscale(obj)
      break;
    default:
      break;
  }
  if(respond=="wykonano poprawnie"){
    let photo=await fileController.getFiltredImage("upload/"+obj.url+"/"+obj.name+"_copy."+obj.extension)
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.writeHead(200, { 'Content-Type': `image/${photo.extension}` });
    res.end(photo.data);
  }
  else{
    console.log("error");
  }
}
  else if(req.url.match(/\/api\/getimage\/([0-9]+)/) && req.method=="GET"){
    console.log("GET image");
    let id = getId(req.url)
    console.log(id);
    let photo=await fileController.getImage(id, photos)
    console.log(photo);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.writeHead(200, { 'Content-Type': `image/${photo.extension}` });
    res.end(photo.data);
    
  }
};
export default router;