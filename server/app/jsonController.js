const makeArray=(array)=>{
    let newArray=[]
    for(let i=0;i<array.length;i++){
        let obj = {
          id: i,
          name: array[i],
          popularity: Math.floor(Math.random() * 100),
        };
        newArray.push(obj)
    }
    return newArray
}
const makeObject=(array,object)=>{
    let recived = JSON.parse(object);
    let id=array.length
    let obj={
        id:id,
        name: recived.name,
        popularity: (recived.popularity)? recived.popularity:Math.floor(Math.random() * 100)
    }
    return obj
}

class User{
    constructor(id,name,lastName,email,confirmed,password){
        this.id=Date.now()
    }
}
export {makeArray, makeObject}
