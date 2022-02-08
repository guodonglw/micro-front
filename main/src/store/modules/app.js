const app = {
  namespaced: true,
  state: {
    flag: false,
    collapsed: false
  },
  mutations: {
    UPDATE_FLAG: (state, flag) => {
      state.flag = flag
    },
    UPDATE_COLLAPSED: (state, collapsed) => {
      state.collapsed = collapsed
    }
  },
  actions: {
    UpdateFlag: (ctx, flag) => {
      ctx.commit('UPDATE_FLAG', flag)
    },
    UpdateCollapsed: (ctx, collapsed) => {
      ctx.commit('UPDATE_COLLAPSED', collapsed)
    }
  }
}

export default app
