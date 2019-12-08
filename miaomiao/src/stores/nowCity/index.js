const state = {
    nowNm : window.localStorage.getItem('nowNm') || '北京',
    nowId : JSON.parse(window.localStorage.getItem('nowId')) || 1
}

const mutations = {
    CHANGE_NOWCITY(state,payload){
        state.nowNm = payload.nm;
        state.nowId = payload.id;
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