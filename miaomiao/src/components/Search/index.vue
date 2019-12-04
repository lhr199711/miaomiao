<template>
    <div class="search-wraper">
        <div class="head">
            <input v-model='text' placeholder="搜电影,搜影院"> 
            <span @touchstart='back'>取消</span>
        </div>
        <div class="bscroll">
            <Loading v-show="isLoading" />
            <Scroller>
                <div class="content" v-show='movies.list && text'>
                    <div>电影/电视剧/综艺</div>
                    <div v-for='item in movies.list' :key='item.id' class="item">
                        <img :src="item.img | setWH('64.90')" alt="">
                        <div style='width:54%;text-indent:8px;'>
                            <h5 class="elipsis">{{item.nm}}</h5>
                            <p  class="elipsis" v-if='item.enm'>{{item.enm}}</p>
                            <p class="elipsis">{{item.cat}}</p>
                            <p class="elipsis">{{item.rt}}</p>
                        </div>
                        <div class="want">
                            <span v-if='item.globalReleased' class="span1" style="font-size:16px;">8.7分</span>
                            <span v-if='!item.globalReleased' class="span2">
                                <span style='font-weight:800;font-size:16px;'>{{item.wish}}</span>人想看
                            </span>
                            <span v-if='!item.globalReleased' class="span3">想看</span>
                            
                        </div>
                    </div>
                    <p>查看全部{{movies.total}}部影视剧</p>
                </div>    
            </Scroller>    
        </div>
    </div>    
</template>

<script>
export default {
    name : 'Search',
    data(){
        return {
            text:'',
            movies : {},
            timer : 0,
            isLoading : false
        }
    },
    mounted(){
        var h = window.innerHeight;
        document.querySelector('.search-wraper').style.minHeight= h-142+'px';
    },
    watch : {
        text(v){
            this.movies = {};
            if(v){
                this.isLoading = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    this.axios.get('/api/searchList?cityId=10&kw='+this.text).then(res=>{
                        if(Object.keys(res.data.data).length){
                            this.movies = res.data.data.movies;
                            this.isLoading = false;
                        }  
                    })
                },400) 
            }
        }
    },
    methods : {
        back(){
            this.text = '';
            this.movies = {};
            this.$router.push('/movie/nowplaying');
        }
    }
}
</script>

<style scoped>
    .head{
        position: sticky;
        z-index: 100;
        top:91px;
        left: 0;
        background: #f5f5f5;
    }
    .bscroll{
        height: 476px;
        background: #f5f5f5;
    }
    .search-wraper{
        background: #f5f5f5;
        padding: 0 0 50px;
    }
    .search-wraper .head{
        padding: 8px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
    }
    .search-wraper .head input{
        background: #fff;
        width: 82%;
        height: 30px;
        text-indent: 8px;
        border-radius: 4px;
        color: #666;
    }
    .search-wraper .head span{
        color: red;
        line-height: 30px;
        display: inline-block;
        padding: 0 6px 0 0;
    }
    .search-wraper .content{
        color: #999;
        background: #fff;
    }
    .search-wraper .content>div{
        border-bottom: 1px solid #e5e5e5;
    }
    .search-wraper .content div:nth-of-type(1){
        line-height: 38px;
        text-indent: 15px;
    }
    .search-wraper .content>p{
        line-height: 44px;
        color: red;
        text-align: center;
    }
    .search-wraper .content .item{
        padding: 12px 15px;
        display: flex;
        position: relative;
    }
    .search-wraper .content .item>img{
        width: 64px;
        height: 90px;
    }
    .search-wraper .content .item>div>h5{
        font-size: 16px;
        font-weight: 1000;
        color: #333;
        line-height: 1;
        padding: 4px 0;
    }
    .search-wraper .content .item>div>p{
        font-size: 12px;
        line-height: 18px;
        color: #666;
    }
    .want{
        position: absolute;
        right: 20px;
        top: 12px;
        font-size: 12px;
    }
    .want>span{
        display: block;
    }
    .want>.span2,.want>.span1{
        color: #FA0;
    }
    .want>.span3{
        display: inline-block;
        color: #fff;
        background: #FA0;
        width: 48px;
        line-height: 26px;
        text-align: center;
        border-radius: 4px;
        position: absolute;
        right: 0;
        top:30px;
    }
</style>