<template>
  <div class="container-upload-images">
    <v-btn only-icon class="button-upload" @click.native="selectFile" v-if="!uploadEnd && !uploading">
      <v-icon>add_photo</v-icon>
    </v-btn>
      <input 
      id="files"
      type="file"
      name="file"
      ref="uploadInput"
      accept="image/*"
      :multiple="false"
      @change="detectFiles($event)" />
        <v-progress-circular
          v-if="uploading && !uploadEnd"
          :size="100"
          :width="15"
          :rotate="360"
          :value="progressUpload"
          color="primary">
        %
        </v-progress-circular>
        <img 
        v-if="uploadEnd"
        :src="downloadURL"
        height="100%"
        width="100%" />
        <v-btn 
          v-if="uploadEnd"
          class="delete"
          only-icon
          fab
          color="#ff5252"
          @click="deleteImage()">
          <v-icon>clear</v-icon>
        </v-btn>
  </div>
</template>


<script>
import firebase from 'firebase';

export default {
  name: 'UploadImages',
  data() {
    return {
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: '',
      hash: '',
    }
  },
  props: {
    number: '',
  },
  methods: {
    selectFile() {
      this.$refs.uploadInput.click();
    },
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from (Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.hash = Math.random().toString(36).substring(7);
      this.fileName = file.name;
      this.uploading = true;
      this.uploadTask = firebase.storage().ref('images/' + file.name + this.hash).put(file);
    },
    deleteImage() {
      firebase.storage()
      .ref('images/' + this.fileName + this.hash)
      .delete()
      .then(() => {
        this.uploading = false;
        this.uploadEnd = false;
        this.downloadURL = '';
      })
      .catch((error) => {
        console.error('file delete error ocurred: ${error}')
      })
    },
  },
  watch: {
      uploadTask : function () {
        this.uploadTask.on('state_changed', sp => {
          this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true;
            this.downloadURL = downloadURL;
            this.$emit('downloadURL', downloadURL);
          })
        })
      }
    }
}
</script>


<style scoped>
.progress-bar {
  margin: 10px 0;
}

.button-upload{
  height: 100px;
  width: 100px;
  overflow: auto;
}

.delete{
  position: absolute;
  z-index: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  top: -20px;
  right: -20px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  cursor: pointer;
  display: flex;
}

input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
.container-upload-images{
  position: relative;
  display: flex;
  padding: 8px;
}
</style>
