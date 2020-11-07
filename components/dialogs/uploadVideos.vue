<template>
 <v-dialog v-model="dialog" persistent max-width="900px" >
  <v-card class="ma-0 pa-0">
          <div v-cloak @drop.prevent="addFile" @dragover.prevent >
            <v-card
            flat
              class=" ma-0 azul1 "
              :class="white ? 'ma-0 white  ' : ''"
              @dragleave="whitify"
              @drop="white = false"
            >
              <v-card-title
                primary-title
                class="azul5 py-1 white--text elevation-15 work"
              >
              <v-layout row justify-space-between>
                Tutoriales en Video
                  <button @click="dialog = false" title="Remove">
                        <v-icon color="white">mdi-close</v-icon>
                      </button>
                
              </v-layout>
              </v-card-title>
              <v-layout row justify-center class="ma-0 pa-0">
                <!-- upload video starts -->
                <!-- ====================================================== -->
                <v-card-text
                  @click="$refs.inputUpload.click()"
                  class="box mx-4 my-2"
                >
                  <v-layout column justify-space-between v-if="!dropped">
                    <v-icon color="#03254a" size="100">mdi-file-upload</v-icon>
                    <span color="#03254a" class="mx-auto work big"
                      >selecciona video</span
                    >
                    <span color="#03254a" class="mx-auto work "> o </span>
                    <span color="#03254a" class="mx-auto work "
                      >arrastra y suelta el video
                    </span>
                  </v-layout>
                  <v-layout column justify-space-between v-else>
                    <v-icon color="#03254a" size="100">mdi-creation</v-icon>
                    <v-icon color="#03254a" size="50">mdi-message-video</v-icon>
                    <span color="#03254a" class="mx-auto my-2 work big"
                      >Listos para subir los archivos:</span
                    >
                    <v-chip v-for="(file, i) in files" :key="i">
                      {{ file.name }} ({{ file.size | kb }})
                      <button @click.stop="removeFile(file)" title="Remove">
                        <v-icon>mdi-close</v-icon>
                      </button>
                    </v-chip>
                  </v-layout>
                </v-card-text>

                <input
                  v-show="false"
                  ref="inputUpload"
                  type="file"
                  @change="addFile"
                  id="file"
                  accept="image/x-png, image/gif, image/jpeg"
                />

                <!-- ====================================================== -->
                <!-- upload video ends -->
              </v-layout>
            </v-card>
          </div>

          <v-layout row wrap justify-end class="ma-0 pa-2 azul1 ">
            <v-btn
              class="azul4 mx-auto ma-2"
              rounded
              block
              :disabled="uploadDisabled"
              @click="upload"
              >Subir video</v-btn
            >
          </v-layout>
  </v-card>
 </v-dialog>
</template>
<script>
export default {
  props:['uploadVideo'],
  data() {
    return {
      files: [],
      uploadDisabled: false,
      white: false,
      dropped: false,
      dialog: this.uploadVideo,
    };
  },
 watch:{
      uploadVideo(){
          this.dialog = true;
      }
  },
  filters: {
    kb(bytes) {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    }
  },
  methods: {
    addFile(e) {
      let droppedFiles = null;
      if (e.target.files) droppedFiles = e.target.files;
      if (e.dataTransfer) droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      [...droppedFiles].forEach(f => {
        this.files.push(f);
      });
      if (this.files.length >= 0) this.dropped = true;
    },
    whitify() {
      this.white = true;
    },
    removeFile(file) {
      this.files = this.files.filter(f => {
        return f != file;
      });
      if (this.files.length <= 0) this.dropped = false;
    },
    upload() {
      let formData = new FormData();
      this.files.forEach((f, x) => {
        formData.append("file" + (x + 1), f);
      });

      this.output = formData;
      //   fetch('https://httpbin.org/post', {
      //     method:'POST',
      //     body: formData
      //   })
      //   .then(res => res.json())
      //   .then(res => {
      //      .log('done uploading', res);
      //   })
      //   .catch(e => {
      //     console.error(JSON.stringify(e.message));
      //   });
    }
  },
  created() {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oswald&display=swap");

.big {
  font-size: 180%;
}

.work {
  font-family: "Oswald", cursive !important;
}
.box {
  width: 100% !important;
  border-style: dashed !important;
  border-color: gray !important;
}
</style>
