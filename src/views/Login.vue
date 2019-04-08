<template>
  <div class="main">
    <v-icon @click="goToMainScreen" color="white">arrow_back</v-icon> 
    <div class="container-login">

      <img src="../assets/login.png" />
      <p class="title-form" v-if="!showRegisterForm">Sign in</p>
      <p class="title-form" v-if="showRegisterForm">Sign up</p>

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
        <v-btn outline color="#3498db" @click="login">
          Login
        </v-btn>
        <p @click="showRegisterForm = !showRegisterForm">Don't have a account?</p>
      </v-card>

      <v-card v-if="showRegisterForm">
        <v-text-field
          v-model="name"
          placeholder="name"
          append-icon="face"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="lastname"
          placeholder="lastname"
          append-icon="face"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="email"
          placeholder="email@email.com"
          append-icon="email"
          type="email"
        ></v-text-field>
        <v-text-field 
          v-model="password"  
          placeholder="password"
          :append-icon="visible ? 'visibility_off' : 'visibility'"
          @click:append="() => (visible = !visible)"
          :type="visible ? 'text' : 'password'"
          counter="6"
        ></v-text-field>
        <v-text-field 
          v-model="repeat_password"  
          placeholder="repeat password"
          :append-icon="visible_repeat ? 'visibility_off' : 'visibility'"
          @click:append="() => (visible_repeat = !visible_repeat)"
          :type="visible_repeat ? 'text' : 'password'"
          counter="6"
        ></v-text-field>
        <v-btn color="#3498db" outline @click="register">
          Register
        </v-btn>
        <p @click="showRegisterForm = !showRegisterForm">Already have a account?</p>
      </v-card>
      <v-alert
        :value="error"
        type="error"
        dismissible
      >
        User not created!
      </v-alert>
      <v-alert
        :value="errorLogin"
        type="error"
        dismissible
      >
        Login error!
      </v-alert>
      <v-alert
        :value="errorPasswords"
        type="error"
        dismissible
      >
        Passwords are not equal!
      </v-alert>
      <v-alert
        :value="errorFields"
        type="error"
        dismissible
      >
        Check fields!
      </v-alert>
    </div>
    <div class="footer">
      <p>About us</p>
      <p>Our clients</p>
      <p>Why select this enterprise?</p>
      <p class="copyright">Copyright 2019</p>
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
      repeat_password: '',
      name: '',
      lastname: '',
      showRegisterForm: false,
      visible: false,
      visible_repeat: false,
      error: false,
      errorPasswords: false,
      errorLogin: false,
      errorFields: false,
    }
  },
  methods: {
    goToMainScreen(){
      this.$router.replace('/');
    },
    login (){
      if(this.checkFieldsLogin()){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          this.$router.replace('/')
        })
        .catch((error) => {
          this.errorLogin = true;
        })
      }else{
        this.errorFields = true;
      }
    },
    register () {
      if(this.checkFieldsRegister()){
        if(this.checkPasswords()){
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((result) => {
            this.$router.replace('/')
            this.saveDataUser(result.user.uid);
          })
          .catch((error) => {
            this.error = true;
          })
        }else{
          this.errorPasswords = true;
        }
      }else{
        this.errorFields = true;
      }
    },
    checkPasswords(){
      return this.password == this.repeat_password;
    },
    checkFieldsRegister(){
      return !(this.name === "" || this.lastname === "" || 
              this.email === "" || this.password === "" || this.repeat_password === "")
    },
    checkFieldsLogin(){
      return !(this.email === "" || this.password === "")
    },
    saveDataUser(uid){
      var ref = firebase.database().ref('/users').child(uid)
      ref.set({
        name: this.name,
        lastname: this.lastname,
        email: this.email,
      })
      .then(() => {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #3498db;
  position: relative;
}
.footer{
  border-top: 1px solid white;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.footer p{
  margin: 16px !important;
  transition: 400ms;
}

.footer p:hover{
  font-size: 18px;
  color: white;
}
.v-icon{
 position: absolute;
 left: 16px;
 top: 16px;
 font-size: 48px;
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

p{
  margin: 16px 0;
  text-align: center;
}

p:hover{
  cursor: pointer;
}

.v-btn{
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  justify-self: center;
}


.title-form{
  font-size: 24px;
  color: white;
}

img{
  width: 50px;
  height: 60px;
}

.v-alert{
  width: 100%;
}
</style>


