import CryptoJS from 'crypto-js'

export class Crypto {
  secretKey = ''

  constructor(secretKey) {
    this.secretKey = secretKey
  }

  encrypt(data) {
    return CryptoJS?.AES.encrypt(JSON.stringify(data), this.secretKey).toString()
  }

  decrypt(data) {
    try {
      const bytes = CryptoJS?.AES.decrypt(data, this.secretKey)
      return JSON.parse(bytes.toString(CryptoJS?.enc.Utf8))
    } catch (e) {
      console.error('Decrypt error', e)
      return null
    }
  }
}