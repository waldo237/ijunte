<template>
    <v-navigation-drawer
      v-model="lDrawer"
      fixed
      temporary
      right
    >
    
      <v-divider></v-divider>

      <v-list dense class="ma-3">
         <!-- options when logged in starts -->
      <loggedNav :lDrawer="lDrawer" />
      <!-- options when logged in ends -->
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import loggedNav from '@/components/navButtons.vue'
  export default {
    components:{
        loggedNav,
    },
    props:['drawer'],
    data () {
      return {
        lDrawer: null,
        btnForSide: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
      }
    },
    watch:{
        drawer(){
            this.lDrawer = !this.lDrawer;
        }
    }
  }
</script>