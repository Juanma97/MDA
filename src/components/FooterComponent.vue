<template>
 <div id="main"> 
   <div class="footer">
     
      <a href="#popup1" class="popup-link">About us</a>
      <a href="#popup2" class="popup-link">Our clients</a>
      <a href="#popup3" class="popup-link">Why select this enterprise?</a>
      <p class="copyright">Copyright 2019</p>
    </div>
    <div class="modal-wrapper" id="popup1">
        <div class="popup-contenedor">   
            <h2>About us</h2>
            <p>Canary Island</p>
            <p>Telephone: 928 25 25 25</p>
            <p>Email: Easybuy@easybuy.com</p>
            <p>Mail address: C/ Luis Jorge Castaños 23. 4º-2ª Urbanización Las Cascajuelas 28999 Valdecillas de Jarama, Las Palmas </p>
            <a class="popup-cerrar" href="#">X</a>
        </div>
    </div>
    <div class="modal-wrapper" id="popup2">
        <div class="popup-contenedor">   
            <h2>Our clients</h2>
            <p>Buyers: They can obtain products in a framework of trust and with the maximum guarantees of the market</p>
            <p>Shellers: They may obtain benefits from objects that they do not use or offer barter with which to obtain them without paying </p>
            <p>Professional sheller: They will find another way of income without complications</p>
            <p>Small businesses: They will find a way to reach a larger number of customers</p>
            <a class="popup-cerrar" href="#">X</a>
        </div>
    </div>
    <div class="modal-wrapper" id="popup3">
        <div class="popup-contenedor">   
            <h2>Why select this enterprise?</h2>
            <p>Complying with the ethical values ​​that characterize us, we offer a safe service with total guarantee, where you can not only obtain an economic benefit from a product, but you can obtain new ones by exchanging objects that you no longer use</p>
            <a class="popup-cerrar" href="#">X</a>
        </div>
    </div>
 </div>
</template>

<script>


export default {
  name: 'FooterComponent',
  created() {
    this.showModal=false
  },
  methods: {
     
  }
}
</script>
<style scoped>
#main{
  width: 100%;
  padding-top: 150px;
  margin-top: 20px;
}
.footer{
  border-top: 1px solid white;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-left: 0px;
  background: #3498db;
}

.footer p{
  margin: 16px !important;
  transition: 400ms;
}
.footer a{
  margin: 16px ;
  transition: 400ms;
  color: black;
  text-decoration: none;
}
.footer a:hover{
  font-size: 18px;
  color: white;
}
.footer p:hover{
  font-size: 18px;
  color: white;
}
#popup1,#popup2,#popup3{
   visibility: hidden;
   opacity: 0;
   margin-top: -300px;
}
#popup1:target, #popup2:target,#popup3:target {
   visibility:visible;
   opacity: 1;
   background-color: rgba(0,0,0,0.8);
   position: fixed;
   top:0;
   left:0;
   right:0;
   bottom:0;
   margin:0;
   z-index: 999;
   transition:all 1s;
}
.popup-contenedor {
   position: relative;
   margin:7% auto;
   padding:30px 50px;
   background-color: #fafafa;
   color:#333;
   border-radius: 3px;
   width:50%;
}
a.popup-cerrar {
   position: absolute;
   top:3px;
   right:3px;
   background-color: #333;
   padding:7px 10px;
   font-size: 20px;
   text-decoration: none;
   line-height: 1;
   color:#fff;
}
</style>