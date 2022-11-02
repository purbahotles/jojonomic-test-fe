<template>
  <v-row style="background-color: #141414;">
    <v-col cols="12" md="6" offset-md="3" dark>
      <v-card dark>
        <section>
          <section v-if="loading">
            <sekeleton />
          </section>

          <!-- succes load data -->
          <section v-else>
            <v-card>
              <h1 class="text-center pt-5 pb-5">Football Club All Area
                <v-avatar color="error" size="40" >
                  <span class="white--text">{{ listDataAreas.length }}</span>
                </v-avatar>
              </h1>
            </v-card>
            <v-simple-table class="mt-5">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Country Code
                    </th>
                    <th class="text-left">
                      Area
                    </th>
                    <th class="text-left">
                      Flag
                    </th>
                    <th class="text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in listDataAreas"
                    :key="item.id"
                  >
                    <td>{{ item.name }}</td>
                    <td>{{ item.countryCode }}</td>
                    <td>{{ item.parentArea }}</td>
                    <td>
                      <template class="text-left">
                        <v-row justify="space-around">
                          <v-avatar size="45px">
                            <img
                              :src="item.ensignUrl"
                              alt="No Image"
                            >
                          </v-avatar>
                        </v-row>
                      </template>
                    </td>
                    <td>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="mx-2" fab dark small color="error" v-bind="attrs" v-on="on" @click="showDetail(item.id)">
                            <v-icon dark>
                              mdi-format-list-bulleted-square
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>Check Area</span>
                      </v-tooltip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <h1 v-if="this.listDataAreas.length <= 0">Harap Reload Kembali</h1>

            <template>
              <div>
                <v-row justify="center">
                  <v-dialog max-width="510" v-model="dialog" :fullscreen="$vuetify.breakpoint.smAndDown" transition="dialog-bottom-transition" scrollable class="mb-5 pb-5">
                      <v-card dark tile>
                        <v-card dark>
                          <v-btn icon dark @click="dialog = !dialog">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                          <v-toolbar-title class="text-center mb-5">All Football Clubs by Selecting</v-toolbar-title>
                        </v-card>
                        <v-card>
                            <v-list-item three-line>
                              <v-list-item-content>
                                <div class="text-overline mb-4">
                                  AREA: <span><b>{{ dataArea.area.name }}</b></span> <br />
                                  WEBSITE: <a :href="dataArea.website" target="_blank">{{dataArea.website}} <span v-if="!dataArea.website">404</span></a>
                                  
                                </div>
                                <v-list-item-title class="text-h5 mb-1">
                                  CLUBS: <b> {{ dataArea.name}} </b>
                                </v-list-item-title>
                                <v-list-item-subtitle><i> Club Colors: {{ dataArea.clubColors }}</i></v-list-item-subtitle>
                              </v-list-item-content>

                              <v-list-item-avatar tile size="100" color="grey">
                                <img
                                  :src="dataArea.crestUrl"
                                  alt="No Image"
                                />
                              </v-list-item-avatar>
                            </v-list-item>

                            <v-card class="mt-5 mb-5">
                              <template>
                                <v-row justify="center" error>
                                  <v-expansion-panels accordion>
                                    <v-expansion-panel style="background-color: red;">
                                      <v-expansion-panel-header>Player List</v-expansion-panel-header>
                                      <v-expansion-panel-content>
                                        <v-card>
                                          <v-simple-table class="mt-5">
                                            <template v-slot:default>
                                              <thead>
                                                <tr>
                                                  <th class="text-left">
                                                    Name
                                                  </th>
                                                  <th class="text-left">
                                                    Position
                                                  </th>
                                                  <th class="text-left">
                                                    Country Of Birth
                                                  </th>
                                                  <th class="text-left">
                                                    Action
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr
                                                  v-for="item in dataArea.squad"
                                                  :key="item.id"
                                                >
                                                  <td>{{ item.name }}</td>
                                                  <td>{{ item.position }}</td>
                                                  <td>{{ item.countryOfBirth }}</td>
                                                  <td>
                                                    <v-tooltip bottom>
                                                      <template v-slot:activator="{ on, attrs }">
                                                        <v-btn class="mx-2" fab dark small color="error" v-bind="attrs" v-on="on" @click="showProfile()">
                                                          <v-icon dark>
                                                             mdi-account-circle
                                                          </v-icon>
                                                        </v-btn>
                                                      </template>
                                                      <span>Player Detail</span>
                                                    </v-tooltip>
                                                  </td>
                                                </tr>
                                                <div v-if="dataArea.squad.length <= 0">
                                                  <h3 class="test">Data Not Found</h3>
                                                </div>
                                              </tbody>
                                            </template>
                                          </v-simple-table>
                                        </v-card>
                                      </v-expansion-panel-content>
                                    </v-expansion-panel>
                                  </v-expansion-panels>
                                </v-row>
                              </template>
                            </v-card>
                          </v-card>
                      </v-card>
                    </v-dialog>
                </v-row>
              </div>
            </template>



          </section>
          
          <!-- end succes load data -->
        </section>
      </v-card>

    </v-col>
  </v-row>
</template>

<script lang="ts">
// COMPONENT
import { Component, Vue } from 'vue-property-decorator'
import Sekeleton from '@/components/Sekeleton.vue'

// MODEL
import AreasModel from '@/models/partials/AreasModel'
import DetailAreaModel from '@/models/partials/DetailAreaModel'

// REST API
import api from '@/api'

@Component({
  components: {
    Sekeleton
  }
})

export default class Home extends Vue {

  listDataAreas: AreasModel[] = []
  dataArea: DetailAreaModel = new DetailAreaModel()
  loading = false
  dialog = false

  async created () {
    await this.getDataTable()
    if (!this.dataArea) {
      this.dataArea = Object.assign({}, this.dataArea)
      console.log(this.dataArea, 'this.dataArea ')
    } else {
      this.dataArea = new DetailAreaModel()
    }
    if (this.dataArea.area === undefined) {
      this.dataArea.area = new DetailAreaModel
    }
  }

  async getDataTable () {
    try {
      this.loading = true
      const response =  await api.getListDataAreas()
      this.listDataAreas = response.data.areas
    }
    catch (error) {
      alert(error)
    } finally {
      this.loading = false
    }
  }
  
  async showDetail (id: string) {
    try {
      this.loading = true
      const response =  await api.getDetails(id)
      this.dataArea = response.data
    }
    catch (error) {
      alert(error)
    } finally {
      this.loading = false
      this.dialog = true
    }
  }

  showProfile () {
    alert('profile')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  background-color: #141414 !important;
}
</style>
