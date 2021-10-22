// 初始化数据
const state = {
  cartList: [],
}

// getter 抛出去的数据
const getters = {
  cartList(state) {
    return state.cartList
  },
  totalPrice(state, getters) {
    let total = 0
    getters.cartList.forEach(item => {
      total += item.good.presentPrice * item.num
    })
    return total
  },
  totalNum(state, getters) {
    let total = 0
    getters.cartList.forEach(item => {
      total += item.num
    })
    return total
  }
}

// action 异步操作
const actions = {
  addToCart({commit}, good) {
    let record = state.cartList.find(item => item.good.goodId === good.goodId)
    if (!record) {
      commit('ADD', good)
    } else {
      commit('ADD_NUM', good.goodId)
    }
  },
  delFromCart({commit}, goodId) {
    let record = state.cartList.find(item => item.good.goodId === goodId)
    if (record.num === 1) {
      commit('REMOVE_GOOD', goodId)
    } else {
      commit('REDUCE_NUM', goodId)
    }
  },
  clearFromCart({commit}, goodId) {
    let record = state.cartList.find(item => item.good.goodId === goodId)
    commit('REMOVE_GOOD', goodId)
  },
  clearCart({commit}) {
    commit('CLEAR_CART')
  }
}

// mutations
const mutations = {
  ADD(state, good) {
    state.cartList.push({
      good,
      num: 1
    })
  },
  ADD_NUM(state, goodId) {
    let record = state.cartList.find(item => item.good.goodId === goodId)
    record.num++
  },
  REDUCE_NUM(state, goodId) {
    let record = state.cartList.find(item => item.good.goodId === goodId)
    record.num--
  },
  REMOVE_GOOD(state, goodId) {
    let recordIndex = state.cartList.findIndex(item => item.good.goodId === goodId)
    state.cartList.splice(recordIndex, 1)
  },
  CLEAR_CART(state) {
    state.cartList = []
  },
  AFTER_ADD_ORDER(state) {
    state.cartList = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
