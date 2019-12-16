<template>
    <div class="center-wrapper">
        <h4>我的</h4>
        <div class="headPortrait">
            <div></div>
            <p>{{$store.state.nowUser.username}}</p>
        </div>
        <h4>我的操作</h4>
        <div class="operation">
            <div @touchstart="logoutfn">退出</div>
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
    mounted(){
      
    },
    methods : {
        logoutfn(){
            this.axios.get('/api2/api2/users/logout').then(res=>{
                if(res.data.status == 0){
                    var vm = this;
                    msgBox({
                        title : '登出',
                        content : '退出登录成功',
                        ok : '确定',
                        okfn(){
                            vm.$store.commit('nowUser/CHANGE_USERNAME',{username:""})
                            vm.$router.push('/mine/login')
                        }
                    })
                }
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api2/api2/users/getUser').then(res=>{
            if(res.data.status == 0){
                next(vm=>{
                    vm.$store.commit('nowUser/CHANGE_USERNAME',{username:res.data.data.username})
                })
            }else{
                next('/mine/login')
            }
        })
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
</style>