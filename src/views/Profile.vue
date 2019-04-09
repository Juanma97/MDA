<template>
  <div class="main">
    <ToolbarComponent />

    <v-toolbar class="toolbar2" color="#3498db">

      <v-toolbar-items >
        <v-btn flat dark @click="show(1)">My products</v-btn>
        <v-btn flat dark @click="show(2)" >My sells</v-btn>
        <v-btn flat dark @click="show(3)">History</v-btn>
        
      </v-toolbar-items>

    </v-toolbar>

    <div v-if="this.showProducts" class="container">
      <div class="product" v-for="(item,index) in products" :key="index">
        <div class="proc">
          <img class="img" :src="item.image1" @click="goToDetailsProducts(item)">
          <div>{{item.nameProduct}}</div>
        </div>
        <div class="buttons">
          <v-btn flat >Modify</v-btn>
          <v-btn flat >Delete</v-btn>
        </div>
      </div>
    </div>


    <div v-if="this.showHistory" class="container">
      <div class="transactions" v-for="(item,index) in history" :key="index">
        <div class="transaction">
          <div>Seller by: {{item.nameSeller}} {{item.lastname}}</div>
          <div>Product: {{item.item.nameProduct}}</div>
          <div>Price: {{item.item.priceProduct}}€</div>
          <div>Send to: {{item.direction}}</div>
          <div>Delivered to: {{item.name}}</div>
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
        user: "",
        showProducts: true,
        showSellProducts: false,
        showHistory: false,
        history: [],
        
      }
    },
    components: {
      ToolbarComponent,
    },
    methods: {
        goToDetailsProducts(item){
            this.$router.push({name: 'DetailsProducts', params: {item: item}})
        },
        show(navNumber) {
          
          this.showProducts = false
          this.showSellProducts = false
          this.showHistory = false

          if(navNumber == 1) {
            this.showProducts = true
          } else if(navNumber == 2) {
            this.showSellProducts = true
          } else if(navNumber == 3) {
            this.showHistory = true
          }
        },
    },
    created() {
        var ref = firebase.database().ref('/products')
        this.user=firebase.auth().currentUser.uid
        ref.once('value',(snapshot) => {
            snapshot.forEach((child)=>{
              if (child.val().uid == this.user) {
                this.products.push(child.val())
              }
                
            })
        })
        var refHistory = firebase.database().ref('/historial_compras/'+firebase.auth().currentUser.uid)
        refHistory.once('value',(snapshot) => {
            snapshot.forEach((child)=>{
              this.history.push(child.val())
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

.transactions{
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

}

.proc {
  flex-grow: 1;
  display: flex;
  height: 100%;
}
.proc div{
  padding-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 25px;
  
}

.transaction {
  flex-grow: 1;
  display: flex;
  height: 100%;
}

.transaction div {
  padding-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 25px;
}

.buttons {
  display: flex;
  height: 100%;
  align-items: center;
}


.main{
  background: white;
  height: 100%;
  overflow: scroll;
}
.v-btn{
  font-size: 18px;
}
.toolbar2.v-toolbar{
  margin-top: 65px !important;
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
  margin-top: 7%;
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
p{
  margin: 0;
}

</style>