<template>
  <div>
    <h2>Update Profile</h2>
    <form @submit.prevent="updateProfile">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: null,
      email: "",
      password: "",
    };
  },
  mounted() {
    let storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      let user = JSON.parse(storedUser)[0];
      this.id = user.id;
      this.email = user.email;
      this.password = user.password;
    }
  },
  methods: {
    async updateProfile() {
      let result = await axios.put(`http://localhost:3000/users/${this.id}`, {
        email: this.email,
        password: this.password,
      });

      if (result.status === 200) {
        alert("Details updated successfully!");
        localStorage.setItem("user-info", JSON.stringify([result.data]));
        this.$router.push("/profile"); // back to profile
      } else {
        alert("Error updating details.");
      }
    },
  },
};
</script>
