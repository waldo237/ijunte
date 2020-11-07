<template>
<v-content class="home amarillo py-5">
<v-container fluid wrap  >
  <v-layout row wrap justify-center>
    <v-card flat class="mx-12 px-4 amarillo eye">
        <v-layout row wrap justify-center  class="my-0">
      <img src="@/assets/visibility.png" alt="" width="110px" class="my-0">
      </v-layout>
        <v-layout row wrap justify-center  class="my-0">
       <v-toolbar-title class="my-0 color2 logo"> iJunte</v-toolbar-title>
      </v-layout>
    </v-card>
    <v-card flat class="mx-12  px-4 amarillo" width="600px"  >
        <v-btn block color="#ff0000" rounded class="my-3 white--text no-uppercase"> <v-icon class="mx-2 ">fab fa-google</v-icon> Regístrate con Google</v-btn>
        <v-btn block color="white" rounded class="my-3 no-uppercase"> <v-icon class="mx-2 ">fab fa-microsoft</v-icon> Regístrate con Microsoft</v-btn>
        <v-btn block color="black" rounded class="my-3 white--text no-uppercase"> <v-icon class="mx-2 ">fab fa-github</v-icon> Regístrate con Github</v-btn>
        <v-btn block color="#4267b2" rounded class="my-3 white--text no-uppercase" > <v-icon class="mx-2 ">fab fa-facebook</v-icon> Regístrate con Facebook</v-btn>
    </v-card>
  
  </v-layout>

  </v-container >
     </v-content>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  }
}
</script>
<style scoped>
.no-uppercase {
  text-transform: none !important;
}
.logo{
  font-size: 300% !important;
  padding: 0% !important;
  margin: 0% !important;
}

@media (min-width: 600px) and (max-width: 900px) {
.eye{
height: 200px !important;
margin:0px  !important;
padding:0px  !important;

  }
}
</style>
