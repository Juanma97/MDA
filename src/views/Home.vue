<template>
  <div class="main">
    <v-toolbar extended extension-height=4 color="#00D4FF">
      <v-btn @click="goHome" fab flat >
        <v-icon x-large dark>home</v-icon>
      </v-btn>
      <v-toolbar-items>

        <v-btn flat  dark >Products</v-btn>  

      </v-toolbar-items>

      <v-spacer></v-spacer>
    
      <v-toolbar-items>

        <v-btn flat dark >Sing Up</v-btn>
        <v-btn flat dark @click="goToLogIn">Sing In</v-btn>

      </v-toolbar-items>

    </v-toolbar>


    <div class="flex-container">
      <div class="item">

        <div class=img> 

          <img src="https://d3icht40s6fxmd.cloudfront.net/sites/default/files/test-product-test.png" alt="Test">

        </div> 
        <div>

          <input class=text placeholder="Buscador..." type="text" name="producto" size=40 >   

        </div>
        <div>
          <v-btn class="bt" large outline button round color="#00D4FF"  > 
            Search
          </v-btn>
        </div>
    
    
      </div>   
    </div>
    <div class="responsive" >
      <div class="gallery">
        
          <img src="https://nordestcycles.com/wp-content/uploads/2018/11/Bici-Albarda-ti-03.png" alt="Bici" width="600" height="400">

          <div class="desc">BiciToWuapa</div>
      </div>
    </div>
    <div class="responsive" >
      <div class="gallery">
        
          <img src="https://www.promusica.es/90788-large_default/roland-go-piano-61-teclas.jpg" alt="Piano" width="600" height="400">
          
          <div class="desc">PianoToWuapo</div>
      </div>
    </div>
    <div class="responsive" >
      <div class="gallery">
        
          <img src="https://images-na.ssl-images-amazon.com/images/I/81O-SzinvoL._SX355_.jpg" alt="Teclado" width="600" height="400">
          
          <div class="desc">TecladoToWuapo</div>
      </div>
    </div>
    <div class="responsive" >
      <div class="gallery">
        
          <img src="https://www.worten.es/i/1dad1fa9e426d71c78d058d375e6df1421569090.jpg" alt="Portatil" width="600" height="400">
          
          <div class="desc">PortatilToWapo</div>
      </div>
    </div>
    
        
  
  </div>

</template>

<script>

  export default {
    components: {
    },
    methods: {
      goToLogIn() {
        this.$router.replace('login')
      },goHome() {
        this.$router.replace('/')
      }
    }
  }
  
</script>


<style scoped>
.main{
  
  background:#3498db; 
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


.item{
  
  width: 120px;
  height: 100%;
  flex: 1 1 auto;
  text-align: center;
  
}

.img{
 
  align-content: center;
  display:block;
  height: 60%;
  
}

div.gallery {
  border: 1px solid #ccc;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
  font-size: 22px;
}



.responsive {
  padding: 0 6px;
  float: left;
  width: 25%;
}

@media only screen and (max-width: 700px) {
  .responsive {
    width: 50%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 500px) {
  .responsive {
    width: 100%;
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
  

}

</style>