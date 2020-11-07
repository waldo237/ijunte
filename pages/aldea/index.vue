<template>
<v-content>
  <v-container fluid wrap class="azul1 px-5 pb-12">
    <v-layout row wrap justify-center >
      <!-- card on the left starts -->
      <v-card
        class="azul1 mx-0 scrolled_left"
        justify-end
        width="200px"
        flat
      >
        <v-card-title primary-title class="font-weight-bold">contenido</v-card-title>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
      <!-- card on the left ends -->

      <!-- card in center starts -->
      <v-card class="px-1 ma-0 scrolled_center" justify-center max-width="600px">
        <v-card-title primary-title class="font-weight-bold">contenido</v-card-title>
        <v-card-text>
          {{ text }}
          {{ text }}
          {{ text }}
          {{ text }}
        </v-card-text>
      </v-card>
      <!-- card in center ends -->

      <!-- card in the right starts-->
      <v-card
        class="azul1 pa-auto ml-10 scrolled_right"
        justify-left
        width="200px"
        flat
      >
        <v-card-title primary-title class="font-weight-bold">contenido</v-card-title>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
      <!-- card in the right ends-->
    </v-layout>
  </v-container>
  </v-content>
</template>
<script>
export default {
  data() {
    return {
      text:
        "Wisconsin (/wɪˈskɒnsɪn/ (About this soundlisten)) is a U.S. state located in the north-central United States, Midwest and Great Lakes regions. It is bordered by Minnesota to the west, Iowa to the southwest, Illinois to the south, Lake Michigan to the east, Michigan to the northeast, and Lake Superior to the north. Wisconsin is the 23rd largest state by total area and the 20th most populous. The state capital is Madison, and its largest city is Milwaukee, which is located on the western shore of Lake Michigan. The state is divided into 72 counties.Wisconsin's geography is diverse, having been greatly impacted by glaciers during the Ice Age with the exception of the Driftless Area. The Northern Highland and Western Upland along with a part of the Central Plain occupies the western part of the state, with lowlands stretching to the shore of Lake Michigan. Wisconsin is second to Michigan in the length of its Great Lakes coastline.During the 19th and early 20th centuries, many European settlers entered the state, many of whom emigrated from Germany and Scandinavia. Like neighboring Minnesota, the state remains a center of German American and Scandinavian American culture.Wisconsin[10] is known as America's Dairyland[11] because it is one of the nation's leading dairy producers, particularly famous for its cheese. Manufacturing (especially paper products), information technology (IT), cranberries, ginseng,[12] and tourism are also major contributors to the state's economy."
    };
  }
};
</script>

<style scoped>
.narrow {
  padding: 50px !important;
  margin: 20px !important;
}
.scrolled_left {
  position: fixed !important;
  left: 8%;
  height: 350px !important;
  overflow-y: hidden !important;
}
.scrolled_right {
  position:relative !important;
  left:130px;
  height: 350px !important;
  overflow-y: scroll !important;
}
.scrolled_center {
  position: sticky !important;
  left: 25%;
  height: 750px !important;
  overflow-y: scroll !important;
}
::-webkit-scrollbar {
display: none;
}
@media only screen and (max-width: 1200px) {
.scrolled_left{
  position:initial !important;
  height: 340px !important;
  overflow-y: hidden !important;
  width: 360px !important;
  margin-bottom: 20px;
}
.scrolled_right{
  position:initial !important;
  height: 340px !important;
  overflow-y: scroll !important;
  width: 360px !important;
}
.scrolled_center {
  position: initial !important;
  height: 750px !important;
  overflow-y: scroll !important;
  margin-bottom: 20px;
}
}
</style>
