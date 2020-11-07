<template>
  <v-content class="home  py-5">
    <v-container fluid wrap>
      <v-layout row justify-center class="ma-4 px-5">
        <img src="@/assets/visibility.png" alt="" width="50px" class="my-0" />
        <v-toolbar-title class="my-0 color2 logo"> iJunte</v-toolbar-title>
      </v-layout>
<v-layout row wrap justify-center>
    
      <v-card flat  width="400px" color="#fafafa" class="">
          <!-- FORM STARTS -->
          <v-form ref="form" v-model="valid" lazy-validation >

    
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img :src="photoURL" alt />
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                  :value="displayName"
                  disabled
                />
              </v-layout>

              <v-text-field
                placeholder="Email"
                :value="email"
                disabled
              />


            <v-text-field
              v-model="username"
              :counter="10"
              :rules="nameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="Numero celular"
              required
              type="tel"
            ></v-text-field>


            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'Tienes que estar de acuerdo con nuestras politicas para continuar!']"
              label="Esta de acuerdo?"
              required
            ></v-checkbox>
            <v-layout row wrap justify-end>
                
            <v-btn  class="mr-4 azul2" @click="reset" rounded>
              Cancelar
            </v-btn>
            <v-btn
                rounded
              :disabled="!valid"
                dark
              class="azul5"
              @click="validate"
            >
              Confirmar
            </v-btn>
            </v-layout>


          </v-form>
          <!-- FORM ENDS -->
      </v-card>
</v-layout>
    </v-container>
  </v-content>
</template>
<script>
  export default {
    data: () => ({
        photoURL: "https://lh3.googleusercontent.com/-5M2WaEIxRkU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfQ6waT12umbptS90BE129NHPsbQg/photo.jpg?sz=46",
        displayName: "Waldo Milanes",
        email: "carlos@gmail.com",
    date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      valid: true,
      username: '',
      nameRules: [
        v => !!v || 'Es necesario crear un username',
        v => (v && v.length <= 10) || 'El username tiene que ser menor a 10 caracteres.',
      ],
      phone: '',
      phoneRules: [
        v => !!v || '',
        v => /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(v) || 'Tiene que ser un numero valido',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>