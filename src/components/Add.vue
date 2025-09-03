<template>
  <HeaderBar />
  <h1>Welcome to add restaurant page</h1>
  <div class="add-form">
    <div class="form-group">
      <input
        v-model="newRestaurant.name"
        placeholder="Restaurant Name"
        v-autofocus
        v-validate="errors.name"
        @input="validateName"
        required
      />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
    </div>

    <div class="form-group">
      <select
        v-model="newRestaurant.cuisine"
        v-validate="errors.cuisine"
        @change="validateCuisine"
        required
      >
        <option value="" disabled>Select Cuisine</option>
        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
          {{ cuisine }}
        </option>
      </select>
      <p v-if="errors.cuisine" class="error">{{ errors.cuisine }}</p>
    </div>

    <div class="form-group">
      <input
        v-model="newRestaurant.location"
        placeholder="Location"
        v-validate="errors.location"
        @input="validateLocation"
        required
      />
      <p v-if="errors.location" class="error">{{ errors.location }}</p>
    </div>

    <button @click="addRestaurantHandler" :disabled="isLoading || !isFormValid">
      Add Restaurant
    </button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>

  <TableComponent
    :items="restaurants"
    :headers="['Name', 'Cuisine', 'Location']"
    @table-action="handleTableAction"
  />
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import TableComponent from './TableComponent.vue'
import { mapGetters, mapActions } from 'vuex'
import { cuisines, validateName, validateCuisine, validateLocation, isFormValid as externalFormValid } from '../utils/validators'

export default {
  name: 'AddPage',
  components: { HeaderBar, TableComponent },
  directives: {
    autofocus: {
      mounted(el) {
        el.focus()
      },
    },
    validate: {
      mounted(el, binding) {
        if (binding.value) el.classList.add('input-error')
      },
      updated(el, binding) {
        binding.value ? el.classList.add('input-error') : el.classList.remove('input-error')
      },
    },
  },
  data() {
    return {
      newRestaurant: { name: '', cuisine: '', location: '' },
      cuisines,
      errors: { name: '', cuisine: '', location: '' },
    }
  },
  computed: {
    ...mapGetters('restaurants', ['restaurants', 'isLoading', 'errorMessage']),
    isFormValid() {
      return externalFormValid(this.newRestaurant, this.errors)
    },
  },
  methods: {
    ...mapActions('restaurants', ['fetchRestaurants', 'addRestaurant']),
    validateName() { this.errors.name = validateName(this.newRestaurant.name) },
    validateCuisine() { this.errors.cuisine = validateCuisine(this.newRestaurant.cuisine) },
    validateLocation() { this.errors.location = validateLocation(this.newRestaurant.location) },
    async addRestaurantHandler() {
      this.validateName()
      this.validateCuisine()
      this.validateLocation()
      if (!this.isFormValid) return

      try {
        await this.addRestaurant(this.newRestaurant)
        this.newRestaurant = { name: '', cuisine: '', location: '' }
        this.errors = { name: '', cuisine: '', location: '' }
        alert('Restaurant added successfully!')
      } catch (error) {
        console.error('Error adding restaurant:', error)
        alert('Failed to add restaurant. Please try again.')

      }
    },
    handleTableAction(payload) {
      console.log('Table action in Add page:', payload)
      alert('Table action performed on Add page!')
    },
  },
  mounted() {
    const user = localStorage.getItem('user-info')
    if (!user) this.$router.push('/signup')
    else this.fetchRestaurants()
  },
}
</script>

<style scoped src="../assets/styles/common.css"></style>
