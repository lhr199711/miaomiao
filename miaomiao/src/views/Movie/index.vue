<template>
    <div>
        <Header></Header>
        <div class="nav">
            <router-link tag='p' to='/movie/city'>城市</router-link>
            <router-link tag='p' to='/movie/nowplaying'>正在热映</router-link>
            <router-link tag='p' to='/movie/future'>即将上映</router-link>
            <router-link tag='p' to='/movie/search'>搜索</router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <TabBar></TabBar> 
    </div>
</template>

<script>
export default {
    name:'Movie',
    data(){
        return {
            prevPath : '/movie/nowplaying'
        }
    },
    beforeRouteLeave (to, from, next) {
        this.prevPath = from.path;
        next();
    },
    watch:{
        $route:{
            handler(to,from){
               if(from){
                   var res = from.path.indexOf('/movie/');
                   if(res==-1){
                        if(to.path == '/movie'){ //其他页面点电影
                            this.$router.push(this.prevPath)
                        }
                   }else{
                        if(to.path == '/movie'){ //本页面点电影
                             this.$router.push(from.path)
                        }
                   }
                   
               }else{
                   if(to.path == '/movie'){
                       this.$router.push('/movie/nowplaying');
                       return;
                   }
                    if(this.$router.currentRoute.path == to.path){
                        
                    }else{
                        this.$router.push('/movie/nowplaying')
                    }  
               }
            },
            immediate: true 
        }
    }
}
</script>

<style lang='scss' scoped>
    .nav{
        position: sticky;
        top:50px;
        left: 0;
        z-index: 999;
        background: #fff;
        border-bottom:1px solid #ccc;
        line-height: 40px;
        font-weight: 700;
        color: #666;
        display: flex;
        p{
            width: 25%;
            text-align: center;
        }
        .router-link-active{
            color: red;
        }
    }
</style>