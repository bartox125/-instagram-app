import getRequestData from "./getRequestData.js";
import { isRequired, encryptPass, createMessage, confirmUser, isUser } from "./utilis.js";
import { User, usersTab} from "./model.js";
import { createToken, verifyToken } from "./tokenController.js";
import {logIn} from "./userController.js"
let users = usersTab;
let tokens=[]
const usersRouter = async (req,res)=>{
    if(req.url=="/api/user/register" && req.method=="POST"){
        let data=await getRequestData(req)
        data=JSON.parse(data)
        if(isRequired(data)==true && isUser(users,data)==true){
            data.password = await encryptPass(data.password);
            let user=new User(data.name, data.lastName, data.email, data.password)
            let token=createToken(user)
            users.push(user)
            res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
            res.end(JSON.stringify(createMessage(token)));
        }
        else{
            res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
            res.end(JSON.stringify("nie można utworzyć konta użytkownika"));
        }
    }
    else if (req.url.match(/\/api\/user\/confirm\/eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*/g) && req.method == "GET") {
      let token=req.url.split("/")[4]
      let data=verifyToken(token)
      if(data.message){
         res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
         res.end(JSON.stringify(data.message));
      }
      else if(typeof(confirmUser(users,data))=="string"){
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(confirmUser(users,data)));
      }
      else{
        users = confirmUser(users,data);
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify("Potwierdzono"));
      }
    }
    else if (req.url == "/api/user/login" && req.method == "POST") {
      let data = await getRequestData(req);
      if(await logIn(data, users)){
        let x=createToken(JSON.parse(data))
        tokens.push(x)
        res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8",});
        res.end(JSON.stringify(x));
      }
      else{
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify("Nieprawidłowe dane"));
      }
    }
}
const returnTokens=()=>{
  return tokens
}
export {usersRouter, returnTokens};
