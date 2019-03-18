<template>
  <div class="main">
    <div class="container-login">

      <v-card v-if="!showRegisterForm">
        <v-text-field
          v-model="email"
          placeholder="email@email.com"
          append-icon="email"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          placeholder="password"
          append-icon="lock"
          type="password"
        ></v-text-field>
        <v-btn @click="login">
          Login
        </v-btn>
        <v-btn @click="showRegisterForm = !showRegisterForm" outline>Register</v-btn>
      </v-card>

      <v-card v-if="showRegisterForm">
        <v-text-field
          v-model="email"
          placeholder="email@email.com"
          append-icon="email"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          placeholder="password"
          append-icon="lock"
          type="password"
        ></v-text-field>
        <v-text-field
          placeholder="repeat password"
          append-icon="lock"
          type="password"
        ></v-text-field>
        <v-btn @click="register">
          Register
        </v-btn>
        <v-btn @click="showRegisterForm = !showRegisterForm" outline>Login</v-btn>
      </v-card>

    </div>
  </div>
</template>


<script>
import * as firebase from 'firebase';

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      showRegisterForm: false,
    }
  },
  methods: {
    login (){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        alert("Logueado")
      })
      .catch((error) => {
        alert("Jajajajajaj")
      })
    },
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((result) => {
        alert("usuario creado")
      })
      .catch((error) => {
        alert("usuario no creado")
        console.log("Error: " + error)
      })
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3498db;
}

.container-login{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
}

.v-card{
  height: 100%;
  width: 100%;
  padding: 16px;
}

</style>


