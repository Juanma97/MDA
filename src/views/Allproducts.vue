<template>

<div class = "main">
<ToolbarComponent />
<div  class="container">
      <div class="product" v-for="(item,index) in products" :key="index">
        <div class="proc">
          <img class="img" :src="item.image1" @click="goToDetailsProducts(item)">
          <div>{{item.nameProduct}}</div>
        </div>
        <div class="buttons">
          <v-btn flat @click="eliminate(item)">Delete</v-btn>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import * as firebase from 'firebase'
  
  export default {
    name: 'Profile',
    data() {
      return{
        value: true,
        products: [],
 
        
      }
    },
    components: {
      ToolbarComponent,
    },
    methods: {
      
        eliminate(item){
          var ref = firebase.database().ref('/products');

          ref.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                if(child.val().nameProduct ==  item.nameProduct) {
                this.deleteItem(child.key, item);
                this.$router.replace('Allproducts');
                }
              })
            })
          },
        
        deleteItem (key, item) {
         if(confirm("Are you sure you want to remove this product?")){
           firebase.database().ref('/products/'+ key).remove()
            .then(() => {
              alert("Producto eliminado correctamente");
              var index = this.products.indexOf(item);
              this.products.splice(index, 1);
            })
         }
          
        },
        goToAddProductPage() {
          this.$router.replace('addproduct')
        },
        goToDetailsProducts(item){
            this.$router.push({name: 'DetailsProducts', params: {item: item}})
        },
        
    },
    created() {
        //console.log("Empiezo")
        var ref = firebase.database().ref('/products')
        ref.once('value',(snapshot) => {
            snapshot.forEach((child)=>{
                this.products.push(child.val())
            })
        })
    }
  }
</script>
<style scoped>
.img {
  height: 115px;
  width: 225px;
}

.product {
  border-bottom: 1px solid black;
  width: 100%;
  height: 150px;
  margin-top: 10px;
  display: flex;
}
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top:6%;

}

</style>