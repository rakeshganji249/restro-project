<template>
    <HeaderBar />
  <div>
    <h1>User Profile</h1>
    <div v-if="user">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Password:</strong> {{ user.password }}</p> <!-- avoid showing password in real app -->
      <button @click="$router.push('/profile/updatedetails')">Update Details</button>
    </div>
    <div v-else>
      <p>No user logged in.</p>
      <router-link to="/login">Go to Login</router-link>
    </div>

    <!-- Nested route outlet -->
    <router-view />
  </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue';

export default {

  data() {
    return {
      user: null,
    };
  },
  components: { HeaderBar },
  mounted() {
    let storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      this.user = JSON.parse(storedUser)[0]; // since you stored result.data (array)
    }
  },
};
</script>
