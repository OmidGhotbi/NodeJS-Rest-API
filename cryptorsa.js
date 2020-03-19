const nodersa = require('node-rsa')


const keyData = '-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----';

const key = new nodersa({b: 2048},{e:65537}) //public and privet key
//console.log(key)
let secret = "hi today i learned make a tunelling safe";



let public_key = key.exportKey("pkcs8-public-pem")
console.log(public_key)//get public key


let privet_key = key.exportKey("pkcs8-private-pem")
console.log(privet_key)//get private key
console.log('///////////////////////////////////')



let key_private = new nodersa(privet_key)
let key_public = new nodersa(public_key)


//public key for encryption
let encript= key_public.encrypt(secret,'base64')
console.log(encript)


//private key for decrypttion
let decrypted= key_private.decrypt(encript,'utf8')
console.log(decrypted)
