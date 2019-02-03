var CryptoJS = require('crypto-js');
var elliptic = require('elliptic');
var base64js = require('base64-js');
var ec = new elliptic.ec('secp256k1');

export const genKey =  function(label, publicKey) {
        var keypair = genKeyPair();

        var pbkdf = CryptoJS.algo.PBKDF2.create({ keySize: 8,
                                                  iterations: 1000,
                                                  hasher:
                                                  CryptoJS.algo.SHA256
                                                });

        var salt = CryptoJS.lib.WordArray.random(32);
        var encKey = pbkdf.compute(publicKey, salt);

        var iv = CryptoJS.lib.WordArray.random(16);

        var cipherText = CryptoJS.AES.encrypt(CryptoJS.enc.Base64.parse(keypair.priv),
                                              encKey,
                                              { iv: iv });

        var keyData = {
            label: label,
            publicKey: keypair.pub,
            cipherText: CryptoJS.enc.Base64
                                .stringify(cipherText.ciphertext),
            iv: CryptoJS.enc.Base64.stringify(iv),
            salt: CryptoJS.enc.Base64.stringify(salt)
        };

        return Promise.resolve(keyData);
}


const genKeyPair = function() {
    var randString = CryptoJS.lib.WordArray.random(32).toString();

    var key = ec.genKeyPair({ entropy: randString });

    // Pubkey in form z||x||y where z is 0x04
    var pubPoint = key.getPublic().encode();

    var base64PubPoint = base64js.fromByteArray(pubPoint);

    var privateKey = key.getPrivate().toArray();
    var base64PrivateKey = base64js.fromByteArray(privateKey);

    var keypair = {
        pub: base64PubPoint,
        priv: base64PrivateKey
    };

    return keypair;
};

export const getNewKey = function(id, label, password, api) {
    //console.log(id, label, password, api);
    return genKey(label, password).then(function(res) {
      console.log(res);
      return api.updateKeys(id, res).then(
                function(htres) {
                    return res;
              });
    });
};
