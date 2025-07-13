// const createUser=(data)=>{
//     const user  
// }

// export {createUser};
import { decryptPass } from "./utilis.js"
const logIn= async (user, array)=>{
    user=JSON.parse(user)
    for(let i=0; i<array.length;i++){
        if(user.email==array[i].email){
            let passMatch = await decryptPass(user.password, array[i].password)
            if(passMatch){
                return true
            }
        }
    }
    return false
}
export {logIn}
