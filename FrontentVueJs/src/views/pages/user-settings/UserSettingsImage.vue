<template>
  <vx-card no-shadow>

    <vs-progress :height="4" :percent=progressBar color="primary"></vs-progress>
    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="photo" size="70px" class="mr-4 mb-4" />
      <div
        v-if="this.lang == 'de'" >
        <vs-button
          :disabled="isDisabled()"
          v-if="!loading"
          size="md"
          variant="primary"
          @click="selectImage()"
          class="cursor">
          Bild auswählen
        </vs-button>
        <input
          id="upload"
          ref="uploadInput"
          type="file"
          name="file"
          class="image-input"
          @change="updateUploadButton($event); insertImage()">
        &nbsp;
        <vs-button 
          type="border" 
          color="danger"
          @click="deleteImage()">Entfernen</vs-button>
        <p class="text-sm mt-2">Zulässig sind JPG, JPEG oder PNG. Maximale Größe von 5 MB</p>
      </div>
      <div
        v-if="this.lang == 'sp'" >
        <vs-button
          :disabled="isDisabled()"
          v-if="!loading"
          size="md"
          variant="primary"
          @click="selectImage()"
          class="cursor">
          Seleccionar imagen
        </vs-button>
        <input
          id="upload"
          ref="uploadInput"
          type="file"
          name="file"
          class="image-input"
          @change="updateUploadButton($event); insertImage()">
        &nbsp;
        <vs-button 
          type="border" 
          color="danger"
          @click="deleteImage()">Eliminar</vs-button>
        <p class="text-sm mt-2">Se permiten JPG, JPEG o PNG. Tamaño máximo de 5 MB</p>
      </div>
      <div
        v-if="this.lang != 'de' && this.lang != 'sp'" >
        <vs-button
          :disabled="isDisabled()"
          v-if="!loading"
          size="md"
          variant="primary"
          @click="selectImage()"
          class="cursor">
          Select image
        </vs-button>
        <input
          id="upload"
          ref="uploadInput"
          type="file"
          name="file"
          class="image-input"
          @change="updateUploadButton($event); insertImage()">
        &nbsp;
        <vs-button 
          type="border" 
          color="danger"
          @click="deleteImage()">Remove</vs-button>
        <p class="text-sm mt-2">Allowed are JPG, JPEG or PNG. Max size of 5MBs</p>
      </div>
    </div>

    <div
      v-if="this.lang == 'de'" 
      class="add-button">
      <p
        v-if="loading"
        class="text-center w-75"
        style="word-wrap:break-word;">
        <strong>Hochladen</strong>
        {{ loadingText }}
        {{ progress }}
      </p>
      <p
        v-if="err"
        class="text-center w-75"
        style="word-wrap:break-word;">
        <strong>Fehlermeldung: </strong>
        {{ err }}
      </p>
      
      <!-- Avatar Col -->
      <div v-else class="vx-col" id="avatar-col">
      <br />
        <div class="img-container mb-4">
          <img :src="photo" class="rounded w-full" />
        </div>
      </div>
      
    </div>

    <div
      v-if="this.lang == 'sp'" 
      class="add-button">
      <p
        v-if="loading"
        class="text-center w-75"
        style="word-wrap:break-word;">
        <strong>Cargando</strong>
        {{ loadingText }}
        {{ progress }}
      </p>
      <p
        v-if="err"
        class="text-center w-75"
        style="word-wrap:break-word;">
        <strong>Mensaje de error: </strong>
        {{ err }}
      </p>
      
      <!-- Avatar Col -->
      <div v-else class="vx-col" id="avatar-col">
      <br />
        <div class="img-container mb-4">
          <img :src="photo" class="rounded w-full" />
        </div>
      </div>
      
    </div>

    <div
      v-if="this.lang != 'de' && this.lang != 'sp'" 
      class="add-button">
      <p
        v-if="loading"
        class="text-center w-75"
        style="word-wrap:break-word;">
        <strong>Uploading</strong>
        {{ loadingText }}
        {{ progress }}
      </p>
      <p
        v-if="err"
        class="text-center w-75"
        style="word-wrap:break-word;">
        <strong>Errmsg: </strong>
        {{ err }}
      </p>
      
      <!-- Avatar Col -->
      <div v-else class="vx-col" id="avatar-col">
      <br />
        <div class="img-container mb-4">
          <img :src="photo" class="rounded w-full" />
        </div>
      </div>
      
    </div>


    <br />
  </vx-card>
