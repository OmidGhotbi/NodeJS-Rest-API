const user = (username,fulname)=>{
    this.username = username;
    this.fulname= fulname;
    this.address=()=>{console.log(username + ' '+fulname)}
    return address
}

let use = new user ('asd','asdabi')

console.log(use)
