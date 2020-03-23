const aes = require("aes-js");
const argon2 = require("argon2");
const crypto = require("crypto");
const cryptoJS = require("crypto-js");

class aesCrypto {

    // Encrypt using AES-256-CTR-Argon2-HMAC-SHA-256
    static async aes256ctrEncrypt(plaintext, password) {
        let argon2salt = crypto.randomBytes(16); // 128-bit salt for argon2
        let argon2Settings = {
            type: argon2.argon2di, raw: true,
            timeCost: 8, memoryCost: 2 ** 15, parallelism: 2,
            hashLength: 32, salt: argon2salt
        };
        let secretKey = await argon2.hash(password, argon2Settings);
        //console.log("Derived Argon2 encryption key:", secretKey.toString('hex'));

        let plainTextBytes = aes.utils.utf8.toBytes(plaintext);
        let aesIV = crypto.randomBytes(16); // 128-bit initial vector (salt)
        let aesCTR = new aes.ModeOfOperation.ctr(secretKey, new aes.Counter(aesIV));
        let ciphertextBytes = aesCTR.encrypt(plainTextBytes);
        let ciphertextHex = aes.utils.hex.fromBytes(ciphertextBytes);
        let hmac = cryptoJS.HmacSHA256(plaintext, secretKey.toString('hex'));

        return {
            kdf: 'argon2', kdfSettings: { salt: argon2salt.toString('hex') },
            cipher: 'aes-256-ctr', cipherSettings: { iv: aesIV.toString('hex') },
            ciphertext: ciphertextHex, mac: hmac.toString()
        }
    }

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

module.exports = aesCrypto;