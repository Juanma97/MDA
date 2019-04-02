<template>
  <div>
    <v-toolbar fixed color="#3498db">
      <v-btn @click="goHome" fab flat >
        <v-icon medium dark>menu</v-icon>
      </v-btn>
      <v-toolbar-items v-if="isRegister">
        <v-btn flat dark @click="goToAddProductPage">Add product</v-btn>  
      </v-toolbar-items>
      <v-spacer></v-spacer>
    
      <v-toolbar-items>
        <v-btn v-if="!isRegister" flat dark @click="gotoDetails">Details</v-btn>
        <v-btn v-if="!isRegister" flat dark @click="goToLogin">Access</v-btn>
        <v-btn v-if="isRegister" flat dark>Perfil</v-btn>
        <v-btn v-if="isRegister" flat dark @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return{
      isRegister: false,
    }
  },
  created() {
    if (firebase.auth().currentUser != null){
      this.isRegister = true;
    }else{
      this.isRegister = false;
    }
  },
  methods: {
    goToLogin() {
      this.$router.replace('login')
    },goHome() {
      this.$router.replace('/')
    },
    goToAddProductPage() {
      this.$router.replace('addproduct')
    },
    gotoDetails(){
        this.$router.replace('detailsproducts')
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$router.replace('/')
      })
    }
  }
}
</script>
