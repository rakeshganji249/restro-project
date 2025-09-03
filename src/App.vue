<template>

<KeepAlive include="HomePage">
    <router-view />
  </KeepAlive>
<!-- <router-view></router-view> -->
</template>

<script setup>
import { provide, ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'


const user = ref(null)

onMounted(() => {
  const storedUser = localStorage.getItem('user-info')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

// provide user info globally
provide('currentUser', user)



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #553330;
  /* margin-top: 60px; */
  
}
.logo {
  width: 300px;
  display: block;
  margin: 0 auto;
}

.signup-form input, .login-form input {
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #f3b53b;
}
.signup-form button, .login-form button {
    width: 320px;
    height: 40px; 
    background-color: #f3b53b;
    color: white;
    border: 1px;
    cursor: pointer;
}
</style>
