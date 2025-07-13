import sharp from "sharp";
const filtersController = {
    rotate: async () => {
        return new Promise(async (resolve, reject) => {
          try {
            if (server_image_path) {
              let meta = await sharp(server_image_path)
                .rotate(90)
                .toFile("input-rotated.jpg");
              resolve("wykonano poprawnie");
            } else {
              resolve("url_not_found");
            }
          } catch (err) {
            reject(err);
          }
        });
    },
    grayscale: async(obj)=>{
        return new Promise(async (resolve, reject) => {
          console.log(obj);
          let path="upload/"+obj.url+'/'+obj.name+"."+obj.extension
          try {
            if (path) {
              let meta = await sharp(path)
                .grayscale()
                .toFile("upload/"+obj.url+"/"+obj.name+"_copy."+obj.extension);
              resolve("wykonano poprawnie");
            } else {
              resolve("url_not_found");
            }
          } catch (err) {
            reject(err);
          }
        });
    },
    flip: async(obj)=>{
        return new Promise(async (resolve, reject) => {
          console.log(obj);
          let path="upload/"+obj.url+'/'+obj.name+"."+obj.extension
          try {
            if (path) {
              let meta = await sharp(path)
                .flip()
                .toFile("upload/"+obj.url+"/"+obj.name+"_copy."+obj.extension);
              resolve("wykonano poprawnie");
            } else {
              resolve("url_not_found");
            }
          } catch (err) {
            reject(err);
          }
        });
    },
    flop: async(obj)=>{
        return new Promise(async (resolve, reject) => {
          console.log(obj);
          let path="upload/"+obj.url+'/'+obj.name+"."+obj.extension
          try {
            if (path) {
              let meta = await sharp(path)
                .flop()
                .toFile("upload/"+obj.url+"/"+obj.name+"_copy."+obj.extension);
              resolve("wykonano poprawnie");
            } else {
              resolve("url_not_found");
            }
          } catch (err) {
            reject(err);
          }
        });
    },
    tint: async(obj)=>{
         return new Promise(async (resolve, reject) => {
          let path="upload/"+obj.url+'/'+obj.name+"."+obj.extension
           try {
             if (path) {
               let meta = await sharp(path)
                 .tint({ r: 255, g: 0, b: 0 })
                 .toFile("upload/"+obj.url+"/"+obj.name+"_copy."+obj.extension);
               resolve("wykonano poprawnie");
             } else {
               resolve("url_not_found");
             }
           } catch (err) {
             reject(err);
           }
         });
    }
};
export default filtersController