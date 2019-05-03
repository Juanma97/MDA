<template>
  <div class="main">
    <ToolbarComponent/>

    <div class="flex-container">
      <div class="item">
        <div class="img">
          <!--<img src="https://d3icht40s6fxmd.cloudfront.net/sites/default/files/test-product-test.png" alt="Test">-->
          <h3>EASYBUY</h3>
        </div>
        <div class="container-seeker">
          <div class="seeker">
            <v-text-field
              class="seeker_input"
              append-icon="search"
              v-model="search"
              @keyup="updateProducts()"
            ></v-text-field>
          </div>
        </div>
      </div>
    </div>

    <div class="text-xs-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Filtros</v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in filters" :key="index" @click="filtered(item)">
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>

    <div class="text-xs-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Ordernar por:</v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in orders" :key="index" @click="orderBy(item)">
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>

    <div class="flex-container"></div>
    <div class="grid-container">
      <div v-for="(item, index) in searchP" :key="index" class="item-grid">
        <img :src="item.image1" @click="goToDetailsProducts(item)">
        <h3>{{item.nameProduct}}</h3>
        <p>{{item.descriptionProduct}}</p>
        <p>{{item.priceProduct}} €</p>
        <p v-if="parseInt(item.quantityProduct) > 1">{{item.quantityProduct}} units</p>
        <p v-if="parseInt(item.quantityProduct) == 1">{{item.quantityProduct}} unit</p>
      </div>
    </div>
  </div>
</template>

<script>
import ToolbarComponent from "@/components/ToolbarComponent.vue";
import * as firebase from "firebase";
import { log } from 'util';

export default {
  name: "ProductsView",
  data() {
    return {
      value: true,
      products: [],
      search: "",
      searchP: [],
      filters: ['Todos', 'Ropa', 'Accesorios', 'Transporte', 'Tecnologia', 'Otros'],
      orders: [
        {name: "más barato", order: "inexpensive"},
        {name: "más caro", order: "expensive"}      
      ]
    };
  },
  components: {
    ToolbarComponent
  },
  methods: {
    updateProducts() {
      this.searchP = this.products.filter(e => {
        return e.nameProduct.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    goToDetailsProducts(item) {
      this.$router.push({ name: "DetailsProducts", params: { item: item } });
    },
    filtered(item) {
      if(item == 'Todos') {
        this.searchP = this.products;
      } else {
        this.searchP = this.products.filter(e => {
        return e.category == item;
        });
      }
    },
    orderBy(item){
      if(item.order == "inexpensive") {
        this.searchP = this.searchP.sort((e1,e2) => {
          if(Number(e1.priceProduct) < Number(e2.priceProduct)) return -1;
          if(Number(e1.priceProduct) > Number(e2.priceProduct)) return 1;
          return 0;
        });
      } else if(item.order == "expensive") {
        this.searchP = this.searchP.sort((e1,e2) => {
          if(Number(e1.priceProduct) < Number(e2.priceProduct)) return -1;
          if(Number(e1.priceProduct) > Number(e2.priceProduct)) return 1;
          return 0;
        });
        this.searchP.reverse();
      }

    }
  },
  created() {
    
    var ref = firebase.database().ref("/products");
    ref.once("value", snapshot => {
      snapshot.forEach(child => {
        this.products.push(child.val());
        this.searchP.push(child.val());
        
      });
    });
  }
};
</script>


<style scoped>
.main {
  background: white;
  height: 100%;
  overflow: scroll;
}
.v-btn {
  font-size: 18px;
}
.v-toolbar {
  float: none;
  text-align: center;
}
.flex-container {
  display: flex;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 8px;
  width: 100%;
  height: 100vh;
  padding: 16px;
  margin-top: 7%;
}
.item-grid {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.item-grid:hover {
  cursor: pointer;
}

.item-grid img {
  height: 90%;
  width: 100%;
  border-radius: 8px;
  border: 1px solid black;
}

.item {
  width: 120px;
  height: 100%;
  flex: 1 1 auto;
  text-align: center;
}

.img {
  margin-top: 8%;
  margin-bottom: 4%;
  align-content: center;
  display: block;
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
.text {
  font-size: 22px;
  background-color: #00d4ff;
  border-radius: 25px;
  padding: 20px;
  background-image: url("https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png");
}
::placeholder {
  color: red;
}
.bt {
  font-size: 22px;
  border: 1px solid lightblue;
  width: 150px;
  height: 73px;
  color: black;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-seeker {
  width: 100%;
  display: flex;
  justify-content: center;
}
.seeker {
  display: flex;
  width: 50%;
  justify-content: center;
}

.seeker_input {
  width: 50% !important;
}
p {
  margin: 0;
}
</style>