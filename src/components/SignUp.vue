<template>
    <img class="logo" alt="Vue logo" src="../assets/restro-logo.png">
    <h1>Sign Up</h1>
    <div class="signup-form">
        <input type="text" v-model="username" placeholder="Enter Username" />
        <input type="email" v-model="email" placeholder="Enter Email" />
        <input type="password" v-model="password" placeholder="Enter Password" />
        <button v-on:click="signUp">Sign up</button>
        <p>
        <RouterLink to="/login">Already have an account? Login</RouterLink>
        </p>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
       async  signUp() {
            let result = await axios.post('http://localhost:3000/users', {
                name: this.username,
                email: this.email,
                password: this.password
            });
            if (result.status === 201) {
                alert('User signed up successfully!')
                localStorage.setItem('user-info', JSON.stringify(result.data));
                this.$router.push("/"); 
            } else {
                alert('Error signing up user.')
            }
        }
       
      
    }, 
    mounted() {
            const user = localStorage.getItem('user-info')
            if (user) {
                this.$router.push("/")
            }
        }
}
</script>

<style>


</style>