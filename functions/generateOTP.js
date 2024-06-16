
const { customOtpGen } = require('otp-gen-agent');
const otp = async ()=>{ return await customOtpGen({length: 6, chars: '123456789'})}
  
module.exports = otp;