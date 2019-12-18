<template>
    <div>
        <form>
            <h4>修改密码</h4>
            <input v-model="email" placeholder="请输入邮箱" maxlength="17">
            <input v-model="password" type="password" placeholder="请输入新密码" maxlength="16" autocomplete>
            <div class="email">
                <input v-model='verify' placeholder="请输入验证码" maxlength="4">
                <div @touchstart='sendVerify'>
                    获取验证码
                </div>
            </div>
        </form>
        <div class="sure" @touchstart='updatePs'>
            确定
        </div>
        <div class="bottom">
            <router-link tag="span" to="/mine/login">立即登录</router-link>
            <router-link tag="span" to="/mine/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
import {msgBox} from '@/components/JS'
export default {
    name : 'FindPassword',
    data(){
        return {
            email : '',
            password : '',
            verify : ''
        }
    },
    methods : {
        sendVerify(){
            if(this.email == ''){
                msgBox({
                    title : '验证码',
                    content : '请完善信息',
                    ok : '确定'
                })
            }else{
                this.axios.get('/api2/api2/users/verify?email='+this.email).then(res=>{
                    if(res.data.status == 0){
                        msgBox({
                            title : '验证码',
                            content : '验证码发送成功',
                            ok : '确定'
                        })
                    }else{
                        msgBox({
                            title : '验证码',
                            content : '验证码发送失败',
                            ok : '确定'
                        })
                    }
                })
            }
        },
        updatePs(){
            this.axios.post('/api2/api2/users/findPassword',{
                email : this.email,
                password : this.password,
                verify : this.verify
            }).then(res=>{
                if(res.data.status==0){
                    var vm = this;
                    if(res.data.online == false){
                        msgBox({
                            title : '修改密码',
                            content : '修改密码成功',
                            ok : '确定',
                            okfn(){
                                vm.$router.push('/mine/login')
                            }
                        })
                    }else{
                        var date=new Date();
                        date.setTime(date.getTime()-60*60*1000);   //cookie设置一小时的过期时间
                        document.cookie="nowUser="+this.username+";path=/;expires="+date.toGMTString(); 
                        this.$store.commit('nowUser/CHANGE_USERNAME',{username:""});
                       msgBox({
                            title : '修改密码',
                            content : '密码成功,请重登',
                            ok : '确定',
                            okfn(){
                                vm.$router.push('/mine/login')
                            }
                        })
                    }
                }else{
                    msgBox({
                        title : '修改密码',
                        content : res.data.msg,
                        ok : '确定'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
    h4{
        color: #333;
        font-size: 14px;
        line-height: 40px;
        text-indent: 20px;
        border-bottom: 1px solid #999;
        margin: 0 0 30px;
    }
    input{
        border:1px solid #999;
        display: block;
        width: 80%;
        line-height: 30px;
        height: 30px;
        text-indent: 6px;
        color: #666;
        margin:0 auto 20px;
    }
    input::-webkit-input-placeholder{
        color: #999;
        font-size: 14px;
    }
    .email{
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .email>input{
        margin: 0;
        width: 40%;
        font-size: 20px;
    }
    .email>div{
        color: red;
        line-height: 30px;
        border: 1px solid red;
        width: 30%;
        border-radius: 3px;
        text-align: center;
    }
    .sure{
        width: 80%;
        margin: 20px auto;
        text-align: center;
        background: red;
        color: #fff;
        line-height: 50px;
        border-radius: 4px;
    }
    .bottom{
        display: flex;
        box-sizing: border-box;
        padding: 0 6px;
        justify-content: space-between;
    }
    .bottom>span{
        font-size: 12px;
        color: red;
    }
</style>