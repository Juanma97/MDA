<template>
    <div style="position: relative; height: 100vh;">
    <ToolbarComponent />  
        <v-carousel height="400">
            <v-carousel-item
            :src="this.item.image1"
            reverse-transition="fade"
            transition="fade"
            ></v-carousel-item>
            <v-carousel-item
            :src="this.item.image2"
            reverse-transition="fade"
            transition="fade"
            ></v-carousel-item>
            <v-carousel-item
            :src="this.item.image3"
            reverse-transition="fade"
            transition="fade"
            ></v-carousel-item>
        </v-carousel>
        <table  border= "1" id="mitabla">
            <tr>
                <th class='text'>Name</th>
                <th class='text'>Price</th>
                <th class='text'>Quantity</th>
                <th class='text'>Description</th>
                <th class='text'>Seller</th>
            </tr>
            <tbody>
            <tr>
                <td>{{item.nameProduct}}</td>
                <td>{{item.priceProduct}}</td>
                <td>{{item.quantityProduct}}</td>
                <td>{{item.descriptionProduct}}</td>
                <td>{{nameSeller}}</td>
            </tr> 
            </tbody>

        </table>
        <div class="buy-btn">
            <v-btn outline @click="buyProduct(item)">Comprar producto</v-btn>
            <v-alert type="success" dismissible :value="buySuccessful">Producto comprado</v-alert>
            <v-alert type="error" dismissible :value="errorLogin">Tiene que registrarse para comprar</v-alert>
        </div>
    </div>
</template>

<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import * as firebase from 'firebase';
 
export default ({
    name: 'DetailsProducts',
     components: {
      ToolbarComponent,

    },
    created() {
        this.item = this.$route.params.item
        var ref = firebase.database().ref('/users/'+this.item.uid)
        ref.once('value', (snapshot) => {
            this.nameSeller = snapshot.val().name;
        })
    },
   data () {
    return {
       item: null,
       buySuccessful: false,
       errorLogin: false,
       nameSeller: '',
    }
  },
  methods: {
      buyProduct(item){
          if(firebase.auth().currentUser != null){
              var ref = firebase.database().ref('historial_compras/'+firebase.auth().currentUser.uid)
              ref.push(item)
              .then(() => {
                  this.buySuccessful = true;
              })
              .catch(() => {
                  this.errorLogin = true;
              })
          } else{
              this.errorLogin = true;
          }
      }
  }
 
})
</script>

<style >
    .buy-btn{
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .img1{
        margin-top:10%;
        height: 40%;
        width: 30%;
        margin-left: 45px;
    }
    table#mitabla {
    margin-top:20px;
    margin-right: 2px;
    margin-left:2px;
    
   
    border: 1px solid #CCC;
    font-size: 50px;
    width: 100%;
    
}
 
table#mitabla th {
    font-weight: bold;
    background-color: #E1E1E1;
}
 
table#mitabla td {
    text-align: center;
    padding: 5px 10px;

}  

</style>