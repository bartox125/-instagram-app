import formidable from "formidable";
import { existsSync, renameSync, mkdirSync, unlink, unlinkSync, readFile, rename } from "fs";
import {Photo} from "./model.js";
import { rejects } from "assert";
import { resolve } from "path";
import { findPhoto, getExtension } from "./utilis.js";
import { log } from "console";

const fileController = {
  savePhoto: async (req, res, album) => {
    return new Promise((resolve, reject) => {
      try {
        let form = formidable({});
        form.keepExtensions = true;
        form.uploadDir = "./upload/";
        form.parse(req, function (err, fields, files) {
          if (!existsSync("./upload/" + album)) {
            mkdirSync("./upload/" + album, (err) => {
              if (err) throw err
            })
            let name = files.file.path.slice(6, files.file.path.length);
            renameSync("./" + files.file.path,form.uploadDir + album + name,function (err) {
                if (err) throw err;
              });
              let obj = new Photo(Date.now(),album, files.file.name, "upload/"+album+name)
            resolve(obj);
          }
          else {
            let name = files.file.path.slice(6, files.file.path.length);
            renameSync("./" + files.file.path,form.uploadDir + album + name,function (err) {
                if (err) throw err;
            });
            let obj = new Photo(Date.now(),album, files.file.name, "upload/"+ album + name)
            resolve(obj);
          }
        })
      }
      catch {
        resolve("no")
      }
    })
  },
  deletePhoto: async(req, res, obj,id)=>{
    return new Promise((resolve, reject)=>{
      try{
        if(existsSync(obj.url)){
          unlinkSync(obj.url, function (err){
            if (err) throw err;
          })
          resolve({
              "message": `photo with id ${id} deleted`
            })
        }
      }
      catch{
        resolve({"message": `photo with id ${id} not found`})
      }
    })
  },
  getImage: async (id,array)=>{
    return new Promise((resolve,reject)=>{
      const photo=findPhoto(array,id)
      let extension=getExtension(photo)
      try{
        readFile(photo.url, (err,data)=>{
          if(err){
            reject(err)
          }
          else{
            resolve({data:data, extension: extension})
          }
        })
      }catch (err){
        reject(err)
      }
    })
  },
  getFiltredImage: async(url)=>{
    return new Promise((resolve,reject)=>{
      let extension=url.split("/")[2].split(".")[1]
      console.log(extension);
      try{
        readFile(url, (err,data)=>{
          if(err){
            reject(err)
          }
          else{
            resolve({data:data, extension: extension})
          }
        })
      }catch (err){
        reject(err)
      }
    })
  },
  rename: async(old,obj)=>{
    return new Promise((resolve,rejects)=>{
      try{
        console.log(old);
        if(existsSync(old)){
          unlinkSync(old, function (err){
            if (err) throw err;
          })
          try {
            renameSync("upload/"+obj.url+"/"+obj.name+"_copy."+obj.extension, old);
            resolve(true)
          } catch (err) {
            resolve(err)
          }
        }
      }
      catch{
        resolve(false)
      }
    })
  }
};
export default fileController