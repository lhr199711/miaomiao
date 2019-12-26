<template>
    <div class="center-wrapper">
        <h4>我的</h4>
        <div class="headPortrait">
            <div :style="(`background-image:url(${$store.state.nowUser.headPic})`)"></div>
            <p>{{$store.state.nowUser.isAdmin?"管理员":"普通用户"}}:{{$store.state.nowUser.username}}</p>
        </div>
        <h4>我的操作</h4>
        <div class="operation">
            <div @touchstart="logoutfn"><i class="el-icon-circle-close"></i>退出</div>
            <div @touchstart="findPS"><i class="el-icon-unlock"></i>修改密码</div>
            <a v-if="$store.state.nowUser.isAdmin" href="/lhr/admin" target="_blank"><i class="el-icon-s-custom"></i>管理员页</a>
            <div class="file">
                <input type="file" name="file" @change="updateHeadPic">
                <div>
                    <i class="el-icon-picture"></i>修改头像
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {msgBox} from '@/components/JS';
import axios from 'axios';
export default {
    name : 'center',
    data(){
        return {
           
        }
    },
    methods : {
        logoutfn(){
            this.axios.get('/api2/api2/users/logout').then(res=>{
                if(res.data.status == 0){
                    var vm = this;
                    var date=new Date();
                    date.setTime(date.getTime()-60*60*1000);   //cookie设置一小时的过期时间
                    document.cookie="nowUser="+this.username+";path=/;expires="+date.toGMTString(); 
                    document.cookie="isAdmin=false;path=/;expires="+date.toGMTString(); 
                    this.$store.commit('nowUser/CHANGE_USERNAME',{username:"",isAdmin:false});
                    msgBox({
                        title : '登出',
                        content : '退出登录成功',
                        ok : '确定',
                        okfn(){
                            vm.$router.push('/mine/login')
                        }
                    })
                }
            })
        },
        findPS(){
            this.$router.push('/mine/findPassword')
        },
        updateHeadPic(e){
            var file = e.target.files[0];
            var formdata = new FormData();
            formdata.append('file',file,file.name);   //第一个file是  input的name值
            var config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }
            this.axios.post('/api2/api2/users/uploadHeadPic',formdata,config).then((res)=>{
                if(res.data.status == 0){
                    window.localStorage.setItem('headPic',res.data.imgUrl);
                    this.$store.commit('nowUser/CHANGE_HEADPIC',{headPic:res.data.imgUrl})
                    msgBox({
                        title : '修改头像',
                        content : '修改头像成功',
                        ok : '确定'
                    })
                }else{
                    msgBox({
                        title : '修改头像',
                        content : '修改头像失败',
                        ok : '确定'
                    })
                }
            })
        } 
    },
    beforeRouteEnter (to, from, next) {
       var allcookie = document.cookie;
       if(allcookie.indexOf("nowUser") == -1){
           next(vm=>{
               vm.$router.push('/mine/login')
           })
       }else{
           next()
       }
    }
}
</script>

<style scoped>
    .center-wrapper>h4{
        color: #333;
        font-size: 14px;
        line-height: 40px;
        text-indent: 20px;
    }
    .headPortrait{
        text-align: center;
        margin-bottom: 20px;
    }
    .headPortrait>div{
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #ccc;
        background-size:cover;
        background-position:center;
    }
    .operation{
        display: flex;
        flex-wrap: wrap;
    }
    .operation>div{
        text-align: center;
        width: 25%;
        box-sizing: border-box;
        padding: 6px 10px;
        color : #fe8c00;
        position: relative;
    }
    .operation>a{
        display: block;
        text-align: center;
        width: 25%;
        box-sizing: border-box;
        padding: 6px 10px;
        color : #fe8c00;
    }
    i{
        display: block;
        font-size: 30px;
    }
    .operation .file>input{
        opacity:0;
        width: 100%;
        height: 100%;
    }
    .operation .file>div{
        position: absolute;
        top: 6px;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

</style>