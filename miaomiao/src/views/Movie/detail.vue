<template>
    <div class="detail-wraper">
        <Header title="影片详情">
            <span></span>
        </Header> 
        <!-- <Loading class="loading" v-if='!detailMovie.star'/>
        <div v-else class="imgs">
            <div class="bgDiv" :style="(`background-image:url(${detailMovie.img})`) | setWH('71.100')"></div>
            <div class="imgs-content">
                <img :src="detailMovie.img | setWH('71.100')">
                <div>
                    <h4 class="elipsis">{{detailMovie.nm}}</h4>
                </div>
            </div>
        </div>  -->
        <h3>这个页面接口经常炸T_T</h3>
        <div class="bscroll">
            <Scroller>
                <div class="lhr">
                    <div class="swiper-container" ref="lhrcontaier">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for='i in 20' :key="i">{{i}}</div>
                        </div>
                    </div>
                    <div class="son">1</div>
                    <div class="son">2</div>
                    <div class="son">3</div>
                    <div class="son">4</div>
                    <div class="son">5</div>
                    <div class="son">6</div>
                    <div class="son">7</div>
                    <div class="son">8</div>
                    <div class="son">9</div>  
                </div>
            </Scroller>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            detailMovie : {}
        }
    },
    props : ['movieId'],
    mounted(){
        var swiper = new Swiper(this.$refs.lhrcontaier, {
            slidesPerView: 3,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        // this.axios.post('/ajax/ajax/detailmovie?movieId='+this.movieId).then(res=>{
        //     if(res.data.detailMovie.star){
        //         this.detailMovie = res.data.detailMovie;
        //     }
        // })
    },
    methods : {

    }
}
</script>

<style scoped>
    .bscroll{
        height: 576px;
    }
    .detail-wraper{
        height: 100%;
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        z-index: 1000;
        background: #fff;
        animation: moveLeft .3s;
    }
    @keyframes moveLeft {
        0%{transform: translateX(100%)}
        100%{transform: translateX(0%)}
    }
    .detail-wraper>h3{
        text-align: center;
        line-height: 40px;
        color: red;
        border-bottom: 1px dotted red;
        position: sticky;
        top: 50px;
        left: 0;
        width: 100%;
        z-index: 2000;
        background: #fff;
    }
    .swiper-wrapper>div{
        height: 100px;
    }
    .swiper-wrapper>div:nth-of-type(n){
        background: red;
    }
    .swiper-wrapper>div:nth-of-type(2n-1){
        background: purple;
    }
    .lhr{
        background: pink;
    }
    .lhr .son{
        line-height: 100px;
        font-size: 30px;
        font-weight: 800;
    }
    /* .imgs{
        position: relative;
        height: 190px;
    }
    .imgs .bgDiv{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(20px);
        background-size: cover;
        background-repeat: no-repeat;
        opacity: .9;  
        z-index: -1;
    }
    .imgs .imgs-content{
        display: flex;
        height: 150px;
        box-sizing: border-box;
        margin: 20px 30px 20px 15px;
    }
    .imgs .imgs-content>img{
        width: 110px;
        height: 100%;
    }
    .imgs .imgs-content>div{
        width: 220px;
        box-sizing: border-box;
        padding: 0 0 0 10px;
    }
    .imgs-content>div h4{
        color: #fff;
        font-size: 20px;
    }
    .loading{
        top: 50px;
        height: calc(100% - 50px);
    } */
</style>