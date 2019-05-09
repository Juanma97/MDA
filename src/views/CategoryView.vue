<template>
  <div class="main">
    <ToolbarComponent />
    <div class="content">
      <div class="content-category" v-for="category in categories" :key="category">
        <div class="category">
          <p>{{category}}</p>
          <v-icon large @click="showProducts(category)">keyboard_arrow_right</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import * as firebase from 'firebase';

export default {
  name: 'CategoryView',
  components: {
    ToolbarComponent,
  },
  data() {
    return{
      categories: ['Ropa', 'Accesorios', 'Transporte', 'Tecnologia', 'Otros'],
      products: [],
    }
  },
  methods: {
    showProducts(category){
      this.products = [];
      var ref = firebase.database().ref('/products')
      ref.once('value', (snapshot) => {
        snapshot.forEach((child) => {
          if(child.val().category == category){
            this.products.push(child.val())
          }
        })
      }).then(() => {
        this.$router.push({ name: "CategoryDetails", params: { products: this.products } });
      }) 
    }
  }
}
</script>


<style scoped>
.content{
  margin-top: 5%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-category{
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.category{
  margin-top: 32px;
  width: 90%;
  height: 150px;
  border-left: 4px solid #3498db;
  border-radius: 8px;
  display: flex;
  padding: 32px;
  align-items: center;
  background: lightgray;
}
.category p{
  flex-grow: 1;
  font-size: 32px;
  letter-spacing: 14px;
}
.products{
  letter-spacing: 0px;
  width: 150px;
  height: 150px;
}
.content-products{
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 16px;
}
.v-icon:hover{
  cursor: pointer;
}
</style>
