<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">

    <!-- Avatar Row -->
    <div class="vx-row" style="padding-bottom:30px">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img :src="data.photo" class="mr-8 rounded h-24 w-24" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ data.firstname +' '+data.lastname  }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->
    <div v-if="this.lang != 'de' && this.lang != 'sp'" class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

        <vs-input class="w-full mt-4" label="First Name" v-model="data_local.firstname" v-validate="'required|alpha_spaces'" name="firstname" />
        <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
       
        <vs-input class="w-full mt-4" label="Last Name" v-model="data_local.lastname" v-validate="'required|alpha_spaces'" name="lastname" />
        <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>



        <vs-input class="w-full mt-4" label="Address 1" v-model="data_local.address1"  name="address1" />
        <span class="text-danger text-sm"  v-show="errors.has('address1')">{{ errors.first('address1') }}</span>
                <!-- langs -->
        <div class="mt-8">
          <label class="text-sm">Languages</label>
          <v-select v-model="data_local.languages" :closeOnSelect="true" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <vs-input class="w-full mt-4" label="Address 2" v-model="data_local.address2"  name="address2" />
        <span class="text-danger text-sm"  v-show="errors.has('address2')">{{ errors.first('address2') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <div class="mt-4">
          <label class="vs-input--label">Role</label>
          <v-select v-model="data_local.usertype" :clearable="false" :options="roleOptions" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
        </div>
        
        <vs-input class="w-full mt-4" label="City" v-model="data_local.city" name="city" />
        <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span>

        <vs-input class="w-full mt-4" label="Postal" v-model="data_local.postal"  name="postal" />
        <span class="text-danger text-sm"  v-show="errors.has('postal')">{{ errors.first('postal') }}</span>

        <vs-input class="w-full mt-4" label="Country" v-model="data_local.country" name="country" />
        <span class="text-danger text-sm"  v-show="errors.has('country')">{{ errors.first('country') }}</span>

                <!-- dob -->
        <div class="mt-8">
          <label class="text-sm">Birth Date</label>
          <flat-pickr v-model="data_local.birthdate" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>
        <!-- phone Number -->
        <!-- <span class="text-danger text-sm">{{ errors.first('phone') }}</span><br /> -->
        <span class="text-danger text-sm" v-show="isPhoneValid">The phone number must be valid.</span><br />
        <vs-input
        name="phone"
        type="phone"
        label-placeholder="Phone"
        placeholder="Phone (Starting with the country code)"
        v-model="data_local.phone"
        class="w-full mt-6" />

      </div>
    </div>

    <div v-if="this.lang == 'sp'"  class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

        <vs-input class="w-full mt-4" label="Primer nombre" v-model="data_local.firstname" v-validate="'required|alpha_spaces'" name="firstname" />
        <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
       
        <vs-input class="w-full mt-4" label="Apellido" v-model="data_local.lastname" v-validate="'required|alpha_spaces'" name="lastname" />
        <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>



        <vs-input class="w-full mt-4" label="Habla a 1" v-model="data_local.address1"  name="address1" />
        <span class="text-danger text-sm"  v-show="errors.has('address1')">{{ errors.first('address1') }}</span>
                <!-- langs -->
        <div class="mt-8">
          <label class="text-sm">Idiomas</label>
          <v-select v-model="data_local.languages" :closeOnSelect="true" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <vs-input class="w-full mt-4" label="Habla a 2" v-model="data_local.address2"  name="address2" />
        <span class="text-danger text-sm"  v-show="errors.has('address2')">{{ errors.first('address2') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <div class="mt-4">
          <label class="vs-input--label">Papel</label>
          <v-select v-model="data_local.usertype" :clearable="false" :options="roleOptions" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
        </div>
        
        <vs-input class="w-full mt-4" label="Ciudad" v-model="data_local.city" name="city" />
        <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span>

        <vs-input class="w-full mt-4" label="Postal" v-model="data_local.postal"  name="postal" />
        <span class="text-danger text-sm"  v-show="errors.has('postal')">{{ errors.first('postal') }}</span>

        <vs-input class="w-full mt-4" label="País" v-model="data_local.country" name="country" />
        <span class="text-danger text-sm"  v-show="errors.has('country')">{{ errors.first('country') }}</span>

                <!-- dob -->
        <div class="mt-8">
          <label class="text-sm">Fecha de nacimiento</label>
          <flat-pickr v-model="data_local.birthdate" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>
        <!-- phone Number -->
        <!-- <span class="text-danger text-sm">{{ errors.first('phone') }}</span><br /> -->
        <span class="text-danger text-sm" v-show="isPhoneValid">El número de teléfono debe ser válido.</span><br />
        <vs-input
        name="phone"
        type="phone"
        label-placeholder="Telefono"
        placeholder="Teléfono (a partir del código del país)"
        v-model="data_local.phone"
        class="w-full mt-6" />

      </div>
    </div>

    <div v-if="this.lang == 'de'"  class="vx-row">
      <div class="vx-col md:w-1/2 w-full">

        <vs-input class="w-full mt-4" label="Vorname" v-model="data_local.firstname" v-validate="'required|alpha_spaces'" name="firstname" />
        <span class="text-danger text-sm"  v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
       
        <vs-input class="w-full mt-4" label="Nachname" v-model="data_local.lastname" v-validate="'required|alpha_spaces'" name="lastname" />
        <span class="text-danger text-sm"  v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>



        <vs-input class="w-full mt-4" label="Adresse 1" v-model="data_local.address1"  name="address1" />
        <span class="text-danger text-sm"  v-show="errors.has('address1')">{{ errors.first('address1') }}</span>
                <!-- langs -->
        <div class="mt-8">
          <label class="text-sm">Sprachen</label>
          <v-select v-model="data_local.languages" :closeOnSelect="true" :options="langOptions" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
        </div>

        <vs-input class="w-full mt-4" label="Adresse 2" v-model="data_local.address2"  name="address2" />
        <span class="text-danger text-sm"  v-show="errors.has('address2')">{{ errors.first('address2') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <div class="mt-4">
          <label class="vs-input--label">Rolle</label>
          <v-select v-model="data_local.usertype" :clearable="false" :options="roleOptions" v-validate="'required'" name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          <span class="text-danger text-sm"  v-show="errors.has('role')">{{ errors.first('role') }}</span>
        </div>
        
        <vs-input class="w-full mt-4" label="Stadt" v-model="data_local.city" name="city" />
        <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span>

        <vs-input class="w-full mt-4" label="Post" v-model="data_local.postal"  name="postal" />
        <span class="text-danger text-sm"  v-show="errors.has('postal')">{{ errors.first('postal') }}</span>

        <vs-input class="w-full mt-4" label="Land" v-model="data_local.country" name="country" />
        <span class="text-danger text-sm"  v-show="errors.has('country')">{{ errors.first('country') }}</span>

                <!-- dob -->
        <div class="mt-8">
          <label class="text-sm">Geburtstag</label>
          <flat-pickr v-model="data_local.birthdate" :config="{ dateFormat: 'd F Y' }" class="w-full" />
        </div>
        <!-- phone Number -->
        <!-- <span class="text-danger text-sm">{{ errors.first('phone') }}</span><br /> -->
        <span class="text-danger text-sm" v-show="isPhoneValid">Die Telefonnummer muss gültig sein.</span><br />
        <vs-input
        name="phone"
        type="phone"
        label-placeholder="Telefon"
        placeholder="Telefon (beginnend mit der Landesvorwahl)"
        v-model="data_local.phone"
        class="w-full mt-6" />

      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div v-if="this.lang == 'sp'"  class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Guardar cambios</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reiniciar</vs-button>
        </div>

        <div v-if="this.lang == 'de'"  class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Änderungen speichern</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Zurücksetzen</vs-button>
        </div>

        <div v-if="this.lang != 'de' && this.lang != 'sp'"  class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import axios from 'axios';
import phone from 'phone'

export default {
  components: {
    vSelect,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

      data_local: JSON.parse(JSON.stringify(this.data)),
      roleOptions: [
        { label: 'Admin',  value: 'admin' },
        { label: 'User',  value: 'user' },
        { label: 'Customer',  value: 'customer' },
        { label: 'Partner',  value: 'partner' },
        ],

      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Spanish',   value: 'spanish'   },
        { label: 'German',   value: 'german'   },
      ],
      langs:[]}
  },
  created() {
    // console.log(this.data_local.languages__ob__.label)
  },
  computed: {
    lang() {
      this.graphComponent += 1
      return this.$i18n.locale
    },
    role_local: {
      get () {
        return { label: this.capitalize(this.data_local.usertype),  value: this.data_local.usertype  }
      },
      set (obj) {
        this.data_local.usertype = obj.usertype
      }
    },
    validateForm () {
      return !this.errors.any()
    },
    isDisabled () {
      // return this.dob !== null && this.langs.length > 0
      return false
    },
    isPhoneValid () {
      if (this.data_local.phone === '' || this.data_local.phone === undefined) {
        return false
      }
      else if (phone(this.data_local.phone).length > 0) {
        this.validphone = phone(this.phone)[0]
        return false
      }
      else {
        return true
      }
    }
  },
  methods: {
    capitalize (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return
      // if (this.data_local.phone === undefined)
      //   this.data_local.phone = ''
      if (this.data_local.languages.__ob__.value.label != null){
        // console.log(this.data_local.languages.__ob__.value.label)
        this.langs.push(this.data_local.languages.__ob__.value.label);
      }
      this.data_local.languages = []
      this.data_local.languages=this.langs;
      this.data_local.usertype=this.data_local.usertype.value;
      this.data_local.id=this.data_local._id;
      this.data_local.photo=null;
      console.log(this.data_local)
      return new Promise((resolve, reject) => {
        axios.patch('/user/edit', this.data_local).then(resp => {
        this.colorAlert='primary';
        if (this.lang == 'de'){
          this.$vs.notify({
              title: 'Erfolg',
              text: 'Benutzer erfolgreich aktualisiert',
              color: this.colorAlert,
              iconPack: 'feather',
              position: 'top-center',
              icon:'icon-check'
          })
        }
        else if (this.lang == 'sp'){
          this.$vs.notify({
              title: 'Éxito',
              text: 'Usuario actualizado con éxito',
              color: this.colorAlert,
              iconPack: 'feather',
              position: 'top-center',
              icon:'icon-check'
          })
        }
        else{
          this.$vs.notify({
              title: 'Success',
              text: 'User updated succesfully',
              color: this.colorAlert,
              iconPack: 'feather',
              position: 'top-center',
              icon:'icon-check'
          })
        }
        resolve(resp)
        }).catch(err => {
            this.colorAlert='danger';
            if (this.lang == 'de'){
              this.$vs.dialog({
                color: this.colorAlert,
                title: 'Ein Fehler ist aufgetreten',
                accept: this.acceptAlert
              })
            }
            else if (this.lang == 'sp'){
              this.$vs.dialog({
                color: this.colorAlert,
                title: 'Ocurrió un error',
                accept: this.acceptAlert
              })
            }
            else{
              this.$vs.dialog({
                color: this.colorAlert,
                title: 'An Error occured',
                accept: this.acceptAlert
              })
            }
            reject(err)
        })
    });
    },
    reset_data () {
      this.data_local = JSON.parse(JSON.stringify(this.data))
    },
    update_avatar () {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    }
  }
}
</script>
