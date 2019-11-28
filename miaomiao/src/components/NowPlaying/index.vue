<template>
    <div class="nowPlaying-wraper">
        <div v-for='item in movieList' :key='item.id'>
            <img :src="item.img | setWH('64.90')" alt="">
            <div>
                <p class="elipsis">{{item.nm}}</p>
                <p class="elipsis" v-if="item.globalReleased">观众评 <span class="yellow">{{item.sc}}</span></p>
                <p class="elipsis" v-else><span class="yellow">{{item.wish}}</span>人想看</p>
                <p class="elipsis">主演:{{item.star}}</p>
                <p class="elipsis">{{item.showInfo}}</p>
            </div>
            <span :class="[item.globalReleased ? 'red' : 'blue']">{{item.globalReleased ? '购票' : '预售'}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name : 'NowPlaying',
    data(){
        return {
            movieList : []
        }
    },
    mounted(){
        this.axios.get('/api/movieOnInfoList?cityId=10').then(res=>{
            if(res.data.msg == 'ok'){
                this.movieList = res.data.data.movieList;
            }
        })
    }
}
</script>

<style scoped>
    .nowPlaying-wraper{
        padding: 0 0 50px;
    }
    .nowPlaying-wraper>div{
        border-bottom: 1px solid #ccc;
        padding: 14px 30px 14px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .nowPlaying-wraper>div>div{
        width: 62%;
    }
    .nowPlaying-wraper>div>div>p{
        line-height: 20px;
        color: #666;
        font-size: 14px;
    }
    .nowPlaying-wraper>div>div>p:nth-of-type(1){
        font-weight: 700;
        line-height: 30px;
        color: #333;
        font-size: 16px;
    }
    .yellow{
        font-weight: 700;
        color: #faaf00;
    }
    .blue,.red{
        background: red;
        color: #fff;
        padding: 7px 10px;
        border-radius: 4px;
        font-size: 12px;
    }
    .blue{
        background:#3C9FE6;
    }
</style>