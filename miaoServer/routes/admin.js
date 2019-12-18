var express = require('express');
var adminController = require('../controllers/admin.js');
var router = express.Router();

router.use((req,res,next)=>{      //路由拦截

    if(req.session.isAdmin && req.session.username){
        next()
    }else{
        res.send({
            msg : '没有管理员权限',
            status : -1
        })
    }

})

// /* GET users listing. */    他是基于/api2/admin这个路径的 注意
router.get('/', adminController.index);


module.exports = router;
