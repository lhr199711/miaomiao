(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a916724"],{"3d3d":function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"bscroll"},[s("Loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}]}),s("Scroller",[s("div",{staticClass:"future-wraper",staticStyle:{transform:"translate(0px, 0px) scale(1) translateZ(0px)"}},t._l(t.movies,(function(i){return s("div",{key:i.title},[s("h5",[t._v(t._s(i.title))]),t._l(i.movieList,(function(i){return s("div",{key:i.id,staticClass:"item"},[s("img",{attrs:{src:t._f("setWH")(i.img,"64.90"),alt:""}}),s("div",{on:{tap:function(s){return t.toDetail(i.id)}}},[s("p",{staticClass:"elipsis"},[t._v(t._s(i.nm))]),s("p",{staticClass:"elipsis"},[s("span",{staticClass:"yellow"},[t._v(t._s(i.wish))]),t._v("人想看")]),s("p",{staticClass:"elipsis"},[t._v("主演:"+t._s(i.star))]),s("p",{staticClass:"elipsis"},[t._v(t._s(i.rt)+"上映")])]),s("span",{class:[4==i.showst?"blue":"gold"]},[t._v(" "+t._s(4==i.showst?"预售":"想看")+" ")])])}))],2)})),0)])],1)},a=[],n={name:"Future",data:function(){return{movies:[],isLoading:!0,prevCityId:-100}},activated:function(){var t=this;if(this.$store.state.nowCity.nowId!=this.prevCityId){var i=window.screen.height;document.querySelector(".bscroll").style.height=i-142+"px",this.isLoading=!0,this.axios.get("/ajax/ajax/comingList?ci=1&token=&limit=10").then((function(i){if(i.data.coming&&i.data.coming.length){var s=i.data.coming;t.fomatData(s),t.prevCityId=t.$store.state.nowCity.nowId,t.isLoading=!1}}))}},methods:{fomatData:function(t){for(var i=[],s=0;s<t.length;s++)if(a(t[s]))for(var e=0;e<i.length;e++)i[e].title==t[s].comingTitle&&i[e].movieList.push(t[s]);else i.push({title:t[s].comingTitle,movieList:[t[s]]});function a(t){for(var s=0;s<i.length;s++)if(t.comingTitle==i[s].title)return!0;return!1}this.movies=i},toDetail:function(t){this.$router.push("/movie/detail/jjsy/"+t)}}},o=n,r=(s("82a0"),s("2877")),l=Object(r["a"])(o,e,a,!1,null,"0362ab14",null);i["default"]=l.exports},"82a0":function(t,i,s){"use strict";var e=s("a6b3"),a=s.n(e);a.a},a6b3:function(t,i,s){}}]);
//# sourceMappingURL=chunk-6a916724.1bfc54ec.js.map