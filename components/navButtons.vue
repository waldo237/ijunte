<template>
    <v-layout :column="(column) ?true:false">
       <!-- search guru starts -->
      <v-spacer />
      <v-btn v-if="!column" class="no-uppercase mr-10 seach-bar"  rounded>
        <v-text-field
          label="Busca un guru..."
          prepend-icon="mdi-magnify"
          class="mx-3"
 
        ></v-text-field>
      </v-btn>
        <v-text-field
        v-if="column"
          label="Busca un guru..."
          append-icon="mdi-magnify"
 
        ></v-text-field>
      <v-spacer />
      <v-spacer />
  
    <!-- search guru ends -->
         <!-- la aldea starts -->
      <v-btn class="no-uppercase mx-1 azul5" text dark rounded  :class="(column) ?'ma-1':''" to="/aldea" >
        La aldea
      </v-btn>
    <!-- la aldea ends -->

    <!-- mi cuenta starts -->
      <v-btn class="no-uppercase pa-1 azul5" text rounded dark  :class="(column) ?'ma-1':''" to="/profile">
        <v-avatar size="30">
          <img :src="profilePhoto" alt="alt" class="mx-1" />
        </v-avatar>
        <span class="mx-1">Mi cuenta</span>
      </v-btn>
    <!-- mi cuenta ends -->

    <!-- messages starts -->
      <v-btn text :rounded="(column) ?true:false" :class="(column) ?'azul5 white--text ma-1':''" small>
        <v-icon>fa-comments</v-icon>
        <span v-if="column" class="mx-2">Chat</span>
      </v-btn>
    <!-- messages ends -->

    <!-- create groups starts -->
      <v-btn text :rounded="(column) ?true:false" :class="(column) ?'azul5 white--text ma-1':''" small>
        <v-icon>fa-users</v-icon>
        <span v-if="column" class="mx-2">Crear equipo</span>
      </v-btn>
    <!-- create groups ends -->

    <!-- tutorials  starts -->
      <v-btn text :rounded="(column) ?true:false" :class="(column) ?'azul5 white--text ma-1':''" small to="/tutorials">
        <v-icon>fas fa-chalkboard-teacher</v-icon>
        <span v-if="column" class="mx-2">Tutoriales</span>
      </v-btn>
    <!-- tutorials  ends -->

    <!-- notification starts -->
      <v-btn text :rounded="(column) ?true:false" :class="(column) ?'azul5 white--text ma-1':''" small>

        <!-- badget starts -->
        <v-badge
          v-model="showBadget"
          color="red"
          bottom
          overlap
        >
          <template v-slot:badge>
            <span class="overline">{{notifications}}</span>
          </template>
        <v-icon>fa-bell</v-icon>
        </v-badge>
        <!-- badget ends -->
        <span v-if="column" class="mx-2">Notificaciones</span>
      </v-btn>
    <!-- notification ends -->

    <!-- more option starts -->
      <v-btn text v-if="!column"  @click="away">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-btn  text v-if="column" :rounded="(column) ?true:false" :class="(column) ?'azul5 white--text ma-1':''" @click="away(); openMore();" small>
        <v-icon v-if="!moreOpened">fas fa-caret-down</v-icon>
        <v-icon v-if="moreOpened">fas fa-caret-up</v-icon>
        <span v-if="column" class="mx-2">mas</span>
      </v-btn>
    <!-- more option ends -->
      <v-list v-if="settings" class="options elevation-10" v-on-clickaway="away">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="() => {}"
            :to="item.link"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>

    </v-layout>
</template>


<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
    props:['lDrawer'],
     data() {
    return {
      settings: false,
      showBadget: true,
      notifications: 5,
      moreOpened: false,
        column: this.lDrawer,
        items: [
          {
            title: 'Registro de actividad',
          },
          {
            title: 'Reportar problema',
          },
          {
            title: 'Configuración',
            link: '/settings'
          },
          {
            title: 'Cerrar sesión',
          },
        ],
      profilePhoto:
        "https://scontent.fsti4-1.fna.fbcdn.net/v/t31.0-8/s960x960/1120010_10151816520622402_592851264_o.jpg?_nc_cat=110&_nc_ohc=SeoQ9v9RFa0AQm68uaBgJhNSRib7mNQr8qgFArLhcYBI79cqMGsTDBy6w&_nc_ht=scontent.fsti4-1.fna&oh=3bfcc7998cb47a693cc04851d3e2eff9&oe=5E679B26"
    };
  },
  watch:{
      lDrawer(){
          this.column = true;
      }
  },
  methods:{
    away(){
      this.settings = !this.settings;
    },
    openMore(){
      this.moreOpened = !this.moreOpened;
    }
  }
}
</script>

<style scoped>
.no-uppercase {
  text-transform: none !important;
}
.options{
   width: 200px;
  z-index: 1;
  position:absolute !important;
  top: 350px;
  right: 25px;
  text-align: center;
  animation-duration: 0.10s;
  animation-name: slideInDown;
  animation-timing-function: ease-in-out;
  display: block;
}

@media (min-width:1200px){
 .seach-bar {
   width: 500px;
    padding: 0% !important;
    margin: 0% !important;
  }
.options{
 width: 200px;
  z-index: 1;
  position: fixed;
  top: 100%;
  right: 10px;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: slideInDown;
  animation-timing-function: ease-in-out;
  display: block;
}
}
</style>