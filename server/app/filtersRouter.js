import path from "path";
const __dirname = path.resolve();
const router = async (req, res) => {
    if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && req.method == "GET") {
        console.log(req.url, '  ', req.method);
        let id = req.url.split("/");
        id = id[id.length - 1];
        console.log(id);
    // } else if (req.url.match(/\/api\/getimage\/([0-9]+)/) && req.method == "GET") {
    //     console.log(req.url, "  ", req.method);
    //     console.log("długość",req.url.length);
    //     let id
    //     let filter
    //     if(req.url.length>27){
    //         console.log("przerobione");
    //         let url=req.url.split("/")
    //         id=url[url.length-3]
    //         filter=url[url.length-1]
    //         console.log(filter);
    //     }
    //     else{
    //         console.log("zwykłe");
    //         id = req.url.split("/");
    //         id = id[id.length - 1];
    //     }
    //     console.log(id);
    }
    else if(req.url.match(/^\/api\/getimage\/\d+\/filter\/[a-zA-Z]+$/) && req.method == "GET"){
        let id=req.url.split("/")[2]
        let filter=req.url.split("/")[4]
        console.log(id, filter);
    }
    // else if (req.url.match(/\/api\/getimage\/([0-9]+)/) && req.method == "GET") {
    //     console.log(req.url, "  ", req.method);
    //     let id = req.url.split("/");
    //     id = id[id.length - 1];
    //     console.log(id);
    //} 
    else if (req.url = "/api/filters" && req.method == "PATCH") {
        console.log(req.url, "  ", req.method);
    }
};
export default router;
