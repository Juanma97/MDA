<template>
<div class = "main">
<ToolbarComponent />
<div  class="container">
      <div class="product" v-for="(item,index) in users" :key="index">
        <div class="proc">  
          <div>{{item.name}}</div>
          <div>{{item.lastname}}</div>
          <div>{{item.email}}</div>
        </div>
        <div class="buttons">
          <v-btn flat @click="eliminate(item)">Delete</v-btn>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import * as firebase from 'firebase'
  
  export default {
    name: 'Usersview',
    data() {
      return{
        value: true,
        users: [],
       
        
      }
    },
    components: {
      ToolbarComponent,
    },
    methods: {
      
        eliminate(item){
          var ref = firebase.database().ref('/users');

          ref.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                if(child.val().email ==  item.email) {
                 this.eliminateProduct(child.key);
                  this.eliminateHistory(child.key);
                 this.deleteUser(child.key, item); 
                  
                this.$router.replace('Usersview');
                }
              })
            })
            
          }, 
        deleteUser (key, item) {
         if(confirm("Are you sure you want to remove this user and his products?")){
          
          firebase.database().ref('/users/'+ key).remove()

           .then(() => {
              var index = this.users.indexOf(item);
              this.users.splice(index, 1);
            })
         }
          
        },
        eliminateProduct(key){
          var ref = firebase.database().ref('/products');

          ref.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                if(child.val().uid ==  key) {
                this.deleteProduct(child.key, child.val()); 
                }
              })
            })

        },
        deleteProduct(key, item){
          
           firebase.database().ref('/products/'+ key).remove()
        },
        eliminateHistory(key){
          var ref= firebase.database().ref('/historial_compras/')
          ref.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                if(child.key ==  key) {
                this.deleteHistory(child.key); 
                }
              })
            })
        },
        deleteHistory(key){
            firebase.database().ref('/historial_compras/'+ key).remove()
            alert("User Deleted"); 
        },
    },
    
    created() {
        //console.log("Empiezo")
        var ref = firebase.database().ref('/users')
        ref.once('value',(snapshot) => {
            snapshot.forEach((child)=>{
                this.users.push(child.val())
            })
        })
    }
  }
</script>
<style scoped>


.product {
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
  margin-top:6%;

}

</style>