<template>
    <div>
        <Header></Header>
        <div class="nav">
            <router-link tag='p' to='/movie/city' class="elipsis">{{$store.state.nowCity.nowNm}}</router-link>
            <router-link tag='p' to='/movie/nowplaying'>正在热映</router-link>
            <router-link tag='p' to='/movie/future'>即将上映</router-link>
            <router-link tag='p' to='/movie/search'>搜索</router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <TabBar></TabBar>

        <router-view name="detail"></router-view>
    </div>
</template>

<script>
import {msgBox} from '@/components/JS';
export default {
    name:'Movie',
    data(){
        return {
            prevPath : '/movie/nowplaying'
        }
    },
    mounted(){
            var id = 45;
            var nm = "重庆";
            var vm = this;
            if(id != this.$store.state.nowCity.nowId){
                setTimeout(() => {
                    msgBox({
                        title : '城市定位',
                        content : nm,
                        cancel : '取消',
                        ok : '切换城市',
                        okfn(){
                            window.localStorage.setItem('nowNm',nm);
                            window.localStorage.setItem('nowId',id+'');
                            vm.$store.commit('nowCity/CHANGE_NOWCITY',{"nm":"重庆","id":45});
                            window.location.reload();
                        }
                    });
                }, 2000);
            }
            
        
    },
    beforeRouteLeave (to, from, next) {
        this.prevPath = from.path;
        next()
    },
    watch : {
        $route:{
            handler(to,from){
                if(from){
                    var res = from.path.indexOf('/movie/');
                    if((res==-1) && (to.path == '/movie')){ //其他页面点电影
                        this.$router.push(this.prevPath)
                    }
                    if((res!=-1) && (to.path == '/movie')){ //本页面点电影
                        this.$router.push(from.path)
                    }
                }else{
                    if(to.path == '/movie'){ //初始登入
                        this.$router.push('/movie/nowplaying');
                    }
                }
            },
            immediate : true
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
        p:nth-of-type(1){
            box-sizing:border-box;
            padding: 0 14px;
        }
        .router-link-active{
            color: red;
        }
    }
</style>