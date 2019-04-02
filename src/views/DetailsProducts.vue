<template>
    <div>
        <ToolbarComponent />
        <h3>{{variable.nameProduct}}</h3>
    </div>
</template>
<script>
import ToolbarComponent from '@/components/ToolbarComponent.vue';
import firebase from 'firebase';

export default {
    name:'DetailsProducts',
    components: {
        ToolbarComponent,

    },
    data(){
     return{
         variable: null
     }
    }
    methods:{
        this.$route.params
    }
   
    
}
</script>

<style>

</style>


