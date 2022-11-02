<template>
  <v-row>
    <v-skeleton-loader
      class="mx-auto"
      dark
      v-bind="attrs"
      max-height="1200px"
      type="table-heading, table-thead, table-tbody, table-tbody, table-tbody, table-tfoot"
    ></v-skeleton-loader>
  </v-row>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class Sekeleton extends Vue {
  attrs = {
    class: 'mb-6',
    boilerplate: false,
    elevation: 9,
  }
}
</script>