<template>
    <div class="bscroll">
        <Loading v-show="isLoading" />
        <Scroller>
            <div class="future-wraper" style="transform: translate(0px, 0px) scale(1) translateZ(0px)">
                <div v-for='item in movies' :key='item.title'>
                    <h5>{{item.title}}</h5>
                    <div class="item" v-for='k in item.movieList' :key='k.id'>
                        <img :src="k.img | setWH('64.90')" alt="">
                        <div @tap='toDetail(k.id)'>
                            <p class="elipsis">{{k.nm}}</p>
                            <p class="elipsis"><span class="yellow">{{k.wish}}</span>人想看</p>
                            <p class="elipsis">主演:{{k.star}}</p>
                            <p class="elipsis">{{k.rt}}上映</p>
                        </div>
                        <span :class="[k.showst==4?'blue':'gold']">
                            {{k.showst==4?'预售':'想看'}}
                        </span>
                    </div>
                </div>
            </div>
        </Scroller>
    </div>
</template>

<script>
export default {
    name : 'Future',
    data(){
        return {
            movies : [],
            isLoading : true,
            prevCityId : -100
        }
    },
    activated(){
        if(this.$store.state.nowCity.nowId  == this.prevCityId){return;}
        var allh = window.screen.height;
        document.querySelector('.bscroll').style.height = allh-142+'px';
        this.isLoading = true;
        this.axios.get('/ajax/ajax/comingList?ci=1&token=').then(res=>{
                if(res.data.coming && res.data.coming.length){
                    var ajaxData = res.data.coming;
                    this.fomatData(ajaxData);
                    this.prevCityId = this.$store.state.nowCity.nowId;
                    this.isLoading = false;
                }
        })
    },
    methods : {
        fomatData(ajaxData){
            var movies = [];
            for(var i=0;i<ajaxData.length;i++){
                if(findTitle(ajaxData[i])){
                    for(var k=0;k<movies.length;k++){
                        if(movies[k].title == ajaxData[i].comingTitle){
                            movies[k].movieList.push(ajaxData[i]);
                        }
                    }
                }else{
                    movies.push({title:ajaxData[i].comingTitle,movieList:[ajaxData[i]]})
                }
            }
            this.movies = movies;

            function findTitle(one){
                for(var j=0;j<movies.length;j++){
                    if(one.comingTitle == movies[j].title){
                        return true;
                    }
                }
                return false;
            }
        },
        toDetail(movieId){
            this.$router.push('/movie/detail/jjsy/'+ movieId);
        }
    }
}
</script>

<style scoped>
    .future-wraper{
        color: #333;
    }
    .future-wraper h5{
        font-size: 14px;
        font-weight: 300;
        text-indent: 15px;
        padding: 10px 0 0;
    }
    .future-wraper .item{
        padding: 12px 30px 12px 15px;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .future-wraper .item>img{
        width: 64px;
        height: 90px;
    }
    .future-wraper .item>div{
        width: 62%;
    }
    .future-wraper .item>div>p{
        color: #666;
        font-size: 14px;
        line-height: 20px;
    }
    .future-wraper .item>div>p:nth-of-type(1){
        line-height: 30px;
        font-weight: 800;
        color: #333;
        font-size: 16px;
    }
    .yellow{
        color: #FAAF00;
        font-weight: 800;
        font-size: 14px;
    }
    .gold,.blue{
        background: #3C9FE6;
        color: #fff;
        padding: 7px 10px;
        border-radius: 4px;
        font-size: 12px;
    }
    .gold{
        background: #FAAF00;
    }
</style>