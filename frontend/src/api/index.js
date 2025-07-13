import  axios  from 'axios';
const get = async (url, object) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const headers={
          'authorization': `Bearer ${object.token}`
        }
        const response = await axios.get(url, {headers:headers});
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const post = async (url, fd) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const headers={
          "Content-Type": "multipart/form-data",
          'authorization': `Bearer ${fd.token}`
        }
        const response = await axios.post(url, fd.fd, {
          headers: headers
        });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};
const postUser = async (url, fd) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(url, fd, {
          headers: {
            "Content-Type": "aplication/json",
          },
        });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};
const patch = async (url, fd) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.patch(url, fd, {
          headers: {
            "Content-Type": "aplication/json",
          },
        });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
}

const getOne = async (url) => {
  console.log("url",url);
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(url);
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const getPhotos = (object) => get("http://localhost:3000/api/photos", object);
const postFile = (object) => post("http://localhost:3000/api/photos", object);
const postLogIn = (object) =>  postUser("http://localhost:3000/api/user/login", object)
const postRegister = (object) => postUser("http://localhost:3000/api/user/register", object)
const patchTags=(object)=>patch("http://localhost:3000/api/photos/tags", object)
const getOnePhoto=(id)=> getOne("http://localhost:3000/api/photos/"+id)
export { getPhotos, postFile, postLogIn, postRegister, patchTags, getOnePhoto };
