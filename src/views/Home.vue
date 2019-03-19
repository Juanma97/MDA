<template>
  <div class="main">
    <v-toolbar extended extension-height=4 color="#3498db">
    <v-btn  fab flat >
      <v-icon x-large dark>home</v-icon>
    </v-btn>
    <v-toolbar-items>
      
        <v-btn flat  dark >Products</v-btn>
             
    </v-toolbar-items>

    <v-spacer></v-spacer>
    
    <v-toolbar-items>
      <v-btn flat dark >Sing Up</v-btn>
      <v-btn flat dark >Sing In</v-btn>
    </v-toolbar-items>

  </v-toolbar>
<div class="grid-container">
  <div class="item">
    <div class=img></div> 
    <div class=text><input type="text" name="producto" size=40><br></div>
    <div class=bt>
      <v-btn flat  dark >Products</v-btn>
    </div>
  </div>
  
</div>

  </div>
</template>

<script>

  export default {
    components: {
    }
  }
</script>


<style scoped>
.v-btn{
  font-size: 18px;
}
.v-toolbar{
  float:none;
  text-align:center;
}
.grid-container{
  display:grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-gap: 10px;
  padding: 10px;

}
.grid-container > div {
  text-align:center;
  padding: 20px 0;
  font-size:30px
}
.item{
  background: gray;
  width: 100%;
  height: 100%;
}

.img{
  src:"http://techexengineers.com/wp-content/uploads/2018/07/Testing.jpg";
  width: 50%;
  height: 50%;

}
</style>