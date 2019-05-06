<template>
  
   <div class="footer">
      <p>About us</p>
      <p>Our clients</p>
      <p>Why select this enterprise?</p>
      <p class="copyright">Copyright 2019</p>
    </div>
  
</template>

<script>


export default {
  name: 'FooterComponent',
  created() {
    
  },
  methods: {
  
  }
}
</script>
<style scoped>
.footer{
  border-top: 1px solid white;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.footer p{
  margin: 16px !important;
  transition: 400ms;
}

.footer p:hover{
  font-size: 18px;
  color: white;
}
</style>