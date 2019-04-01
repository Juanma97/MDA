<template>
  <div class="main-addproduct">
    <ToolbarComponent />
    <h3 style="margin-top: 64px">Nombre producto:</h3>
    <v-text-field
      v-model="nameProduct"
    ></v-text-field>
    <h3>Descripcion producto:</h3>
    <v-text-field
      v-model="descriptionProduct"
    ></v-text-field>
    <h3>Precio producto:</h3>
    <v-text-field
      v-model="priceProduct"
    ></v-text-field>
    <h3>Cantidad:</h3>
    <v-text-field
      v-model="quantityProduct"
    ></v-text-field>
    <UploadImages number="First" @downloadURL="saveFirstImage"/>
    <UploadImages number="Second" @downloadURL="saveSecondImage"/>
    <UploadImages number="Third" @downloadURL="saveThirdImage"/>
    <v-btn @click="uploadProduct">Subir producto</v-btn>
  </div>
</template>


<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import UploadImages from '@/components/UploadImages.vue';
import firebase from 'firebase';

export default {
  name: 'AddProduct',
  components: {
    ToolbarComponent,
    UploadImages,
  },
  data() {
    return {
      nameProduct: '',
      descriptionProduct: '',
      priceProduct: '',
      quantityProduct: '',
    }
  },
  methods: {
    uploadProduct() {
      var ref = firebase.database().ref('/products')
      ref.push({
        nameProduct: this.nameProduct,
        descriptionProduct: this.descriptionProduct,
        priceProduct: this.priceProduct,
        quantityProduct: this.quantityProduct,
        image1: this.image1,
        image2: this.image2,
        image3: this.image3,
      })
    },
    saveFirstImage(value){
      this.image1 = value
    },
    saveSecondImage(value){
      this.image2 = value
    },
    saveThirdImage(value){
      this.image3 = value
    },
  }
}
</script>

<style scoped>
.main-addproduct{
  padding: 16px;
}
</style>


