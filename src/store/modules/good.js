import { findmenu } from '@/api/goods'

const state={
    cateArr:[]
}

const mutations={
    UPDATE_CATES: (state, payload) => {
        state.cateArr = payload
      }
}

const actions={
    getFindmenu({ commit }) {
        // 调接口
        return new Promise((resolve, reject)=>{
            findmenu().then(res => {
            commit('UPDATE_CATES', res.data)
            resolve()
          })
        })
      }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}