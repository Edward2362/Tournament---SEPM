import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0ef91231 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _346b4ff5 = () => interopDefault(import('..\\pages\\Login\\index.vue' /* webpackChunkName: "pages/Login/index" */))
const _3d5e353e = () => interopDefault(import('..\\pages\\Signup\\index.vue' /* webpackChunkName: "pages/Signup/index" */))
const _2eb0ecf6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _0ef91231,
    name: "about"
  }, {
    path: "/Login",
    component: _346b4ff5,
    name: "Login"
  }, {
    path: "/Signup",
    component: _3d5e353e,
    name: "Signup"
  }, {
    path: "/",
    component: _2eb0ecf6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
