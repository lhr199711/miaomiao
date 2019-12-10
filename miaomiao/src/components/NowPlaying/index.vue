<template>
    <div class="bscroll">
        <Loading v-show="isLoading" />
        <Scroller :handleToScroll='handleToScroll' :handleTotouchEnd='handleTotouchEnd'>
            <div class="nowPlaying-wraper" id='lhr' style="transform: translate(0px, 0px) scale(1) translateZ(0px)">
                <p>{{text}}</p>
                <div v-for='item in movieList' :key='item.id'>
                    <img :src="item.img | setWH('64.90')" alt="">
                    <div @tap='toDetail(item.id)'>
                        <p class="elipsis">{{item.nm}}</p>
                        <p class="elipsis" v-if="item.globalReleased && item.sc">观众评 <span class="yellow">{{item.sc}}</span></p>
                        <p class="elipsis" v-if="item.globalReleased && !item.sc">暂无评分</p>
                        <p class="elipsis" v-if="!item.globalReleased"><span class="yellow">{{item.wish}}</span>人想看</p>
                        <p class="elipsis">主演:{{item.star}}</p>
                        <p class="elipsis">{{item.showInfo}}</p>
                    </div>
                    <span :class="[item.globalReleased ? 'red' : 'blue']">{{item.globalReleased ? '购票' : '预售'}}</span>
                </div>
            </div>
        </Scroller>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name : 'NowPlaying',
    data(){
        return {
            movieList : [],
            text : '',
            isLoading : true,
            prevCityId : -100
        }
    },
    activated(){
        if(this.$store.state.nowCity.nowId == this.prevCityId){return;}
        var allh = window.screen.height;
        document.querySelector('.bscroll').style.height = allh-142+"px";
        this.isLoading = true;
        this.axios.get('/ajax/ajax/movieOnInfoList?&ci='+this.$store.state.nowCity.nowId).then(res=>{
            if(res.data.movieList.length){
                this.movieList = res.data.movieList;
                this.prevCityId = this.$store.state.nowCity.nowId;
                this.isLoading = false;
                // this.$nextTick(()=>{
                //     var scorll =new BScroll(this.$refs.bscroll,{
                //         tap : true,
                //         probeType: 1
                //     });
                //     scorll.on('scroll',(pos)=>{
                //         if(pos.y>20){
                //             this.text = "正在刷新..."
                //         }
                //     })
                //     scorll.on('touchEnd',()=>{
                //         this.text = "刷新成功...";
                //         setTimeout(()=>{
                //             this.text = ""
                //         },1000)
                //     })
                // });
            }
        })
    },
    methods : {
        handleToScroll(pos){
            if(pos.y>20){
                this.text = "正在刷新..."
            }
        },
        handleTotouchEnd(pos){
           this.text = "刷新成功...";
            setTimeout(()=>{
                this.text = ""
            },1000)
        },
        toDetail(movieId){
            this.$router.push('/movie/detail/zzry/'+ movieId);
        }
    }
}
</script>

<style scoped>
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
    .nowPlaying-wraper>p:nth-of-type(1){
        text-align: center;
        position: fixed;
        top: -20px;
        left:0;
        width: 100%;
    }
</style>