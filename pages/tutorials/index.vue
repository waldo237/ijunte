<template>
  <v-content class="home py-0">
    <v-container fluid wrap>
      <v-layout row wrap justify-center>
        <v-layout justify-start class="my-6">
          <!-- tabs start  -->
          <v-tabs
            :vertical="mobilePort"
            :grow="mobilePort"
            v-model="tab"
            icons-and-text
            center-active
            left
            class="tabs pa-5"
            :class="mobilePort ? 'pa-0 ma-0' : ''"
            color="#03254a"
            show-arrows
          >
            <v-tabs-slider></v-tabs-slider>
            <!-- TABS STARTS -->

            <v-tab>
              <v-icon>fas fa-video</v-icon>
            </v-tab>

            <v-tab>
              <v-icon>fas fa-podcast</v-icon>
            </v-tab>

            <v-tab>
              <v-icon>fas fa-feather-alt</v-icon>
            </v-tab>

            <!-- TABS ENDS -->

            <!-- VIDEO STARTS -->
            <v-tab-item>
              <v-layout row wrap justify-center align-center>
                <v-btn text color="primary" rounded class="my-5 mx-0" @click="toggleUploadVideo">
                  <v-icon size="50">mdi-video-account</v-icon>subir tutorial
                </v-btn>
                <uploadVideo :uploadVideo="uploadVideo" />
              </v-layout>
              <v-card class="pa-0 amarillo">
                <v-card-title class="work">Mis videos</v-card-title>

                <v-card class="videoSeries ma-0 azul5" dark>
                  <v-card-title class="work">Series</v-card-title>
                  <v-layout row wrap justify-center>
                    <v-card
                      v-for="(video, i) in videoSeries"
                      :key="i"
                      class="ma-2 pa-1 azul1"
                      width="230px"
                      light
                      
                    >
                    <nuxt-link :to="`tutorials/videos/${video.src}`" class="videolink">
                      <span>{{video.title}}</span>
                      <v-img :src="returnSrc(video.poster)" contain width="220px"></v-img>
                    </nuxt-link>

                     
                    </v-card>
                  </v-layout>
                </v-card>
              </v-card>
            </v-tab-item>
            <!-- VIDEO ENDS -->
          </v-tabs>
        </v-layout>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import uploadVideo from "@/components/dialogs/uploadVideos.vue";
import videos from "@/assets/videos.js";

export default {
  components: {
    uploadVideo
  },
  head() {
    return {
      title: "My tutorials",
      meta: [
        {
          hid: "My turorials about programming",
          name: "my tutorials on iJunte",
          content: "These are tutorials that I created on iJunte"
        }
      ]
    };
  },
  data() {
    return {
      mobilePort: true,
      tab: true,
      uploadVideo: false,
      videoSeries: videos.videos
    };
  },

  methods: {
    mobileSize() {
      if (process.browser) {
        if (window.innerWidth <= 900) {
          this.mobilePort = false;
        } else {
          this.mobilePort = true;
        }
        return this.mobilePort;
      }
    },
    toggleUploadVideo() {
      this.uploadVideo = !this.uploadVideo;
    },
    returnSrc(fileName) {
      return `http://localhost:5000/${fileName}`;
    }
  },
  computed: {
 
  },
  created() {
    if (process.browser) {
      window.addEventListener("resize", this.mobileSize);
      this.mobileSize();
      const card = document.querySelector(".videoSeries");
    
    }
  },
  destroyed() {
    if (process.browser) window.removeEventListener("resize", this.mobileSize);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oswald&display=swap");

.videolink{
  text-decoration: none !important;
  color: black !important;
}
.big {
  font-size: 180%;
}
.tabs {
  position: static !important;
  padding: 0% !important;
  margin: 0% !important;
  width: 90% !important;
}
.work {
  font-family: "Oswald", cursive !important;
}
.box {
  width: 100% !important;
  border-style: dashed !important;
  border-color: gray !important;
}
@media (min-width: 900px) {
}
</style>
