import RestClient from 'react-native-rest-client';
var CryptoJS = require('crypto-js');


export default class WalletRestApi extends RestClient {
  constructor(authToken) {
    super('http://localhost:8080', {
      headers: {
        'x-access-token': authToken,
      },
    }); //real source will be wallet.cryptokernel.org
  }

  login(name, password) {
    return this.POST('/api/authenticate', {"name": name, "password": CryptoJS.SHA3(password).toString()});
  }

  register(username, password) {
    return this.POST('/api/users', {"name": username, "password": CryptoJS.SHA3(password).toString()});
  }

  generateKey(user_id, keypair) {
    return this.POST('/api/users/' + user_id + '/keys', keypair);
  }

  getKeys(user_id) {
    return this.GET('/api/users/' + user_id + '/keys');
  }

  updateKeys(user_id, res) {
    return this.POST('/api/users/' + user_id + '/keys', res);
  }

  getTxos(publicKey) {
    return this.POST('/api/blockchain/txos', {"pubkey": publicKey});
  }

  getTransaction(id) {
    return this.POST('/api/blockchain/util/gettransaction', {"id": id});
  }

  postOutputs(outputs) {
    return this.POST('/api/blockchain/util/getoutputsetid', {"outputs": outputs});
  }

  sendRawTransaction(tx) {
    return this.POST('/api/blockchain/util/sendrawtransaction', {'tx': tx});
  }

  deleteKey(user_id, key_id) {
    return this.DELETE('/api/users/' + user_id + '/keys/' + key_id);
  }

}
