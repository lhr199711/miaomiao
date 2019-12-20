<template>
    <div class="center-wrapper">
        <h4>我的</h4>
        <div class="headPortrait">
            <div></div>
            <p>{{$store.state.nowUser.isAdmin?"管理员":"普通用户"}}:{{$store.state.nowUser.username}}</p>
        </div>
        <h4>我的操作</h4>
        <div class="operation">
            <div @touchstart="logoutfn"><i class="el-icon-circle-close"></i>退出</div>
            <div @touchstart="findPS"><i class="el-icon-unlock"></i>修改密码</div>
            <a v-if="$store.state.nowUser.isAdmin" href="/lhr/admin" target="_blank"><i class="el-icon-s-custom"></i>管理员页</a>
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
        background: red;
        border-radius: 50%;
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
</style>