<template>
    <el-container class="SlideBar-index">
        <el-header>欢迎管理员 : {{$store.state.nowUser.username}}</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="prevIndex" class="el-menu-vertical-demo"  background-color="#001529" text-color="#fff" active-text-color="#09f">
                    <el-submenu index="1">

                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>用户</span>
                        </template>

                        <el-menu-item index="1-1" @click="changePath('/admin/users')">用户列表</el-menu-item>
                        <el-menu-item index="1-2">暂无功能</el-menu-item>

                    </el-submenu>

                    <el-submenu index="2">

                        <template slot="title">
                            <i class="el-icon-video-camera-solid"></i>
                            <span>电影</span>
                        </template>

                        <el-menu-item index="2-1" @click="changePath('/admin/movies')">电影管理</el-menu-item>
                        <el-menu-item index="2-2">暂无功能</el-menu-item>

                    </el-submenu>

                    <el-submenu index="3">

                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>影院</span>
                        </template>

                        <el-menu-item index="3-1"  @click="changePath('/admin/cinemas')">影院管理</el-menu-item>
                        <el-menu-item index="3-2">暂无功能</el-menu-item>

                    </el-submenu>

                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
                <el-footer>Copyright © 2013-2019 刘姓帅哥的个人网站  harry6.com All Rights Reserved. 备案号：闽ICP备15012807号-1</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name : 'admin',
    data(){
        return {
            prevIndex : "1-1"
        }
    },
    methods : {
        changePath(v){
            this.$router.push(v);
        }
    },
    beforeRouteEnter (to, from, next) {
        function getCookie(name){
            var strcookie = document.cookie;//获取cookie字符串
            var arrcookie = strcookie.split("; ");//分割
            //遍历匹配
            for ( var i = 0; i < arrcookie.length; i++) {
                var arr = arrcookie[i].split("=");
                if (arr[0] == name){
                    return arr[1];
                }
            }
            return "";
        }

        if(eval(getCookie("isAdmin"))){
            next(vm=>{
                if(to.path == '/admin/users'){
                    vm.prevIndex = '1-1';
                }else if(to.path == '/admin/movies'){
                    vm.prevIndex = '2-1';
                }else if(to.path == '/admin/cinemas'){
                    vm.prevIndex = '3-1';
                }
            });
        }else{
            next('/mine/login');
        }

    }
}
</script>

<style scoped>
.el-header, .el-footer {
    background-color:#252b3a;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
  }
  .el-footer{
      font-size: 12px;
      font-weight: 300;
  }
  
  .el-aside {
    background-color:#000c17;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-menu{
      border:0;
  }
  .el-submenu{
      border-bottom: 1px solid #000c17;
  }
  .el-menu-item{
      background-color:#000c17 !important; 
  }
  .el-menu .is-active i,.el-menu .is-active span{
      color: #09f;
  }
</style>

<style>
    .el-menu .is-active i{
        color: #09f;
    }
</style>