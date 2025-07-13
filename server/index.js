import { createServer } from "http";
import imageRouter from "./app/imageRouter.js";
import tagsRouter from "./app/tagsRouter.js";
import filtersRouter from "./app/filtersRouter.js"
import {usersRouter} from "./app/userRouter.js"
import path from "path";
const __dirname = path.resolve();
const mypath=path.join(__dirname, "upload")
const PORT=3000;


createServer(async (req, res) => {    
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Expires', '-1');
  res.setHeader('Pragma', 'no-cache');

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
    if (req.url.search("/api/photos") != -1) {
      await imageRouter(req, res);
    } else if (req.url.search("/api/tags") != -1) {
      await tagsRouter(req, res);
    } else if (req.url.search("/api/filters") != -1) {
      await filtersRouter(req, res);
    } else if (req.url.search("/api/getimage") != -1) {
      await imageRouter(req, res);
    } else if (req.url.search("/api/user") != -1) {
      await usersRouter(req, res);
  }
})
  .listen(PORT, () => console.log("listen on 3000"));
