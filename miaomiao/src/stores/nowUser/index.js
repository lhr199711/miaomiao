const state = {
    username : getCookie("nowUser") || "",
    isAdmin : eval(getCookie("isAdmin")) || false,
    headPic : window.localStorage.getItem('headPic') || ''
}

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



const mutations = {
    CHANGE_USERNAME(state,payload){
        state.username = payload.username;
        state.isAdmin = payload.isAdmin;
    },
    CHANGE_HEADPIC(state,payload){
        state.headPic = payload.headPic;
    }
}

const actions = {

}

export default {
    namespaced : true,
    state,
    mutations,
    actions
}