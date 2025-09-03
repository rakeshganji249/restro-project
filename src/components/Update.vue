<template>
  <HeaderBar />

  <div class="update-form">
    <div class="form-group">
      <select
        v-model="restaurant.name"
        @change="onRestaurantChange"
        :class="{ 'input-error': errors.name }"
        required
      >
        <option value="" disabled>Select Restaurant</option>
        <option v-for="rest in restaurants" :key="rest.id" :value="rest.name">
          {{ rest.name }}
        </option>
      </select>
      <p v-if="errors.name" class="error">{{ errors.name }}</p>
    </div>

    <div class="form-group">
      <select
        v-model="restaurant.cuisine"
        @change="validateCuisine"
        :class="{ 'input-error': errors.cuisine }"
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
        v-model="restaurant.location"
        placeholder="Location"
        @input="validateLocation"
        :class="{ 'input-error': errors.location }"
        required
      />
      <p v-if="errors.location" class="error">{{ errors.location }}</p>
    </div>

    <button @click="updateRestaurantHandler" :disabled="isLoading || !isFormValid">
      Update Restaurant
    </button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>

  <TableComponent
    :items="displayedRestaurants"
    :headers="['Name', 'Cuisine', 'Location']"
    @table-action="handleTableAction"
  />
</template>

<script>
import HeaderBar from './HeaderBar.vue';
import TableComponent from './TableComponent.vue';
import { mapGetters, mapActions } from 'vuex';
import {
  cuisines,
  validateName,
  validateCuisine,
  validateLocation,
  isFormValid as externalFormValid
} from '../utils/validators';

export default {
  name: 'UpdatePage',
  components: { HeaderBar, TableComponent },
  data() {
    return {
      restaurant: { name: '', cuisine: '', location: '', id: null },
      cuisines,
      errors: { name: '', cuisine: '', location: '' },
      showAll: false,
    };
  },
  props: ['id'],
  computed: {
    ...mapGetters('restaurants', ['restaurants', 'isLoading', 'errorMessage']),
    isFormValid() {
      return externalFormValid(this.restaurant, this.errors);
    },
    displayedRestaurants() {
      return this.showAll ? this.restaurants : this.restaurant.id ? [this.restaurant] : [];
    },
  },
  methods: {
    ...mapActions('restaurants', ['fetchRestaurants', 'updateRestaurant']),
    validateName() { this.errors.name = validateName(this.restaurant.name); },
    validateCuisine() { this.errors.cuisine = validateCuisine(this.restaurant.cuisine); },
    validateLocation() { this.errors.location = validateLocation(this.restaurant.location); },

    onRestaurantChange() {
      const selected = this.restaurants.find(r => r.name === this.restaurant.name);
      if (selected) this.restaurant = { ...selected };
    },

    async updateRestaurantHandler() {
      this.validateName();
      this.validateCuisine();
      this.validateLocation();
      if (!this.isFormValid) return;

      try {
        await this.updateRestaurant(this.restaurant);
        alert('Restaurant updated successfully!');
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Error updating restaurant:', error);
        alert('Failed to update restaurant.');
      }
    },

    handleTableAction(payload) {
      console.log('Table action in Update page:', payload);
      alert('Table action performed on Update page!');
    },
  },
  async mounted() {
  const user = localStorage.getItem('user-info');
  if (!user) {
    this.$router.push({ name: 'signup' });
    return;
  }

  await this.fetchRestaurants();

  const restaurantId = this.$route.query.id;

  if (restaurantId) {
    const selected = this.restaurants.find(r => r.id === restaurantId);
    if (selected) {
      this.restaurant = { ...selected };
    }
  } else {
    this.showAll = true;
  }
}

};
</script>

<style scoped src="../assets/styles/common.css"></style>
