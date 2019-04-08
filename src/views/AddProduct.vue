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
    <div class="images">
      <UploadImages number="First" @downloadURL="saveFirstImage"/>
      <UploadImages number="Second" @downloadURL="saveSecondImage"/>
      <UploadImages number="Third" @downloadURL="saveThirdImage"/>
    </div>
    <v-btn outline @click="uploadProduct">Subir producto</v-btn>
    <v-progress-circular v-if="uploading" height=8 indeterminate></v-progress-circular>
    <v-alert
      :value="uploadSuccessfull"
      type="success"
      dismissible
    >
      Product upload!
    </v-alert>
    <v-alert
      :value="uploadFail"
      type="warning"
      dismissible
    >
      Error!
    </v-alert>
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
      priceProduct: '',
      quantityProduct: '',
      descriptionProduct: '',
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
        uid: firebase.auth().currentUser.uid,
        image1: this.image1,
        image2: this.image2,
        image3: this.image3,
      }).then(() => {
        this.uploadSuccessfull = true;
        this.uploading = false;
      }).catch(() => {
        this.uploadFail = true;
        this.uploading = false;
      })
    }
  }
}
</script>

<style scoped>
.main-addproduct{
  padding: 16px;
}
.images{
  display: flex;
}
</style>


