var mongoose = require('mongoose');   
mongoose.set('useCreateIndex',true);   //为了让index值生效

var UserSchema = new mongoose.Schema({
    username : {type : String, required : true, index : {unique:true}},  //required为ture表示不能为空，unique:true表示是唯一值
    password : {type : String, required : true},
    email : {type : String, required : true, index : {unique:true}},
    date : { type : Date , default : Date.now()},
    isAdmin : { type : Boolean , default : false }
})

var UserModel = mongoose.model('user',UserSchema); //这个user是表名，注意在数据库中很可能变成复数
UserModel.createIndexes();        //为了让index值生效

var save = (data)=>{   //对数据库的操作方法（固定）这些方法也写在models里面。

    var user = new UserModel(data);
    return  user.save()
                .then(()=>{
                    return true
                })
                .catch(()=>{
                    return false
                })
};

var findLogin = (data)=>{
    return UserModel.findOne(data);
}

var findPassword = (email,password)=>{
    return UserModel.update({email},{$set:{password}})
                    .then(()=>{
                        return true
                    })
                    .catch(()=>{
                        return false
                    })
}

module.exports = {        //注意这个对象
    save,
    findLogin,
    findPassword
}