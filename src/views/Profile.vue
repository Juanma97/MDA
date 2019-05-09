<template>
  <div class="main">
    <ToolbarComponent />
     
    <v-toolbar class="toolbar2" color="#3498db">

      <v-toolbar-items >
        <v-btn flat dark @click="show(1)">My products</v-btn>
        <v-btn flat dark @click="show(3)">History</v-btn>
        <v-btn flat dark @click="show(4)">Messages</v-btn>
        <v-btn flat dark @click="show(5)">Edit User</v-btn> 
      </v-toolbar-items>

    </v-toolbar>

    <div v-if="this.showProducts" class="container">
      <div class="product" v-for="(item,index) in products" :key="index">
        <div class="proc">
          <img class="img" :src="item.image1" @click="goToDetailsProducts(item)">
          <div>{{item.nameProduct}}</div>
        </div>
        <div class="buttons">
          <v-btn flat @click="goToModify(item)">Modify</v-btn>
          <v-btn flat @click="eliminate(item)">Delete</v-btn>
        </div>
      </div>
      <div v-if="products.length<=0"> 
      <p id="Empty">You don´t have products yet</p>
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
      <div v-if="history.length<=0"> 
      <p id="Empty">You don´t have a history yet</p>
      </div>
    </div>

    <div v-if="this.showMsgs" class="container">
      <div class="product" v-for="(item,index) in msgs" :key="index">
        <div class="proc">
          <div>Asunto: {{item.subject}}</div>
          <div>Mensaje: {{item.message}}</div>
        </div>
        <div class="buttons">
          <v-btn flat @click="deleteMsg(item)">Delete message</v-btn>
        </div>
      </div>
      <div v-if="msgs.length<=0"> 
      <p id="Empty">You don´t have messages yet</p>
      </div>
    </div>
    
    <div v-if="this.showEdit" class="container">
      <div id="EditUser">
        <form>
           <p id="ErrorForm"></p>
          <div><label for="Email"> <b>Email:</b></label></div>                
          <div><input  id="editEmail" type="email" name="Email" v-model="email" required><br></div>                   
                       
          <div><label for="name"> <b>User name:   </b></label> </div>  
          <div><input id="editName" type="text" name="name" v-model="name" required><br></div> 
              
          <div><label for="lastname"> <b>User Lastname:</b></label> </div>                            
          <div><input id="editLastname" type="text" name="lastname" v-model="lastname" required><br></div>
                   
          <div><v-checkbox v-model="ChangePassw" :label="`Change password:`"></v-checkbox></div>
           <p id="ErrorPasswd"></p>
          <div v-if="this.ChangePassw"><label for="password"> <b> New password:</b></label>   </div>       
          <div v-if="this.ChangePassw"><input id="passwd1"  type="password" name="password" required> <br></div>
          
          <div v-if="this.ChangePassw"><label for="repeatPassword"> <b>Repeat new password:</b></label>   </div>       
          <div v-if="this.ChangePassw"><input id="passwd2" type="password" name="password" required> <br></div>

          <div> <v-btn  flat @click="ValidateEdit()">Modificar</v-btn>   </div>
        </form>          

      </div> 
        
      <div id="alerta"> 
                <v-alert
                  :value="SuccessModify"
                  type="success"
                  dismissible
                  transition="scale-transition"> 
                    User Edited!
                </v-alert>

                <v-alert
                  :value="FailModify"
                  type="error"
                  dismissible
                  transition="scale-transition"> 
                    User No Edited!
                </v-alert>
      </div>       
      
    </div>

    <FooterComponent />  
  </div>

</template>

