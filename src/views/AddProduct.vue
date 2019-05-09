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
    <h3>Categoría:</h3>
    <v-select
          v-model="category"
          :items="items"
          label="Categoria"
          persistent-hint
          single-line
        ></v-select>
    <h3>Cantidad:</h3>
    <v-text-field
      v-model="quantityProduct"
    ></v-text-field>
    <h3>¿Trueque?</h3>
    <v-checkbox
    v-model="trueque"
    >Trueque
    </v-checkbox>
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
    <div><FooterComponent /></div>
  </div>
</template>


<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import UploadImages from '@/components/UploadImages.vue';
import firebase from 'firebase';
import { setTimeout } from 'timers';

export default {
  name: 'AddProduct',
  components: {
    ToolbarComponent,
    UploadImages,
    FooterComponent,
  },
  data() {
    return {
      nameProduct: '',
      descriptionProduct: '',
      priceProduct: '',
      quantityProduct: '',
      category: '',
      uploading: false,
      uploadSuccessfull: false,
      uploadFail: false,
      trueque: false,
      items: ['Ropa', 'Accesorios', 'Transporte', 'Tecnologia', 'Otros']
    }
  },
  methods: {
    uploadProduct() {
      this.uploading = true;
      var ref = firebase.database().ref('/products')
      var key = ref.push({
        nameProduct: this.nameProduct,
        descriptionProduct: this.descriptionProduct,
        priceProduct: this.priceProduct,
        quantityProduct: this.quantityProduct,
        uid: firebase.auth().currentUser.uid,
        image1: this.image1,
        image2: this.image2,
        image3: this.image3,
        category: this.category,
        trueque: this.trueque,
      }).key;
      var newRef = firebase.database().ref('/products/'+key)
      newRef.update({
        id: key,
      })
      .then(() => {
        this.uploadSuccessfull = true;
        this.uploading = false;
      }).catch(() => {
        this.uploadFail = true;
        this.uploading = false;
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
  position: relative;
  height: 100%;
}
.images{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  width: 100%;
  border: 1px solid black;
}
.images img{
  height: 50px;
  width: 50px;
}
.v-btn{
  width: 100%;
  color: #3498db;
}
.v-progress-circular{
  position: absolute;
  top: 50%;
  left: 50%;
  color: #3498db;
  z-index: 2;
}
.gray{
  position: absolute;
  top: 9%;
  left: 0;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  background: grey;
  z-index: 1;
}
.v-alert{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
</style>


