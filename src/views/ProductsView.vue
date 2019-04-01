<template>
  <div class="main">
    <ToolbarComponent />

    <div class="flex-container">
        
    </div>
    <div class="grid-container">
      <div v-for="(item, index) in products" :key="index" class="item-grid">
          <img :src="item.image1" @click="goToDetailsProducts(item)">
          <h3>{{item.nameProduct}}</h3>
          <p>{{item.descriptionProduct}}</p>
      </div>
    </div>
  </div>

</template>

<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import * as firebase from 'firebase'

  export default {
    name: 'ProductsView',
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
        goToDetailsProducts(item){
            this.$router.push({name: 'detailsproducts', params: {item: item}})
        },
    },
    created() {
        console.log("Empiezo")
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
.main{
  background: white;
  height: 100%;
  overflow: scroll;
}
.v-btn{
  font-size: 18px;
}
.v-toolbar{
  float:none;
  text-align:center;
}
.flex-container{
  display:flex;
  margin-left:30px;
  margin-right: 30px;
  margin-bottom: 30px;
}
.grid-container{
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 8px;
  width: 100%;
  height: 100vh;
  padding: 16px;
}
.item-grid{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.item-grid:hover{
  cursor: pointer;
}

.item-grid img{
  height: 90%;
  width: 100%;
  border-radius: 8px;
  border: 1px solid black;
}

.item{
  width: 120px;
  height: 100%;
  flex: 1 1 auto;
  text-align: center;
}

.img{
  margin-top: 8%;
  margin-bottom: 4%;
  align-content: center;
  display:block;
  height: 60%;
  font-size: 48px;
  
}

@media only screen and (max-width: 700px) {
  .grid-container {
    grid-template-columns: auto auto;
  }
}

@media only screen and (max-width: 500px) {
  .grid-container {
    grid-template-columns: auto;
  }
}
.text{
  font-size:22px;
  background-color: #00D4FF;
  border-radius: 25px;
  padding:20px;
  background-image: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png');

}
::placeholder{
  color:red;
}
.bt{
  font-size:22px;
  border: 1px solid lightblue;
  width: 150px;
  height: 73px;
  color: black;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-seeker{
  width: 100%;
  display: flex;
  justify-content: center;
}
.seeker{
  display: flex;
  width: 50%;
  justify-content: center;
}

.seeker_input{
  width: 50% !important;
}

</style>