<template>
  <HeaderBar />
  <Transition name="fade">
    <h1>Welcome to homepage</h1>
  </Transition>
  
  <!-- <HomeTab title="Hello from npm!" /> -->
  <!-- <private-home-tab title="Hello from private npm!" /> -->
  <!-- <AsyncInfo /> -->
  <TableComponent
    :items="restaurants"
    :headers="['Name', 'Cuisine', 'Location']"
    @table-action="handleTab+leAction"
  >
    <template v-slot:header>
      <th>Name</th>
      <th>Cuisine</th>
      <th>Location</th>
      <th>Actions</th>
    </template>
    <template v-slot:row="{ item }">
      <td>{{ item.name }}</td>
      <td>{{ item.cuisine }}</td>
      <td>{{ item.location }}</td>
      <td>
        <button @click="editRestaurant(item)" class="edit-btn">Edit</button>
         <button @click="deleteRestaurant(item)" class="delete-btn">Delete</button>

      </td>

    </template>
  </TableComponent>
</template>

<script>
import HeaderBar from './HeaderBar.vue';
import TableComponent from './TableComponent.vue';
import axios from 'axios';
// import HomeTab from 'vue-shared-tab';
// import PrivateHomeTab from "@rakeshganji249/vue-shared-tab";

export default {
  name: 'HomePage',
  components: {
    // AsyncInfo: () => import('./AsyncInfo.vue'),
    HeaderBar,
    TableComponent,
    // HomeTab,
    // PrivateHomeTab
  },
  data() {
    return {
      restaurants: [],
    };
  },
  methods: {
    async fetchRestaurants() {
      try {
        const response = await axios.get('http://localhost:3000/restaurants');
        this.restaurants = response.data;
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    },
    editRestaurant(item) {
      this.$router.push({ path: '/update', query: { id: item.id } });
    },
    deleteRestaurant(item) {
      if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        axios.delete(`http://localhost:3000/restaurants/${item.id}`)
          .then(() => {
            this.fetchRestaurants();
            alert('Restaurant deleted successfully!');
          })
          .catch(error => {
            console.error('Error deleting restaurant:', error);
            alert('Error deleting restaurant.');
          });
      }
    },
    handleTableAction(payload) {
      console.log('Table action triggered:', payload);
      alert('Table action performed!');
    },
  },
  
  beforeCreate() {
    console.log('beforeCreate → Instance is initializing, data not available yet.');
  },

  created() {
    console.log('created → Instance created, data is reactive now.');
    console.log('Message from data:', this.message);
  },

  beforeMount() {
    console.log('beforeMount → Template is compiled, about to mount.');
  },

  mounted() {
    console.log('mounted → Component mounted, DOM is available.');
    const user = localStorage.getItem('user-info');
    if (!user) {
      this.$router.push('/signup');
    } else {
      this.fetchRestaurants();
    }
    console.log('Root element:', this.$el);
  },

  beforeUpdate() {
    console.log('beforeUpdate → Data is about to change, DOM not patched yet.');
    console.log('Restaurants length before update:', this.restaurants.length);
  },

  updated() {
    console.log('updated → Data changed and DOM re-rendered.');
  },

  activated() {
    console.log('activated → keep-alive component is activated.');
    this.fetchRestaurants();
  },

  deactivated() {
    console.log('deactivated → keep-alive component is deactivated.');
  },

  beforeUnmount() {
    console.log('beforeUnmount → Component about to be unmounted.');
  },

  unmounted() {
    console.log('unmounted → Component unmounted.');
  },

  errorCaptured(err, vm, info) {
    console.error('errorCaptured → An error occurred:', err, 'Info:', info);
    return false; 
  },
};
</script>
<style>

.edit-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
}
.edit-btn:hover {
  background-color: #097a0f;
}
.delete-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: #cc0000;
}
</style>