<template>
    <div class="tabbar-wraper">
        <router-link tag='p' to='/movie'>电影</router-link>
        <router-link tag='p' to='/cinema'>影院</router-link>
        <router-link tag='p' to='/mine'>我的</router-link>
    </div>
</template>

<script>
export default {
    name:'TabBar'
}
</script>

<style lang='scss' scoped>
    .tabbar-wraper{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        background: #fff;
        border-top: 1px solid #ccc;
        display: flex;
        font-size: 16px;
        line-height: 50px;
        .router-link-active{
            color: red;
        }
        p{
            color: #696969;
            width: 33.33%;
            text-align: center;
        }
    }
</style>