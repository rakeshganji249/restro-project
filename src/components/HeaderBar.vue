<template>
  <div class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/add">Add Restaurant</router-link>
    <router-link to="/update">Update Restaurant</router-link>
    <a v-on:click="logout" href="#">Logout</a>

    <!-- Profile section -->
    <div class="profile-section">
      <span v-if="currentUser" class="welcome">Welcome, {{ userName }}</span>
      <router-link to="/profile" class="profile-icon">
        <i class="fas fa-user-circle"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUser = inject('currentUser')
const userName = currentUser?.value?.[0]?.name || 'Guest'

if (!currentUser?.value) {
  router.push('/signup')
}

function logout() {
  localStorage.clear()
  router.push('/login')
}
</script>

<style>
.nav {
  background-color: #f3b53b;
  overflow: hidden;
  padding: auto;
}

.nav .router-link-exact-active {
  background-color: #553330;
  color: white;
  font-weight: bold;
}

.nav a {
  text-align: center;
  float: left;
  text-decoration: none;
  color: #553330;
  padding: 14px 16px;
}

.nav a:hover {
  background-color: #553330;
  color: #ddd;
}

.nav .profile-section {
  float: right;
  display: flex;
  align-items: center;
  height: 46px;
}

.nav .welcome {
  margin-right: 10px;
  color: #553330;
}

.nav .profile-icon {
  font-size: 24px;
  color: #553330;
  text-decoration: none;
}

.nav .profile-icon:hover {
  color: #fff;
}
</style>
