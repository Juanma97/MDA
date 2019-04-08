<template>
  <div class="main-addproduct">
    <ToolbarComponent />
    <h3 style="margin-top: 64px">Nombre producto:</h3>
    <v-text-field></v-text-field>
    <h3>Descripcion producto:</h3>
    <v-text-field></v-text-field>
    <h3>Precio producto:</h3>
    <v-text-field></v-text-field>
    <h3>Cantidad:</h3>
<<<<<<< HEAD
    <v-text-field></v-text-field>
    <v-btn @click="uploadProduct">Subir producto</v-btn>
=======
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
>>>>>>> 45dea51fca5083b92771dde4e2dbe10bbb99b6f7
  </div>
</template>


<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import firebase from 'firebase';

export default {
  name: 'AddProduct',
  components: {
    ToolbarComponent,
  },
  data() {
    return {
      nameProduct: '',
    }
  },
  methods: {
    uploadProduct() {
      var ref = firebase.database().ref('/products')
      ref.push({
<<<<<<< HEAD

=======
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
>>>>>>> 45dea51fca5083b92771dde4e2dbe10bbb99b6f7
      })
    }
  }
}
</script>

<style scoped>
.main-addproduct{
  padding: 16px;
}
</style>


