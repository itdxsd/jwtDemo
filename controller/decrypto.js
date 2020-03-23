const aes = require("aes-js");
const argon2 = require("argon2");
const crypto = require("crypto");
const cryptoJS = require("crypto-js");

class aesDecrypto {

    // Decrypt using AES-256-CTR-Argon2-HMAC-SHA-256
    static async aes256ctrDecrypt(encryptedMsg, password) {
        let saltBytes = Buffer.from(encryptedMsg.kdfSettings.salt, 'hex');
        let argon2Settings = {
            type: argon2.argon2di, raw: true,
            timeCost: 8, memoryCost: 2 ** 15, parallelism: 2,
            hashLength: 32, salt: saltBytes
        };
        let secretKey = await argon2.hash(password, argon2Settings);
        console.log("Derived Argon2 decryption key:", secretKey.toString('hex'));

        let aesCTR = new aes.ModeOfOperation.ctr(secretKey,
            new aes.Counter(Buffer.from(encryptedMsg.cipherSettings.iv, 'hex')));
        let decryptedBytes = aesCTR.decrypt(
            Buffer.from(encryptedMsg.ciphertext, 'hex'));
        let decryptedPlaintext = aes.utils.utf8.fromBytes(decryptedBytes);

        let hmac = cryptoJS.HmacSHA256(decryptedPlaintext, secretKey.toString('hex'));
        //if (hmac = encryptedMsg.mac) throw new Error('MAC does not match: maybe wrong password');

        return decryptedPlaintext;
    }

}

module.exports = aesDecrypto;