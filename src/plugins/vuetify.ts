// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify, {
  VCard,
  VRating,
  VToolbar,
  VList,
  VListItem,
  VListItemAction,
  VListItemContent,
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VCard,
    VRating,
    VToolbar,
    VList,
    VListItem,
    VListItemAction,
    VListItemContent,
  },
  directives: {
    Ripple,
  },
})

const opts = {}

export default new Vuetify(opts)