<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import * as firebase from 'firebase'
import { isFulfilled } from 'q';
  
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
        showMsgs: false,
        showEdit: false,
        history: [],
        msgs: [],
        email:"",
        name:"",
        lastname:"",  
        SuccessModify: false,
        FailModify: false,            
        ChangePassw: false, 
      }
    },
    components: {
      ToolbarComponent,
      FooterComponent,
    },
    methods: {
      
        eliminate(item){
          var ref = firebase.database().ref('/products');

          ref.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                if(child.val().nameProduct ==  item.nameProduct) {
                this.deleteItem(child.key, item);
                this.$router.replace('profile');
                }
              })
            })
          },
          ValidateEdit(){
            this.FailModify=false;
            this.SuccessModify=false;
             var valemail=document.getElementById("editEmail").value;
             var valname=document.getElementById("editName").value;
             var vallastname=document.getElementById("editLastname").value;
            
            if(valname==="" || valemail==="" | vallastname===""){
              this.FailModify=true;
              document.getElementById("ErrorForm").innerHTML="Los campos no pueden estar vacios";
            }else if(this.ChangePassw){     
                var newpass= document.getElementById("passwd1").value;
                var repeatpass= document.getElementById("passwd2").value;
                if(newpass.length < 6){
                  document.getElementById("ErrorPasswd").innerHTML="Las contraseñas debe tener 6 caracteres";
                }
               
                if(newpass !==repeatpass){
                  document.getElementById("ErrorPasswd").innerHTML="Las contraseñas no coinciden";
                  this.FailModify=true;
                }
                this.updateProfile()
            }else{
              this.updateProfile()

                            
            }
          },
        updateProfile(){
          var ref = firebase.database().ref("/users/"+this.user)
          ref.update({
           name:this.name,
           email:this.email,
           lastname:this.lastname,         
           
           
          }).then(()=>{
              firebase.auth().currentUser.updateEmail(this.email).then(()=>{
                  this.SuccessModify=true  
                }).catch((err)=>{              
                  this.FailModify=true
                });  
                if(this.ChangePassw){                
                var newpass= document.getElementById("passwd1").value;
               
                firebase.auth().currentUser.updatePassword(newpass).then(()=>{
                  this.SuccessModify=true  
                }).catch((err)=>{              
                  this.FailModify=true
                });  
              }else{
                this.SuccessModify=true
              }       
        }).catch(()=>{
           console.log("falla este otro ")
           this.FailModify=true
         })

        },
        deleteItem (key, item) {
         if(confirm("Are you sure you want to remove this product?")){
           firebase.database().ref('/products/'+ key).remove()
            .then(() => {
              alert("Producto eliminado correctamente");
              var index = this.products.indexOf(item);
              this.products.splice(index, 1);
            })
         } 
        },
        goToModify(item) {
          this.$router.push({name: 'ModifyProduct', params: {item: item}})
        },
        goToAddProductPage() {
          this.$router.replace('addproduct')
        },
        goToDetailsProducts(item){
            this.$router.push({name: 'DetailsProducts', params: {item: item}})
        },
      show(navNumber) {
          
          this.showProducts = false
          this.showSellProducts = false
          this.showHistory = false
          this.showMsgs = false
          this.showEdit = false
          if(navNumber == 1) {
            this.showProducts = true            
          } else if(navNumber == 2) {
            this.showSellProducts = true            
          } else if(navNumber == 3) {
            this.showHistory = true           
          } else if (navNumber == 4){
            this.showMsgs = true
          }else if (navNumber ==5){
            this.showEdit = true
          } 
        },
        getMsgs() {
          var ref = firebase.database().ref('/messages')
          ref.once('value', (snapshot) => {
            snapshot.forEach((child) => {
              if(child.val().to == firebase.auth().currentUser.uid){
                this.msgs.push(child.val())
                console.log("MSGS", this.msgs)
              }
            })
          })
        }
    },
    created() {
      this.getMsgs();
      var ref = firebase.database().ref('/products')
      this.user=firebase.auth().currentUser.uid
      ref.once('value',(snapshot) => {
          snapshot.forEach((child)=>{
            if (child.val().uid == this.user) {
              this.products.push(child.val())
              console.log("PRD: ", this.products)
            }
              
          })
      })
      var refUser=firebase.database().ref('/users/'+this.user)
    
      refUser.once('value',(snapshot) => {
          
          this.lastname=snapshot.val().lastname
          this.name=snapshot.val().name
          this.email=snapshot.val().email
      
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
input{
  border-bottom:   1px solid black; 
  margin-bottom: 20px;
}
#EditUser{
   
  display: flex;
  flex-direction: row;
  justify-content:center;
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
#Empty{
 font-size: 1cm;
 text-align:center;
}

#ErrorForm, #ErrorPasswd{
 color: red;
}

</style>