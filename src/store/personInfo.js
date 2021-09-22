export default {
    state: {
        idUser:null,// id  пользователя
        role:'reader',//роль пользователя
        name:null,
        isLogin:false
    },
    mutations: {
        SET_ID(state, payload) {
            state.idUser = payload
        },
        SET_ROLE(state, payload) {
            state.role = payload
        },
        SET_NAME(state, payload) {
            state.name = payload
        },
        SET_LOGIN(state, payload) {
            state.isLogin = payload
        }
    },
    actions: {
        async SetUserInfo(context,res) {
            context.commit('SET_ID',res.data.id);
            context.commit('SET_ROLE',res.data.role);
            context.commit('SET_NAME',res.data.firstName);
            context.commit('SET_LOGIN',true);
        },
        async ExitUser(context) {
            context.commit('SET_ID',null);
            context.commit('SET_ROLE','reader');
            context.commit('SET_NAME',null);
            context.commit('SET_LOGIN',false);
        }
    },
    getters: {
        role: state => state.role,
        idUser: state => state.idUser,
        name: state => state.name,
        log_in: state => state.isLogin
    }
}