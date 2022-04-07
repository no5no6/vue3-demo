import { defineStore } from 'pinia'

// 模拟数据请求
const get = (id: number):Promise<string> => {
  return new Promise((resolve: Function): void => {
    setTimeout(() => resolve(`用户-${id}`), 2000)
  })
}

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      number: 1,
      value: 'good'
    }
  },
  getters: {
    count: (state) => state.number + 1
  },
  actions: {
    async getValue (id: number) {
      this.value = await get(id)
    }
  }
})
