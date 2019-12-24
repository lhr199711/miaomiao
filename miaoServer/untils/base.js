const crypto = require('crypto');
const captcha = require('trek-captcha');

var toPassword = (preload)=>{
    return crypto.createHmac('sha256', 'lhriscool')
                .update(preload)
                .digest('hex');
}

var getVerifyImg = ()=>{
        return captcha()
}



module.exports = {
    toPassword,getVerifyImg
}