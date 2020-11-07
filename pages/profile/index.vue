<template>
  <v-content class="home  py-0">
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
                <v-avatar size="65px">
                  <img :src="photoURL" alt class=" foto azul5" />
                </v-avatar>
              </v-tab>

              <v-tab>
                <v-icon>far fa-id-card</v-icon>
              </v-tab>

              <v-tab>
                <v-icon>far fa-heart</v-icon>
              </v-tab>

              <v-tab>
                <v-icon>fas fa-briefcase</v-icon>
              </v-tab>

              <v-tab>
                <v-icon>fas fa-user-graduate</v-icon>
              </v-tab>

              <v-tab>
                <v-icon>fas fa-laptop-code</v-icon>
              </v-tab>
            <!-- TABS ENDS -->

            <!-- BASIC INFO TAB STARTS -->
              <v-tab-item eager>
                <v-card class=" ma-2 azul1 elevation-5">
                  <v-card-title primary-title class="azul5 py-2 white--text elevation-15 work">
                      Información Básica
                       <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                  </v-card-title>
                  <v-layout column class="pa-3 elevation-15">
                    <span>Nombre: <span class="work">{{ displayName }}</span> </span>
                    <span>Sexo: <span class="work">{{ sexo }}</span> </span>
                    <span> Fecha de Nacimiento: <span class="work">{{ birthday }}</span> </span>
                    <span>Ciudad: <span class="work">{{ ciudad }}</span>  </span>
                  </v-layout>
                </v-card>
              </v-tab-item>
            <!-- BASIC INFO TAB ENDS -->

            <!-- CONTACT INFO TAB STARTS -->
              <v-tab-item>
                <v-card class="my-2 elevation-5">
                  <v-card-title primary-title  class="azul5 white--text elevation-15 py-2 work">
                      Contacto
                       <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                  </v-card-title>
                  <v-layout column class="pa-3  azul1 elevation-15">
                    <span>email: <span class="work">{{ email }}</span></span>
                    <span>
                      Username:
                      <span class="font-weight-bold red--text"><span class="work">{{ username }}</span></span>
                    </span>
                    <span>Telefono: <span class="work">{{ telefono }}</span> </span>
                    <span>Website: <span class="work">{{ website }}</span> </span>
                  </v-layout>
                </v-card>
              </v-tab-item>
            <!-- CONTACT INFO TAB ENDS -->

            <!-- PERSONAL INFO TAB STARTS -->
              <v-tab-item>
                <v-card class=" mt-2" flat>
                  <v-card-title primary-title  class="azul5 white--text elevation-10 py-2 work">
                      Informacion Personal
                      <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                  </v-card-title>
                  <v-layout column>
                    <v-card column class="pa-3 mb-2 azul1 elevation-5">
                      <span class="font-weight-bold work personal">Acerca de mi: </span
                      ><span>{{ aboutMe }}</span>
                    </v-card>
                    <v-card column class="pa-3 my-2 azul1 elevation-5">
                      <span class="font-weight-bold  work personal">intereses: </span
                      ><span>{{ interest }}</span>
                    </v-card>
                    <v-card column class="pa-3 my-2 azul1">
                      <span class="font-weight-bold  work personal">actividades: </span
                      ><span>{{ activities }}</span>
                    </v-card>
                  </v-layout>
                </v-card>
              </v-tab-item>
            <!-- PERSONAL INFO TAB ENDS -->

            <!-- WORK TAB STARTS -->
              <v-tab-item>
                <v-card flat>
                  <v-card-title primary-title class="work font-weight-bold">
                      Trabajo
                     <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                  </v-card-title>
                  <v-layout column>
                    <!-- job starts -->
                    <v-card flat>
                      <v-card-title primary-title class="py-2 azul5 elevation-15 white--text work">
                        Experiencia Laboral
                         <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                      </v-card-title>
                      <v-card
                        v-for="job in jobs"
                        :key="job.id"
                        class="azul1 pa-3 mb-3  elevation-5"
                      >
                        <v-layout column>
                          <span
                            >Organización:
                            <v-btn color="success" x-small>
                              <span class="work">{{
                                job.organization
                              }}</span></v-btn
                            ></span
                          >
                          <span>
                            Posición:
                            <span class=" work">{{ job.position }}</span>
                          </span>
                          <span
                            >Descripción:
                            <span class="work">{{ job.description }} </span>
                          </span>
                          <span
                            >Ciudad: <span class="work">{{ job.city }}</span>
                          </span>
                          <span
                            >Pais: <span class="work">{{ job.country }}</span>
                          </span>
                          <span
                            >Desde
                            <span class="work">{{ job.startYear }}</span> hasta
                            <span class="work">{{ job.endYear }}</span>
                          </span>
                        </v-layout>
                      </v-card>
                    </v-card>
                    <!-- job ends -->

                    <!-- recomendations starts -->
                      <v-card flat>
                        <v-card-title primary-title class="py-2 azul5 elevation-15 white--text work">
                          Recomendaciones
                        </v-card-title>

                        <v-card
                          v-for="item in recommendations"
                          :key="item.recommendedBy"
                          class="pa-2 mb-2 azul1 elevation-5"
                        >
                          <v-layout row justify-end>
                            <v-switch
                              class="ma-2"
                              v-model="item.showRecommendation"
                              label="mostrar"
                              color="#03254a"
                              :value="item.showRecommendation"
                              hide-details
                            ></v-switch>
                          </v-layout>
                          <v-layout column wrap class="my-2">
                            <span
                              >{{ item.recommendedBy | capitalize }}:
                              {{ item.recommendation }}
                            </span>
                            <span class="font-weight-black my-1"
                              >Recomendado por: {{ item.recommendedBy }} | Fecha:
                              {{ item.date }}
                            </span>
                          </v-layout>
                          <v-chip
                            v-for="tag in item.tags"
                            :key="tag.tag"
                            class="azul5 white--text"
                          >
                            {{ tag }}
                          </v-chip>
                        </v-card>
                      </v-card>
                    <!-- recomendations ends -->
                  </v-layout>
                </v-card>
              </v-tab-item>
            <!-- WORK TAB ENDS -->
            <!-- EDUCATION TAB STARTS -->
              <v-tab-item>
                <v-card flat>
                  <v-card-title primary-title class="work">
                      Educación
                       <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                  </v-card-title>
                  <v-layout column>
                  <!-- School STARTS -->
                    <v-card flat>
                      <v-card-title
                        primary-title
                        class="azul5 white--text elevation-10 py-2 work"
                       >
                        Escuela Basica
                         <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                      </v-card-title>
                      <v-card class="azul1 pa-3 elevation-5">
                        <v-layout column>
                          <span
                            >Escuela:
                            <v-btn color="success" x-small>
                              <span class="work">{{ school.name }}</span></v-btn
                            ></span
                          >
                          <span>
                            Ultimo año:
                            <span class=" work">{{ school.year }}</span>
                          </span>
                          <span
                            >Ciudad: <span class="work">{{ school.city }}</span>
                          </span>
                          <span
                            >Pais: <span class="work">{{ school.country }}</span>
                          </span>
                        </v-layout>
                      </v-card>
                      </v-card>
                    <!-- School ENDS -->
                    <!-- HIGH SCHOOL STARTS -->
                    <v-card flat class="py-2 my-2">
                      <v-card-title
                        primary-title
                        class="azul5 white--text elevation-10 py-2 work"
                      >
                        Escuela Secundaria
                         <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                      </v-card-title>
                      <v-card class="azul1 pa-3 elevation-5">
                        <v-layout column>
                          <span
                            >Escuela:
                            <v-btn color="success" x-small>
                              <span class="work">{{
                                highSchool.name
                              }}</span></v-btn
                            ></span
                          >
                          <span>
                            Ultimo año:
                            <span class=" work">{{ highSchool.year }}</span>
                          </span>
                          <span
                            >Especialización:
                            <span class="work">{{ highSchool.specialty }}</span>
                          </span>
                          <span>Ciudad:
                            <span class="work">{{ highSchool.city }}</span>
                          </span>
                          <span>Pais:
                            <span class="work">{{ highSchool.country }}</span>
                          </span>
                        </v-layout>
                      </v-card>
                    </v-card>
                    <!-- HIGH SCHOOL ENDS -->
                    <!-- COLLEGE STARTS -->
                    <v-card flat >
                      <v-card-title
                        primary-title
                        class="azul5 white--text elevation-10 py-2 work"
                      >
                        Educación Universitaria
                         <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                      </v-card-title>
                      <v-card class="azul1 pa-3 elevation-5">
                        <v-layout column>
                          <span
                            >Universidad:
                            <v-btn color="success" x-small>
                              <span class="work">{{ college.name }}</span></v-btn
                            ></span
                          >
                          <span class=" work"
                            >{{ college.startYear }} - {{ college.endYear }}
                          </span>
                          <span
                            >Carrera:
                            <span class="work">{{ college.career }}</span>
                          </span>
                          <span
                            >Campo de estudios:
                            <span class="work">{{ college.field }}</span>
                          </span>
                          <span
                            >Ciudad: <span class="work">{{ college.city }}</span>
                          </span>
                          <span
                            >Pais: <span class="work">{{ college.country }}</span>
                          </span>
                        </v-layout>
                      </v-card>
                    </v-card>
                    <!-- COLLEGE ENDS -->
                  </v-layout>
                </v-card>
              </v-tab-item>
            <!-- EDUCATION TAB ENDS -->
            <!-- PROGRAMMING TAB STARTS -->
                <v-tab-item eager>
                <v-card class=" ma-2 azul1 elevation-5">
                  <v-card-title primary-title class="azul5 py-2 white--text elevation-15 work">
                      Desarrollo de Software
                       <!-- edit btn starts -->
                        <v-layout row wrap justify-end>
                          <v-btn text dark x-small> <v-icon x-small class="mx-1">mdi-pencil</v-icon> editar</v-btn>
                        </v-layout>
                      <!-- edit btn ends -->
                  </v-card-title>
                  <v-layout column class="pa-3 elevation-15">
                    <span>Tipo de desarrollador: <span class="work">{{ programming.type }}</span> </span>
                    <span>Experiencia: <span class="work">{{ programming.experience }}</span> </span>
                    <span>Especializado en: <span class="work">{{ programming.specialized }}</span> </span>
                    <span class=" work">{{ programming.startDate }}</span>
                      <span>Tu Portafolio: <span class="work">{{ programming.portfolio}}</span> </span>
                    <v-divider></v-divider>
                    <v-card v-for="language in programming.languages" :key="language.name" class="my-1">
                      <v-card-title  class="py-1">
                        {{language.name}}
                      </v-card-title>
                      <v-layout column class="px-3">
                          <span>Nivel de dominio: <span class="work">{{ language.mastery }}</span> </span>
                          <span>Repositorio: <span class="work">{{ language.repository }}</span> </span>
                           <span class=" work"> Desde: {{ language.startYear }}</span>
                      </v-layout >
                    </v-card>
                  </v-layout>
                </v-card>
              </v-tab-item>
            <!-- PROGRAMMING TAB ENDS -->
          </v-tabs>

          <!-- tabs ends -->
        </v-layout>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      photoURL:
        "https://lh3.googleusercontent.com/-5M2WaEIxRkU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfQ6waT12umbptS90BE129NHPsbQg/photo.jpg?sz=46",
      displayName: "Carlos Milanes",
      recommendations: [
        {
          showRecommendation: true,
          recommendedBy: "James Buttler",
          recommendation:
            "Carlos Milanes volunteered for four years in the Women's Health ward at ZBD Community Hospital, where I am head nurse. During this time, she was a dependable volunteer who never missed a shift.  Carlos was an asset to the hospital. She was always cheerful and willing to assist with any task. In addition, Carlos was motivated and interested in learning. To this end, she often accompanied our care teams on their rounds so that she knew the status and needs of each individual patient. Carlos is relocating due to family circumstances, and, unfortunately, we will no longer be lucky enough to have her services.",
          tags: [
            "Hardworking",
            "Creative",
            "Responsible",
            "Team player",
            "Friendly",
            "Thinks outside the box",
            "Knowledgeable"
          ],
          date: new Date("October 23, 2019")
        },
        {
          showRecommendation: false,
          recommendedBy: "Maria Adames",
          recommendation:
            "Carlos’s wide-ranging intellect is such that he would be bored by most freshman- and sophomore-level Liberal Arts courses. He is ready to assume and excel in upper-division classwork, and possesses the self-motivation to successfully create and execute an independent course of honors study.",
          tags: [
            "Happy all the time",
            "Skillful",
            "Responsible",
            "Friendly",
            "Knowledgeable"
          ],
          date: new Date("April 23, 2018")
        }
      ],
      jobs: [
        {
          organization: "Banco BHD",
          position: "Cajero",
          description: "Trabaje dando servicio al cliente",
          country: "República Dominicana",
          city: "Santo Domingo",
          startYear: 2005,
          endYear: 2015
        },
        {
          organization: "Altice Dominicana",
          position: "Junior programmer",
          description: "Programador de pagina web (Frontend",
          country: "República Dominicana",
          city: "Santiago",
          startYear: 2005,
          endYear: 2015
        }
      ],
      school: {
        name: "La Julia",
        year: "2002",
        city: "Santo Domingo Norte",
        country: "República Dominicana"
      },
      highSchool: {
        name: "Liceo Juan Pablo Duarte",
        year: "2007",
        city: "Santo Domingo Norte",
        country: "República Dominicana",
        specialty: "Tecnico en Electronica"
      },
      college: {
        name: "Universidad Autonoma de Santo Domingo",
        startYear: "2008",
        endYear: "2011",
        city: "Distrito Nacional",
        country: "República Dominicana",
        career: "Ingenieria en sistemas",
        field: "Ingenieria, computacion"
      },
      email: "carlos@gmail.com",
      telefono: "904-343-4334",
      username: "elValdor",
      sexo: "masculino",
      birthday: `December 31, 1989`,
      tab: true,
      ciudad: "Santiago",
      activities:
        "Dentro del sector artístico o de medios de comunicación, los hobbies que pueden aparecer en tu CV son:Cantar, Tocar algún instrumento musical, Componer música, Danza, Teatro, Fotografía, Pintura, Cocina, Poesía, Escritura, Blogging, Turismo",
      interest:
        "medio ambiente, la lucha social, la sociedad 2.0, etc. Recordemos que en ciertos casos esta vinculación puede ser contraproducente, así que a menudo deberemos omitir algunos aspectos dependiendo de a qué empleador apuntemos.",
      website: "https://www.carlosmilanes.com/",
      aboutMe:
        "For the past 10 years, I have been working as a language educator, school administrator, and project manager. In 2017, as a resolution, I decided to pursue my other big passion; 'Computer Programming'. Since then, I have been steadily acquiring knowledge and experience in various technologies of the field, especially the ones related to web development. Ultimately, my aim is to switch careers. I think of myself as open-minded, resilient, thoughtful, and adaptable. I’m a big dreamer but with a down-to-earth mindset. Therefore, I strongly believe that you have to work hard to get what you want in life. My motto is \"We are a living project that should never stop growing and changing\".",
      mobilePort: true,
      programming:{
        experience: "Junior Programmer",
        specialized: "VueJS",
        type: "Fullstack",
        portfolio: "https://www.carlosmilanes.com/",
        startDate: Date('july, 20, 2017'),
        languages: [
          {
          name: "JavaScript",
          mastery: 10,
          repository: "https://github.com/waldo237/server-ijunte",
          startYear: "2018"
        },
          {
          name: "Java",
          mastery: 6,
          repository: "https://github.com/waldo237/java",
          startYear: "2017"
        },
        ]

      }
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    }
  },
  methods: {
    mobileSize() {
      if (process.browser){  //this helps the window object work in nuxt
        if (window.innerWidth <= 900) {
          this.mobilePort = false;
        } else {
          this.mobilePort = true;
        }
        return this.mobilePort;

      }
    }
  },
  created() {
   if (process.browser) window.addEventListener("resize", this.mobileSize);
    this.mobileSize();
  },
  destroyed() {
  if (process.browser)  window.removeEventListener("resize", this.mobileSize);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oswald&display=swap");
.foto {
  padding: 2px;
}
.avatar {
  position: absolute !important;
  top: 40px;
  left: 20px;
  z-index: 1;
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
.personal {
  font-size: 120% !important;
}
@media (min-width: 900px) {
}
</style>
