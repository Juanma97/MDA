!<template>
    <div class="main">
       <ToolbarComponent />
        <div id="backicon"> <v-icon @click="gotoprofile" color="blue">arrow_back</v-icon> </div>
        <div><h1>Modificar Producto</h1></div>
       
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
                <div> <label for="Nombre"> <b>Nombre:   </b></label></div>                
                <div> <input id="formname" type="text" name="Nombre" v-model="nombre" required>  <br> </div>                   
                       
                <div><label for="id"> <b>Descripcion:   </b></label> </div>  
                <div> <textarea  id="formdescrip"   v-model="descripcion" rows="5" cols="25" required></textarea> <br></div>
              
                <div> <label for="Precio"> <b>Precio:</b></label> </div>                             
                <div> <input id="formprice" type="number" v-model="precio"  step="0.01" required> <br></div>
                   
                <div><label for="Stock"> <b>Stock:</b></label>   </div>       
                <div><input id="formStock" type="number" v-model="stock" step="0.01" required> <br></div>
                  
                <div> <v-btn  flat @click="getkey()">Modificar</v-btn>   </div>
                
            </form>  
                
          </div> 
          
          <div id="alerta"> 
                <v-alert
                  :value="SuccessModify"
                  type="success"
                  dismissible
                  transition="scale-transition"
                 

                > 
                    Producto Modificado!
                </v-alert>

                    <v-alert
                  :value="FailModify"
                  type="error"
                  dismissible
                  transition="scale-transition"
                 

                > 
                    Producto No Modificado!
                </v-alert>
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
        this.item =   this.$route.params.item
        this.nombre=this.item.nameProduct
        this.descripcion=this.item.descriptionProduct
        this.precio=this.item.priceProduct
        this.stock=this.item.quantityProduct
        this.imagen1=this.item.image1
        this.imagen2=this.item.image2
        this.imagen3=this.item.image3
        this.SuccessModify=false
        this.changePassw=false
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
          SuccessModify: false,
          FailModify: false,
        }
    },
  methods: {

    getkey(){
      this.SuccessModify=false;
      this.FailModify=false;
      if(!this.validateModify()){
      this.FailModify=true;
      }else{
      var ref = firebase.database().ref("/products")
      ref.once('value',(snapshot)=>{
        snapshot.forEach((child)=>{
          if(child.val().nameProduct == this.item.nameProduct && child.val().uid == this.item.uid ){
             this.actualizar(child.key)
          }
        })
      })
      } 
    },
    validateModify(){
      var valname=document.getElementById("formname").value;
      var valdes=document.getElementById("formdescrip").value;
      var valprice=document.getElementById("formprice").value;
      var valstock=document.getElementById("formStock").value;
      
      if(valname==="" || valdes==="" | valprice===""|valstock===""){
        return false;
      }else{
        if(valprice==="0"||valstock==="0"){
          return false;
        }else{
          return true;
        }
      }
    },
    actualizar(key){
        
         var ref = firebase.database().ref("/products/"+key)
          ref.update({
            nameProduct:this.nombre,
            descriptionProduct:this.descripcion,
            priceProduct:this.precio,
            quantityProduct:this.stock,
            
          }).then(()=>{
           this.SuccessModify=true  
          

         }).catch(()=>{
           this.FailModify=true
         })
    },
    gotoprofile(){
     
      this.$router.replace('/profile');
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
  background: white;
  position: relative;
}
#marco{
    
  width: 100%;
  height: 100%;

  margin: 0px;
  
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
    display:flex;
    justify-content: center;
     align-items: center;
 }
input,textarea{
   border-bottom:   1px solid black;   
  
 }
#alerta{
  width: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
}
v-icon {
  margin-left: 10%;
}
.images{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  width: 100%;
  border: 1px solid black;
}
.v-icon{
 position: absolute;
 left: 10%;
 top: 7%;
 font-size: 48px;
}
h1{
  color: #3498db; 
}
</style>
