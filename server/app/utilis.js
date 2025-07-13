import bcryptjs from "bcryptjs";
const { hash, compare } = bcryptjs;

const findPhoto = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      return array[i];
    }
  }
};

const addHistory = (array, id) => {
  let index = array.indexOf(findPhoto(array, id));
  let version = array[index].history.length;
  if (version > 0) { 
    array[index].lastChange = "zmienione " + version;
  }
  let obj = {
    status: version == 0 ? "original" : "zmienione " + version,
    timestamp: Date.now(),
  };
  return array[index].history.push(obj);
};

const deleteFromArray = (array, id) => {
  let index = array.indexOf(findPhoto(array, id));
  return array.splice(index, 1);
};

const getId = (url) => {
  let id = url.split("/");
  return id[id.length - 1];
};

const isRequired = (data) => {
  if (!data.name) {
    return "brakuje imienia";
  }
  if (!data.lastName) {
    return "brakuje nazwiska";
  }
  if (!data.email) {
    return "brakuje emaila";
  }
  if (!data.password) {
    return "brakuje hasła";
  }
  return true;
};
const isUser=(array,user)=>{
  for(let i=0;i<array.length;i++){
    if(array[i].email==user.email){
      return false
    }
  }
  return true
}
const encryptPass = async (password) => {
  let encryptedPassword = await hash(password, 10);
  return encryptedPassword;
};


const decryptPass= async (userPass, encrypted)=>{
  return new Promise(async (resolve, reject)=>{
    try{
      let decrypted = await compare(userPass, encrypted);
      resolve(decrypted)
    }
    catch (err){
      reject(err)
    }
  })
}

const createMessage=(token)=>{
  return `http://localhost:3000/api/user/confirm/${token}`;
}
const confirmUser=(array, user)=>{
  for(let i=0;i<array.length;i++){
    if(user.email==array[i].email){
      array[i].confirmed=true
      return array
    }
  }
  return "Nie można zweryfikować konta"
}
const verifyHeader=(req, tokens)=>{
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    let token = req.headers.authorization.split(" ")[1];
    if(tokens.includes(token)){
      return true
    }
  }
}
const getToken=(req)=>{
  return req.headers.authorization.split(" ")[1];
}
const getArrayOfPhotos=(array, album)=>{
  let photos=[]
  for(let i=0;i<array.length; i++){
    if(array[i].album==album){
      photos.push(array[i])
    }
  }
  return photos
}
const getExtension=(photo)=>{
  return photo.originalName.split("/")[1]
}
const getVersion=(photo)=>{
  return photo.history.length
}
export {
  findPhoto,
  addHistory,
  deleteFromArray,
  getId,
  isRequired,
  encryptPass,
  decryptPass,
  createMessage,
  confirmUser,
  verifyHeader,
  isUser,
  getToken,
  getArrayOfPhotos,
  getExtension,
  getVersion,
};
