<template>
  <div class="main">
    <ToolbarComponent />
    <v-icon large @click="goBack">keyboard_arrow_left</v-icon>
    <div class="products">
      <div class="product" v-for="product in products" :key="product">
        <img :src="product.image1" @click="goToDetailsProducts(product)">
        <h3>{{product.nameProduct}}</h3>
        <p>{{product.descriptionProduct}}</p>
        <p>{{product.priceProduct}} €</p>
        <p v-if="parseInt(product.quantityProduct) > 1">{{product.quantityProduct}} units</p>
        <p v-if="parseInt(product.quantityProduct) == 1">{{product.quantityProduct}} unit</p>
      </div>
    </div>
  </div>
</template>


<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';

export default {
  name: 'CategoryDetails',
  components: {
    ToolbarComponent,
  },
  data() {
    return {
      products: [],
    }
  },
  created() {
    this.products = this.$route.params.products;
    console.log("Products: ", this.products)
  },
  methods:{
    goBack() {
      this.$router.replace('/categoryview');
    }
  }
}
</script>

<style scoped>
.products{
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 16px;
  width: 100%;
  height: 100%;
  margin-top: 5%;
  padding: 32px;
}
.product{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4px;
  border: 1px solid black;
  border-radius: 4px;
}
.product img{
  max-height: 150px;
  max-width: 100%;
}
.main{
  position: absolute;
  width: 100%;
  height: 100%;
}
.v-icon{
  position: relative;
  top: 86px;
  left: 32px;
  color: black;
}
</style>
