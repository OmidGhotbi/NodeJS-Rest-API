const crypto = require('crypto')
//Here "aes-256-cbc" is the advance encryption standard we are using for encryption.
//Text is the Confidential data which we need to encrypt using 'password'(Key).
const algorithm = 'aes-256-ctr';
const  password = 'RJ23edrf';
exports.encrypt= (text)=>{
    let cipher = crypto.createCipher(algorithm,password)
    let crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
//crypto.createCipheriv
//Here "aes-256-cbc" is the advance encyption standard we used for encrytion.
//Text is the Cipher which we need to decrypt using 'password'(Key).
exports.decrypt=(text)=>{
    let decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(text,'hex','utf8')
   dec += decipher.final('utf8');
   return dec;
}

/*//Actual content
let text = "Nodejsera for all web development languages";
//Calling the encrypt function and printing the encrypted content				
let e = encrypt(text);
console.log(e);
//calling the decrypt function and printing the decrypted content
let d = decrypt(e);
console.log(d);	*/