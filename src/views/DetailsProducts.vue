<template>
    <div>
    <ToolbarComponent />  
        <img class="img1" :src="item.image1" alt="Imagen">
        
        <img class='img1' :src="item.image2" alt="Imagen">

      <img class='img1' :src="item.image3" alt="Imagen">
        <table  border= "1" id="mitabla">
            
            <tr>
                <th class='text'>Name</th>
                <th class='text'>Price</th>
                <th class='text'>Quantity</th>
                <th class='text'>Description</th>
            </tr>
            <tbody>
            <tr>
                <td>{{item.nameProduct}}</td>
                <td>{{item.priceProduct}}</td>
                <td>{{item.quantityProduct}}</td>
                <td>{{item.descriptionProduct}}</td>
            </tr> 
            </tbody>

        </table>
    </div>
</template>

<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import * as firebase from 'firebase';
var cosa= ["item.imagen1","item.imagen2","item.imagen3"];

 
export default ({
    name: 'DetailsProducts',
     components: {
      ToolbarComponent,
    
    },
    created() {
        this.item = this.$route.params.item
    },
    
   data () {
    return {
       item: null,
      
    }
    
  }
 
})
</script>

<style >
    

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