<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.id">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">&nbsp;{{ activeUserInfo.firstname }}&nbsp;{{ activeUserInfo.lastname }}</p>
      <small>&nbsp;{{ activeUserInfo.usertype }}</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <!-- <img key="onlineImg" :src="this.$store.state.photoUrl" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" /> -->
        <!-- <img key="onlineImg" :src="activeUserInfo.photoURL" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" /> -->
        <img key="onlineImg" :src="photoURL" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li
            v-if="this.lang == 'de'" 
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/profile').catch(() => {})">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profil</span>
          </li>
          <li
            v-if="this.lang == 'sp'" 
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/profile').catch(() => {})">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Perfil</span>
          </li>
          <li
            v-if="this.lang != 'de' && this.lang != 'sp'" 
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/profile').catch(() => {})">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profile</span>
          </li>

          <vs-divider class="m-1" />

          <li
            v-if="this.lang == 'de'" 
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Ausloggen</span>
          </li>
          <li
            v-if="this.lang == 'sp'" 
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Cerrar sesión</span>
          </li>
          <li
            v-if="this.lang != 'de' && this.lang != 'sp'" 
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    photoURL () {
      if (localStorage.getItem('user-photo').slice(0, 4) !== 'http'){
        return require('@/assets/images/user/user.png')
      }
      else{
        return localStorage.getItem('user-photo')
      }
    },
    activeUserInfo () {
      if (this.$store.state.tempUserObj.token !== undefined) {
        var obj = {
          id: this.$store.state.tempUserObj.id,
          firstname: this.$store.state.tempUserObj.firstname,
          lastname: this.$store.state.tempUserObj.lastname,
          about: this.$store.state.tempUserObj.about,
          // photoURL: this.$store.state.tempUserObj.photoURL === undefined ? require('@/assets/images/user/user.png') : this.$store.state.AppActiveUser.photoURL,
          photoURL: localStorage.getItem('user-photo')=== undefined ? require('@/assets/images/user/user.png') : localStorage.getItem('user-photo'),
          usertype: this.$store.state.tempUserObj.usertype,
          email: this.$store.state.tempUserObj.email
        }
        if (obj.photoURL === null || obj.photoURL === undefined){
          obj.photoURL = require('@/assets/images/user/user.png')
        }
      }
      else {
        var obj = {
          id: this.$store.state.AppActiveUser.id,
          firstname: this.$store.state.AppActiveUser.firstname,
          lastname: this.$store.state.AppActiveUser.lastname,
          about: this.$store.state.AppActiveUser.about,
          photoURL: this.$store.state.AppActiveUser.photoURL === "undefined" ? require('@/assets/images/user/user.png') : this.$store.state.AppActiveUser.photoURL,
          usertype: this.$store.state.AppActiveUser.usertype,
          email: this.$store.state.AppActiveUser.email
        }
        if (obj.photoURL === null || obj.photoURL === undefined){
          obj.photoURL = require('@/assets/images/user/user.png')
        }
      }
      console.log(obj)
      return obj
    }
  },
  methods: {
    logout () {
      // this.$router.replace({ name: 'page-login', force: true });
      this.$store.dispatch('logout').then(() => {
        // This is just for demo Purpose. If user clicks on logout -> redirect
        // this.$router.push('/pages/login').catch(() => {})
        // setTimeout(() => {
        //   console.log("now the then runs")
        //   this.$router.replace('/pages/login')
        // }, 2000)
        this.$router.replace('/pages/login')
      })
      .catch(err => {
        console.log("errrrrr")
        setTimeout(() => {
          console.log("now the catch runs")
          this.$router.replace('/pages/login')
        }, 1)
      })
      this.$vs.notify({
        title: 'Success',
        text: 'You logged out successfully',
        color: 'primary',
        iconPack: 'feather',
        position: 'top-center',
        icon:'icon-check'
      })
    }
  }
}
</script>
