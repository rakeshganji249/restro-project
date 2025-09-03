<template>
        <img class="logo" alt="Vue logo" src="../assets/restro-logo.png">
        <h1>Login</h1>
    <div class="login-form">
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit" v-on:click="login">Login</button>
            <p>
                <router-link to="/signup">Don't have an account? Sign Up</router-link>
            </p>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    data() {
        return {
            email:"",
            password:""
        }
    },
    methods:{
       async login(){
            let result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
            console.warn(result)
            if (result.status === 200 && result.data.length > 0) {
                alert('User logged in successfully!')
                localStorage.setItem('user-info', JSON.stringify(result.data));
                this.$router.push("/"); 
            } else {
                alert('Error logging in user.')
            }



        }
    },
    mounted() {
        let user = localStorage.getItem('user-info')
        if (user) {
            this.$router.push("/")
        }
    },
}
</script>
<style></style>