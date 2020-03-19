const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const secretKey = 'secretKey'
const text = 'سلام بر روح پرفتوح عضما'


const generatekeypare = (secretKey)=>{
  let genNewPubPrivKeys =crypto.generateKeyPair;
  genNewPubPrivKeys('rsa',{
    modulusLength:2048,
    publicKeyEncoding:{type:'spki',format:'pem'},
    privateKeyEncoding:{type:'pkcs8',format:'pem',cipher:'aes-256-cbc',passphrase:"secretKey"},
  },(err,publicKey,privateKey)=>{
    console.log(publicKey)
    console.log(privateKey)
    fs.writeFileSync('peivate.pem',privateKey)
    fs.writeFileSync('public.pem',publicKey)
    
  })

}

//generatekeypare(secretKey)

const encriptByPublic =(toEncrypt,addreesPublicKeyFile)=>{
 
  const publicKey =fs.readFileSync(path.join(__dirname,addreesPublicKeyFile),'utf8')
  const buffer = Buffer.from(toEncrypt)
  const encrypted = crypto.publicEncrypt(publicKey,buffer);
  return encrypted.toString('base64')
};

const enc =  encriptByPublic(text,`public.pem`)
// console.log(x)

const decryptByPrivate = (toDencrypt,addressPrivateKeyFile)=>{

  const privateKey = fs.readFileSync(path.join(__dirname,addressPrivateKeyFile),'utf8')
  const buffer = Buffer.from(toDencrypt,'base64')
  const decrypted = crypto.privateDecrypt({
    key: privateKey.toString(),
    passphrase:secretKey},
    buffer)
 return decrypted.toString('utf8')
}

const y =  decryptByPrivate(enc,`peivate.pem`)
console.log(y)



















// var crypto = require("crypto");
// var path = require("path");
// var fs = require("fs");
// const passphrase = "mySecret"

// var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
//     var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
//     var publicKey = fs.readFileSync(absolutePath, "utf8");
//     var buffer = new Buffer(toEncrypt);
//     var encrypted = crypto.publicEncrypt(publicKey, buffer);
//     return encrypted.toString("base64");
// };

// var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
//     var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
//     var privateKey = fs.readFileSync(absolutePath, "utf8");
//     var buffer = new Buffer(toDecrypt, "base64");
//     //var decrypted = crypto.privateDecrypt(privateKey, buffer);
//     const decrypted = crypto.privateDecrypt(
//         {
//             key: privateKey.toString(),
//             passphrase: passphrase,
//         },
//         buffer,
//     )
//     return decrypted.toString("utf8");
// };

// const { writeFileSync } = require('fs')
// const { generateKeyPairSync } = require('crypto')

// function generateKeys() {
//     const { publicKey, privateKey } = generateKeyPairSync('rsa', 
//     {
//             modulusLength: 4096,
//             namedCurve: 'secp256k1', 
//             publicKeyEncoding: {
//                 type: 'spki',
//                 format: 'pem'     
//             },     
//             privateKeyEncoding: {
//                 type: 'pkcs8',
//                 format: 'pem',
//                 cipher: 'aes-256-cbc',
//                 passphrase: passphrase
//             } 
//     });

//     writeFileSync('private.pem', privateKey)
//     writeFileSync('public.pem', publicKey)
// }

// generateKeys();

// let a = encryptStringWithRsaPublicKey("hello", "public.pem")
// let b = decryptStringWithRsaPrivateKey(a, "private.pem");
// console.log(b)