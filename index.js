import { SecretandHMAC } from "./HMAC.js"
// test
let a= new SecretandHMAC('BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2','1')
console.log(a.getHMAC())

