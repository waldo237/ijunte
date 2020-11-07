<template>
  <v-app>
   <navDrawer :drawer="drawer"/>

    <toolbar @toggleSideBar="drawer = !drawer" v-if="loggedin"/>

  
        <router-view></router-view>
 

    <bottom />

  </v-app>
</template>

<script>
import navDrawer from "@/components/navDrawer.vue";
import toolbar from "@/components/toolbar.vue";
import bottom from "@/components/footer.vue";
export default {
  name: "App",
  components: {
    navDrawer,
    bottom,
    toolbar
  },
  data(){
    return{
      drawer: null,
      loggedin: true,

    }
  },
  methods:{
  
  },
  watch:{
    $route(){
        if (this.$route.path == "/") this.loggedin = false
    }
  },
  created(){
  
  }

};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Anton|Fredoka+One&display=swap");
.color1 {
  background-color: #f7f7f7;
}
.amarillo {
  background-color: #ffc629 !important;
}
.azul1 {
  background-color: #c9cdce !important;
}
.azul2 {
  background-color: #5dc2ce !important;
}
.azul3 {
  background-color: #95ffff !important;
}
.azul4 {
  background-color: #4197a8 !important;
}
.azul5 {
  background-color: #03254a !important;
}
.color2 {
  font-family: "Fredoka One", cursive !important;
  color: #03254a;
  font-size: 170% !important;
}
</style>
