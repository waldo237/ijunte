<template>
  <v-app-bar class="amarillo" app dense>
    <!-- logo starts -->
    <img
      src="../assets/visibility (2).png"
      width="50px"
      alt="eye"
      @click="sendHome"
    /><v-toolbar-title class="my-5 color2" @click="sendHome"> iJunte</v-toolbar-title>
    <!-- logo ends -->
  
      <!-- options when logged in starts -->
      <loggedNav class=" buttons"/>
      <!-- options when logged in ends -->

       <!-- sandwich menu starts -->
       <v-layout row wrap justify-end>
        <v-btn
            class="sandwich hidden-md-and-up"
            fab
            text
            
          @click.stop="toggleSideBar"
            >
          <v-icon>fa-bars</v-icon>
        </v-btn>
         
       </v-layout>
    <!-- sandwich menu ends -->

  </v-app-bar>
</template>
<script>
import loggedNav from '@/components/navButtons.vue'
export default {
  components:{
    loggedNav
  },
  data() {
    return {
    
      profilePhoto:
        "https://scontent.fsti4-1.fna.fbcdn.net/v/t31.0-8/s960x960/1120010_10151816520622402_592851264_o.jpg?_nc_cat=110&_nc_ohc=SeoQ9v9RFa0AQm68uaBgJhNSRib7mNQr8qgFArLhcYBI79cqMGsTDBy6w&_nc_ht=scontent.fsti4-1.fna&oh=3bfcc7998cb47a693cc04851d3e2eff9&oe=5E679B26"
    };
  },
  methods:{
    toggleSideBar(){
      
      this.$emit('toggleSideBar');
    },
    sendHome(){
     if( this.$route.path != '/')  this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.no-uppercase {
  text-transform: none !important;
}
@media only screen and (max-width: 960px) {
 
  .sandwich {
    padding: 0% !important;
    margin: 0% !important;
  }
  .buttons{
    display: none;
  }

}
</style>
