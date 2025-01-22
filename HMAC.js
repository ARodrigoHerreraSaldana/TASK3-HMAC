import { createHmac,randomBytes,randomInt } from "crypto";

export class SecretandHMAC{
    constructor(min,max){
        this.randomNumber=randomInt(min,max).toString()
        this.secret=randomBytes(32).toString('hex')
        this.HMAC=createHmac('sha3-256', this.secret).update(this.randomNumber).digest('hex')
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

// test
// let a= new SecretandHMAC('1')
// console.log(a.getHMAC())
// console.log(a.getSecret())