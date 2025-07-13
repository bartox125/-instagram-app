let tags=[
    "#love",
    "#instagood",
    "#fashion",
    "#instagram",
    "#photooftheday",
    "#art",
    "#photography",
    "#beautiful",
    "#nature",
    "#picoftheday",
    "#travel",
    "#happy",
    "#cute",
    "#instadaily",
    "#style",
    "#tbt",
    "#repost",
    "#followme",
    "#summer",
    "#reels",
    "#like4like",
    "#beauty",
    "#fitness",
    "#food",
]
let usersTab = [
  {
    id: 1717137414554,
    name: "admin",
    lastName: "lastName",
    email: "name@email.pl",
    confirmed: true,
    password: "$2a$10$Ci2k3q8rm1./Ly50v.7xQuh8mo70WfTErQYozDxGmKA6c4dk.38QK",
  },
];
class Photo {
  constructor(id, album, originalName, url) {
    this.id = id;
    this.album = album;
    this.originalName = originalName;
    this.url = url;
    this.lastChange = "original";
    this.history = [];
    this.tags = [];
  }
}
class User{
    constructor(name,lastName,email,password){
        this.id = Date.now();
        this.name=name;
        this.lastName=lastName;
        this.email=email;
        this.confirmed=false;
        this.password=password
    }
}
export {tags, usersTab, Photo, User}