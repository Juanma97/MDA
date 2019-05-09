<template>
    <div style="position: relative; height: 100%; display: flex; align-items: center; flex-direction:column;">
    <v-btn color="#3498db" fab class="msg-btn" @click="showFormMessage">
        <v-icon color="white">message</v-icon>
    </v-btn>
    <ToolbarComponent />  
        <v-carousel height="300">
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
        <div class="details">
            <h3>Name product</h3>
            <p>{{item.nameProduct}}</p>
            <h3>Description product</h3>
            <p>{{item.descriptionProduct}}</p>
            <h3>Price product</h3>
            <p>{{item.priceProduct}}</p>
            <h3>Name seller</h3>
            <p>{{nameSeller}}</p>
        </div>
        <div v-if="showForm" class="buy-form">
            <h3>Formulario de compra</h3>
            <v-text-field v-if="showForm" v-model="name" placeholder="name"></v-text-field>
            <v-text-field v-if="showForm" v-model="lastname" placeholder="lastname"></v-text-field>
            <v-text-field v-if="showForm" v-model="direction" placeholder="direction"></v-text-field>
            <v-text-field v-if="showForm" v-model="email" placeholder="email"></v-text-field>
            <v-text-field v-if="showForm" v-model="card_number" placeholder="card_number"></v-text-field>
            <v-btn outline @click="buyProduct(item)" v-if="showForm">Finalizar compra</v-btn>
            <v-btn outline @click="hideForm()" v-if="showForm">Cancelar compra</v-btn>
        </div>
        <div v-if="showFormMsg" class="msg-form">
            <h3>Enviar mensaje</h3>
            <v-text-field v-model="subject" placeholder="asunto"></v-text-field>
            <v-textarea v-if="showFormMsg" v-model="message"></v-textarea>
            <v-btn @click="sendMsg" v-if="showFormMsg" color="white">Enviar mensaje</v-btn>
            <v-btn outline @click="hideFormMsg()" v-if="showFormMsg" color="white">Cancelar mensaje</v-btn>
        </div>
        <div class="buy-btn">
            <v-btn outline @click="showFormBuy()" v-if="!showForm && !showFormMsg" color="#3498db">Comprar producto</v-btn>
            <v-alert type="success" dismissible :value="buySuccessful">Producto comprado</v-alert>
            <v-alert type="success" dismissible :value="msgSendSuccessfull">Mensaje enviado</v-alert>
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
        }).then(() => {
            this.getUserInformation();
        })
    },
   data () {
    return {
       item: null,
       buySuccessful: false,
       errorLogin: false,
       showForm: false,
       showFormMsg: false,
       msgSendSuccessfull: false,
       nameSeller: '',
       name: '',
       lastname: '',
       card_number: '',
       direction: '',
       email: '',
       message: '',
       subject: '',
    }
  },
  methods: {
    getUserInformation() {
        var ref = firebase.database().ref('/users/'+firebase.auth().currentUser.uid);
        ref.once('value', (snapshot) => {
            this.name = snapshot.val().name;
            this.lastname = snapshot.val().lastname;
            this.email = snapshot.val().email;
        })
    },
    showFormBuy() {
    firebase.auth().currentUser != null ? this.showForm = true : this.errorLogin = true;
    },
    showFormMessage() {
        firebase.auth().currentUser != null ? this.showFormMsg = true : this.errorLogin = true;
    },
    hideForm() {
        this.showForm = false;
    },
    hideFormMsg() {
          this.showFormMsg = false;
    },
    sendMsg() {
        var ref = firebase.database().ref('messages/')
        ref.push({
            from: firebase.auth().currentUser.uid,
            to: this.item.uid,
            message: this.message,
            subject: this.subject,
        })
        .then(() => {
            this.msgSendSuccessfull = true;
        })
    },
    buyProduct(item){
        if(firebase.auth().currentUser != null){
            var ref = firebase.database().ref('historial_compras/'+firebase.auth().currentUser.uid)
            ref.push({
                item: item,
                nameSeller: this.nameSeller,
                direction: this.direction,
                card_number: this.card_number,
                name: this.name,
                lastname: this.lastname,
                email: this.email,
            })
            .then(() => {
                this.buySuccessful = true;
                this.showForm = false;
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
.buy-form{
    width: 70%;
}
.msg-form{
    width: 70%;
    background: #3498db;
    color: white;
    padding: 16px;
    margin-bottom: 8px;
}
.msg-btn{
    position: absolute !important;
    bottom: 32px;
    right: 32px;
    z-index: 100;
}
.msg-btn:hover{
    cursor: pointer;
}
.details{
    align-self: left !important;
    width: 100%;
    padding: 32px;
}
.buy-btn{
    position: absolute;
    bottom: 32px;
    left: 32px;
    width: 100%;
    z-index: 1;
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