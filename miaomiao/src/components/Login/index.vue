<template>
    <div>
        <form>
            <input type="text" v-model='username' placeholder="用户名/手机号/Email" maxlength="17">
            <input type="password" v-model='password' placeholder="请输入您的密码" autocomplete maxlength="17">
            <input type="text" v-model='verify' placeholder="请输入验证码" maxlength="8">
            <div>
                <img @touchstart="sendRequest" src="/api2/api2/users/verifyImg"><span>点击图片切换验证码</span>
            </div>
            <div class="loginDiv" @touchstart="loginfn">登录</div>
        </form>
        <div class="options">
            <span @touchstart="regNow">立即注册</span>
            <span @touchstart="findPs">找回密码</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {msgBox} from '@/components/JS';
export default {
    name : 'Login',
    data(){
        return {
            username : '',
            password : '',
            verify : ''
        }
    },
    mounted(){
        
    },
    methods : {
        loginfn(){
            this.axios.post('/api2/api2/users/login',{
                username : this.username,
                password : this.password,
                verify : this.verify
            }).then((res)=>{
                if(res.data.status == 0){
                    var vm = this;
                    var date=new Date();
                    date.setTime(date.getTime()+60*60*1000);   //cookie设置一小时的过期时间
                    document.cookie="nowUser="+this.username+";path=/;expires="+date.toGMTString(); 
                    document.cookie="isAdmin="+res.data.isAdmin+";path=/;expires="+date.toGMTString(); 
                    this.$store.commit('nowUser/CHANGE_USERNAME',{username:this.username,isAdmin:res.data.isAdmin});
                    window.localStorage.setItem('headPic',res.data.headPic);
                    msgBox({
                        title : '登录',
                        content : '登录成功',
                        ok: '确定',
                        cancel: '取消',
                        okfn(){
                            vm.$store.commit('nowUser/CHANGE_HEADPIC',{headPic:res.data.headPic})
                            vm.$router.push('/mine/center')
                        }
                    })
                }else{
                    msgBox({
                        title : '登录',
                        content : res.data.msg,
                        ok: '确定',
                        cancel : '取消'
                    })
                }
            })
        },
        regNow(){
            this.$router.push('/mine/register')
        },
        findPs(){
            this.$router.push('/mine/findPassword')
        },
        sendRequest(e){
            e.target.src = '/api2/api2/users/verifyImg?'+Math.random();
        }
    },
    beforeRouteEnter (to, from, next) {
       var allcookie = document.cookie;
       if(allcookie.indexOf("nowUser") == -1){
           next()
       }else{
           next(vm=>{
               vm.$router.push('/mine/center')
           })
       }
    }
}
</script>

<style scoped>
    form input{
        width: 100%;
        line-height: 40px;
        border:none;
        border-bottom: 1px solid #e6e6e6;
        font-size: 14px;
        color: #666;
        text-indent: 6px;
    }
    .loginDiv{
        width: 90%;
        margin: 10px auto;
        text-align: center;
        background: red;
        color: #fff;
        line-height: 50px;
        border-radius: 4px;
    }
    .options{
        display: flex;
        color: red;
        padding: 0 6px;
        justify-content: space-between;
        font-size: 14px;
    }
</style>