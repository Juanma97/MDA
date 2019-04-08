import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';
import Vuetify from 'vuetify';



 // Initialize Firebase
 const config = {
  apiKey: "AIzaSyDyFjixJxxSNBmXqusJ8COmkju2pG8NB5I",
  authDomain: "practica-mda.firebaseapp.com",
  databaseURL: "https://practica-mda.firebaseio.com",
  projectId: "practica-mda",
  storageBucket: "practica-mda.appspot.com",
  messagingSenderId: "943532623760"
};

const appDB = firebase.initializeApp(config);

export const db = appDB.database();

Vue.use(Vuetify);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

 
