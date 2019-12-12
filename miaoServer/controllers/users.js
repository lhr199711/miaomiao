var {Email} = require('../untils/config.js');
var login = async (req,res,next)=>{

}

var register = async (req,res,next)=>{

}

var verify = async (req,res,next)=>{
    
    var email = req.query.email;
    var verify = Email.verify;

    Email.transporter.sendMail({
        from: '"来自一位刘姓帅哥👻👻👻" <1066521901@qq.com>', // sender address
        to: email, // list of receivers
        subject: "网站验证码", // Subject line
        text: "验证码为:" + verify + "\n请拿小本本记下来，不要给别人看哦！"// plain text body
    },(err)=>{
        
        if(err){
            res.send({
                msg : '验证码发送失败',
                status : -1
            })
        }else{
            res.send({
                msg : '验证码发送成功',
                status : 0
            })
        }

    });

}

var logout = async (req,res,next)=>{

}

var getUser = async (req,res,next)=>{

}

var findPassword = async (req,res,next)=>{

}

module.exports = {
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword
}