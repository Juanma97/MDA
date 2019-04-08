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
    <v-text-field></v-text-field>
    <v-btn @click="uploadProduct">Subir producto</v-btn>
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


