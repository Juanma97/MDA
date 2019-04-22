!<template>
    <div class="main">
       <ToolbarComponent />
      
       <div id="marco">
                  
            <div class="grid-container">
                <div class="grid-item">
                  <img :src="this.imagen1" alt="imagen1">
                </div>
                <div class="grid-item">
                  <img :src="this.imagen2" alt="imagen2">
                </div>
                <div class="grid-item">
                  <img :src="this.imagen3" alt="imagen3">
                </div>   
            </div>
            
             
            
          <div id="inputform">
            <form >               
                <div>   
                  <label for="Nombre"> <b>Nombre:   </b></label>  
                  <input  type="text" name="Nombre" v-model="nombre" required>  <br>
                </div>
                
                <div >        
                  <label for="id"> <b>Descripcion:   </b></label>   
                  <textarea     v-model="descripcion" rows="5" cols="25" required></textarea> <br>
                </div>
                
                <div >   
                  <label for="Precio"> <b>Precio:</b></label> 
                  <input  type="number" v-model="precio"  step="0.01" required> <br>
                </div>
                 
                <div >         
                  <label for="Stock"> <b>Stock:</b></label> 
                  <input type="number" v-model="stock" step="0.01" required> <br>
                </div>

                <div>   
                  <v-btn  flat @click="getkey()">Modificar</v-btn>   
                </div>
                  
            </form>  
          </div>   
                           
        </div>    
                   
    </div>
</template>


<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import * as firebase from 'firebase';
import UploadImages from '@/components/UploadImages.vue';
import { setTimeout } from 'timers';

export default {
    name: 'ModifyProduct',
     components: {
      ToolbarComponent,

    },
    created() {
        this.item = this.$route.params.item
        this.nombre=this.item.nameProduct
        this.descripcion=this.item.descriptionProduct
        this.precio=this.item.priceProduct
        this.stock=this.item.quantityProduct
        this.imagen1=this.item.image1
        this.imagen2=this.item.image2
        this.imagen3=this.item.image3
        
    },
    data () {
        return {
          item:null,
          id: "",
          nombre: "",
          descripcion: '',
          precio: 0,
          stock:0,
          imagen1: '',
          imagen3: '',
          imagen2: '',
           
           

        }
    },
  methods: {

    getkey(){
     
      var ref = firebase.database().ref("/products")
      ref.once('value',(snapshot)=>{
        snapshot.forEach((child)=>{
          if(child.val().nameProduct == this.item.nameProduct && child.val().uid == this.item.uid ){
             this.actualizar(child.key)
          }
        })
      })

    },
  /*  ValidarImagen(){     
     var img1= new Image();     
     var inputFile = document.querySelector("img1");
      img1.src = inputFile.value;
      
      imagen1=this.img1;
      document.getElementById("prueba1").innerHTML="lo";
      document.getElementById("prueba2").innerHTML="loco";
      document.getElementById("prueba3").innerHTML="loco";
     
      
      
      
    },*/

    actualizar(key){
        
         var ref = firebase.database().ref("/products/"+key)
         ref.update({
           nameProduct:this.nombre,
           descriptionProduct:this.descripcion,
           priceProduct:this.precio,
           quantityProduct:this.stock,

         }).then(()=>{

         })
    }
  }
}




</script>

<style scoped>
div{
  margin-top: 15px;
}
.main{
  width: 100%;
  height: 100%;
  display: flex;
  padding:100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #3498db;
  position: relative;
}
#marco{
    
  width: 100%;
  height: 100%;
  padding: 10%;
  margin: 20px;
  
  background: white;
}
 .grid-container{
   display: flex;
    justify-content: center;
     align-items: center;
 }
 .grid-item{
   margin:50px;  
   
 }
 
 img{
   width: 250px;  
   height: 250px;
   border-radius: 14%;
 }

 #inputform{
    display: flex;
     flex-direction: column;
    justify-content: center;
    align-items: center;
 }
input,textarea{
   border-bottom:   1px solid black;   
  
 }
label{
  margin-right: 50px;
} 

.images{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  width: 100%;
  border: 1px solid black;
}
</style>