</template>

<script>
import axios from 'axios';

export default {
  components: {
  },
  data () {
    return {
        images: [],
        file: '',
        loadingText: '',
        progressBar: 0,
        progress: '',
        err: '',
        loading: false,
        selectedFile: '',
        photo: '',
    }
  },
  created () {
    if ((localStorage.getItem('user-photo') !== null || localStorage.getItem('user-photo') !== undefined || localStorage.getItem('user-photo') !== '') && localStorage.getItem('user-photo') !== require('@/assets/images/user/user.png')){
      this.progressBar = 100
    }    
    if (localStorage.getItem('user-photo').slice(0, 4) !== 'http'){
      this.progressBar = 0
    }
    this.changePhoto()
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    isDisabled () {
      if (localStorage.getItem('user-photo') === null)
        return false
      else if (localStorage.getItem('user-photo') === require('@/assets/images/user/user.png'))
        return false
      else if (localStorage.getItem('user-photo').slice(0, 4) !== 'http'){
        return false
      }
      else
        return true
    },
    changePhoto() {
      // this.photo = this.$store.state.photo
      this.photo = localStorage.getItem('user-photo')
    },
		selectImage () {
			this.$refs.uploadInput.click()
		},
		updateUploadButton (e) {
			const fileName = e.target.value.split('\\').pop()
			if (fileName) {
				this.loadingText = fileName
				this.loading = true
				this.err = ''
			}
		},
		insertImage () {
			axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
			this.file = this.$refs.uploadInput.files[0]
			let formData = new FormData()
      formData.append('file', this.file)
      // console.log(formData)
      this.$store.getters.getId.then(id => { 
        axios.patch(`/image/add`, formData
          , {params: {
              id
            },
            onUploadProgress: (uploadEvent) => {
              this.progressBar = +Math.round(uploadEvent.loaded / uploadEvent.total * 100)
              this.progress = 'Upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%'
          }}
          ).then(response => {
              setTimeout(() => {
              console.log(response.data.errmsg)
                if (response.data.errmsg === null || response.data.errmsg === undefined){
                  // this.$store.mutations.photoURL(response.photo)
                  this.$store.dispatch('updatePhoto', response.data.photo)
                  console.log(this.$store.state.photo)
                  localStorage.setItem('user-photo', response.data.photo)
                  this.$store.state.photoURL = response.data.photo
                  this.photo = response.data.photo
                  this.loading = false
                  this.$refs.uploadInput.value = undefined
                  // this.$refs.uploadInput = undefined
                }
                else{
                  this.progressBar = 0
				          this.err = response.data.errmsg
                  this.loading = false
                  this.photo = this.$store.state.photo
                  this.$refs.uploadInput.value = undefined
                }
              }, 900)
            })
            .catch(e => {
            })
      })
		},
		deleteImage () {
      this.$store.getters.getId.then(id => { 
        axios.patch(`/image/${id}`)
          .then(result => {
            this.$store.dispatch('updatePhoto', require('@/assets/images/user/user.png'))
            // localStorage.removeItem('user-photo')
            localStorage.setItem('user-photo', require('@/assets/images/user/user.png'))
            this.photo = require('@/assets/images/user/user.png')
            this.loading = false
            this.$refs.uploadInput.value = undefined
            this.progressBar = 0
          })
          .catch(e => {
            console.log(e)
            this.progressBar = 0
          })
      })
		}
  }
}
</script>

<style>
  #avatar-col {
    width: 15rem;
  }

	.image-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 0px;
		height: 0px;
		overflow: hidden;
		opacity: 0;
	}

	.add-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 230px;
		background: #f2f2f3;
		background-size: cover;
		background-position: 50% 50%;
	}

	.remove-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 15px;
    	right: 15px;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		opacity: 0;
		transition: all 0.3s ease-in;
	}

	.remove-button:hover {
		opacity: 1;
	}
</style>
