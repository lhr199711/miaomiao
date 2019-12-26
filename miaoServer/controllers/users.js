var {Email,Head} = require('../untils/config.js');
var UserModel = require('../models/users.js');
const fs = require('fs');
var {toPassword,getVerifyImg} = require('../untils/base.js');

var login = async (req,res,next)=>{

    var {username,password,verify} = req.body;

    if(verify != req.session.imgToken){
        res.send({
            msg : '验证码错误',
            status : -1
        })
        return;
    }

    var result = await UserModel.findLogin({username,password:toPassword(password)});
    if(result){     //这个result返回的是整个用户信息对象
        req.session.username = username;
        req.session.isAdmin = result.isAdmin;
        if(result.isFreeze){
            res.send({
                msg : '帐号被冻结',
                status : -1
            })
        }else{
            res.send({
                msg : '登录成功',
                isAdmin : result.isAdmin,
                headPic : result.headPicUrl,
                status : 0
            })
        }
        
    }else{
        res.send({
            msg : '密码错误或帐号不存在',
            status: -3
        })
    }
}

var register = async (req,res,next)=>{

    var {username,password,email,verify} = req.body;

    if(email != req.session.email || verify !=req.session.verify){
        res.send({
            msg : '验证码错误',
            status : -1
        })
        return;
    }

    if((Email.time-req.session.verifyTime)/1000 >60){
        res.send({
            msg : '验证码已过期',
            status : -1
        })
        return;
    }

    var result = await UserModel.save({
        username,
        password : toPassword(password),
        email
    })

    if(result){
        res.send({
            msg : '注册成功',
            status : 0
        })
    }else{
        res.send({
            msg : '注册失败',
            status : -2
        })
    }

}

var verify = async (req,res,next)=>{
    
    var email = req.query.email;
    var verify = Email.verify;

    req.session.verify = verify;
    req.session.email = email;
    req.session.verifyTime = Email.time;

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

    req.session.username = '';
    res.send({
        msg : '退出成功',
        status : 0
    })

}

var getUser = async (req,res,next)=>{

    if(req.session.username){
        res.send({
            msg : '获取用户信息成功',
            status : 0,
            data : {
                username : req.session.username
            }
        })
    }else{
        res.send({
            msg : '获取用户信息失败',
            status : -1
        })
    }

}

var findPassword = async (req,res,next)=>{

    var {email,password,verify} = req.body;
    if(email == req.session.email && verify == req.session.verify){
        
        if((Email.time-req.session.verifyTime)/1000 >60){
            res.send({
                msg : '验证码已过期',
                status : -1
            })
            return;
        }

        var result = await UserModel.findPassword(email,toPassword(password));
        if(result){
            if(req.session.username){
                req.session.username = '';
                res.send({
                    msg : '修改密码成功',
                    status : 0,
                    online : true
                })
            }else{
                res.send({
                    msg : '修改密码成功',
                    status : 0,
                    online : false
                })
            }
        }else{
            res.send({
                msg : '修改密码失败',
                status : -1
            })
        }

    }else{
        res.send({
            msg : '验证码错误',
            status : -1
        })
    }

}

var verifyImg = async (req,res,next)=>{

    var result = await getVerifyImg();   //result是一个对象内同buffer和token字段
    if(result){
        req.session.imgToken = result.token;
        res.send(result.buffer);
    }
    
}

var updateUserHead = async (req,res,next)=>{
    // console.log(req.file);
    // // console.log(req.file);
    await fs.rename('public/uploads/'+ req.file.filename ,'public/uploads/' + req.session.username + '.jpg' , (err)=>{
        if(err){
            res.send(err);
            return ;
        }
    })
    
    var result = await UserModel.updateHeadPic(req.session.username,Head.baseUrl + req.session.username + '.jpg');
    
    if(result){
        res.send({
            msg : '头像修改成功',
            imgUrl: Head.baseUrl + req.session.username + '.jpg',
            status : 0
        })
    }else{
        res.send({
            msg : '头像修改失败',
            status : -1
        })
    }


}

module.exports = {
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword,
    verifyImg,
    updateUserHead
}