import { createHmac } from "crypto";

export class SecretandHMAC{
    constructor(secret,message){
        this.secret=secret
        this.HMAC=createHmac('sha3-256', secret).update(message).digest('hex')
    }
    getHMAC()
    {
        return this.HMAC;
    }
    getSecret()
    {
        return this.secret
    }

}
