<template>
  <div
    v-shortkey="['ctrl', '/']"
    class="d-flex flex-grow-1"
    @shortkey="onKeyup"
  >
    <!-- Navigation -->
    <v-navigation-drawer
      permanent
      expand-on-hover
      v-model="drawer"
      app
      floating
      class="elevation-1"
      :right="$vuetify.rtl"
      :light="menuTheme === 'light'"
      :dark="menuTheme === 'dark'"
    >
      <!-- Navigation menu -->
      <main-menu :menu="navigation.menu" />
      <!-- Navigation menu footer -->
      <template v-slot:append>
        <v-row justify="space-around" class="py-4" permanent
      expand-on-hover>
          <v-icon large color="red darken-2">mdi-logout-variant</v-icon>
        </v-row>

        <!-- <div class="py-4 px-1 text-center" justify="space-around">
          <v-btn
            class="buy-button"
            dark
            block
            color="red"
            target="_blank"
          >
            <v-icon medium>mdi-logout-variant</v-icon>
          </v-btn>
        </div> -->

      </template>
    </v-navigation-drawer>
    <!-- Toolbar -->
    <v-main>
      <v-container class="fill-height" :fluid="!isContentBoxed">
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>
      <v-footer app inset>
        <v-spacer></v-spacer>
      </v-footer>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import config from '../configs'
import MainMenu from '../components/navigation/MainMenu'

export default {
  components: {
    MainMenu
  },
  data() {
    return {
      drawer: null,
      showSearch: false,
      navigation: config.navigation
    }
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached'])
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus()
    }
  }
}
</script>