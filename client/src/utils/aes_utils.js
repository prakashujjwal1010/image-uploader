const bs =32 ;
const ENCRYPTION_KEY = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36];

const aesjs=require("aes-js");
const base64js = require('base64-js');
const ab2str = require('arraybuffer-to-string');


let encrypt = function(raw) {
        //Convert text to bytes
        var textBytes = aesjs.utils.utf8.toBytes(raw);
        var aesCtr = new aesjs.ModeOfOperation.ctr(ENCRYPTION_KEY, new aesjs.Counter(5));
        //Encrypt the message
        var encryptedBytes = aesCtr.encrypt(textBytes);
        var encryptedBytesBase64 =base64js.fromByteArray(encryptedBytes);
        return encryptedBytesBase64;
    }
  let decrypt = function(enc){
        var encryptedBytes=base64js.toByteArray(enc)
        var aesCtr = new aesjs.ModeOfOperation.ctr(ENCRYPTION_KEY,  new aesjs.Counter(5));
        //Get the decrypted bytes
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        //Convert the decrypted bytes to text
        var uint8 = new Uint8Array(decryptedBytes)
        var decryptedText= ab2str(uint8)
        return decryptedBytes;


    }

module.exports={encrypt ,decrypt };
