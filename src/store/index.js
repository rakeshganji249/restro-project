import { createStore } from 'vuex'
import restaurants from './modules/restaurants'

export default createStore({
  modules: {
    restaurants,
  },
})
