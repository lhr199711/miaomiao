const state = {
    username : ""
}

const mutations = {
    CHANGE_USERNAME(state,payload){
        state.username = payload.username;
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