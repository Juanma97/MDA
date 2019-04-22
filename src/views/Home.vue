<template>
  <div class="main">
    <ToolbarComponent />

    <div class="flex-container">
      <div class="item">
        <div class=img> 
          <!--<img src="https://d3icht40s6fxmd.cloudfront.net/sites/default/files/test-product-test.png" alt="Test">-->
          <h3>EASYBUY</h3>
        </div>
        <div class="container-seeker">
          <div class="seeker">
            <v-text-field class="seeker_input"
              append-icon="search">
            </v-text-field>
          </div>
        </div>
      </div>   
    </div>
    <div class="grid-container">
      <div v-for="item in 10" :key="item" class="item-grid">
          <img src="https://nordestcycles.com/wp-content/uploads/2018/11/Bici-Albarda-ti-03.png" alt="Bici">
          <h3>Titulo de producto</h3>
          <p>Descripcion de producto</p>
      </div>
    </div>
  </div>

</template>

<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';

  export default {
    data() {
      return{
        value: true,
      }
    },
    components: {
      ToolbarComponent,
    },
    methods: {
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
  grid-template-columns: auto auto auto;
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