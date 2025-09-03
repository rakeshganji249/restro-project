import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    list: [],
    isLoading: false,
    errorMessage: '',
  }),
  getters: {
    restaurants: (state) => state.list,
    isLoading: (state) => state.isLoading,
    errorMessage: (state) => state.errorMessage,
  },
  mutations: {
    setRestaurants(state, payload) {
      state.list = payload
    },
    addRestaurant(state, payload) {
      state.list.push(payload)
    },
    updateRestaurantInStore(state, payload) {
      const index = state.list.findIndex(r => r.id === payload.id)
      if (index !== -1) {
        state.list.splice(index, 1, payload)
      }
    },
    setLoading(state, payload) {
      state.isLoading = payload
    },
    setError(state, payload) {
      state.errorMessage = payload
    },
  },
  actions: {
    async fetchRestaurants({ commit }) {
      commit('setLoading', true)
      commit('setError', '')
      try {
        const response = await axios.get('http://localhost:3000/restaurants')
        commit('setRestaurants', response.data)
      } catch (error) {
        console.error('Error fetching restaurants:', error)
        if (error.code === 'ERR_NETWORK') {
          commit(
            'setError',
            'Network error: Unable to connect to the server. Please check if the server is running.'
          )
        } else if (error.response?.status === 404) {
          commit(
            'setError',
            'Restaurant endpoint not found. Please ensure the backend server is configured correctly.'
          )
        } else {
          commit('setError', 'Error fetching restaurants. Please try again.')
        }
      } finally {
        commit('setLoading', false)
      }
    },
    async addRestaurant({ commit }, restaurant) {
      commit('setLoading', true)
      commit('setError', '')
      try {
        const response = await axios.post(
          'http://localhost:3000/restaurants',
          restaurant
        )
        commit('addRestaurant', response.data)
        return response.data
      } catch (error) {
        console.error('Error adding restaurant:', error)
        if (error.code === 'ERR_NETWORK') {
          commit(
            'setError',
            'Network error: Unable to connect to the server. Please check if the server is running.'
          )
        } else if (error.response?.status === 404) {
          commit(
            'setError',
            'Restaurant endpoint not found. Please ensure the backend server is configured correctly.'
          )
        } else if (error.response?.status === 400) {
          commit(
            'setError',
            error.response.data.message || 'Invalid input data.'
          )
        } else {
          commit('setError', 'Error adding restaurant. Please try again.')
        }
        throw error
      } finally {
        commit('setLoading', false)
      }
    },
    async updateRestaurant({ commit }, restaurant) {
      commit('setLoading', true)
      commit('setError', '')
      try {
        const response = await axios.put(
          `http://localhost:3000/restaurants/${restaurant.id}`,
          restaurant
        )
        commit('updateRestaurantInStore', response.data)
        return response.data
      } catch (error) {
        console.error('Error updating restaurant:', error)
        commit('setError', error.response?.data?.message || 'Error updating restaurant.')
        throw error
      } finally {
        commit('setLoading', false)
      }
    },
  },
}
