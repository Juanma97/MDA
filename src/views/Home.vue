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
<div>

  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-car dark>
          <v-car-tex>12</v-car-tex>
        </v-car>
      </v-flex>
    </v-layout>
  </v-container>
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

</style>