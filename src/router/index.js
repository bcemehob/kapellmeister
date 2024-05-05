import { createRouter, createWebHistory } from 'vue-router'
import Conductor from "@/views/Conductor.vue"
import PatternEditor from "@/views/editor/PatternEditor.vue"
import PageNotFound from "@/views/PageNotFound";

const routes = [
  {
    path: '/',
    name: 'Conductor',

    component: Conductor
  },
  {
    path: '/pattern-editor',
    name: 'PatternEditor',

    component: PatternEditor
  },
  {
    //regular expression used for mnin page is not found
    path: '/:patchMatch(.*)*',
    name: 'PageNotFound',

    component: PageNotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
