import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b7fc4b86 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _094b7178 = () => interopDefault(import('..\\pages\\authentication.vue' /* webpackChunkName: "pages/authentication" */))
const _b3c3f57a = () => interopDefault(import('..\\pages\\Test_popup\\index.vue' /* webpackChunkName: "pages/Test_popup/index" */))
const _d7845976 = () => interopDefault(import('..\\pages\\workspace.vue' /* webpackChunkName: "pages/workspace" */))
const _f7e4515c = () => interopDefault(import('..\\pages\\projects\\_id\\index.vue' /* webpackChunkName: "pages/projects/_id/index" */))
const _885d6fd8 = () => interopDefault(import('..\\pages\\projects\\_id\\history.vue' /* webpackChunkName: "pages/projects/_id/history" */))
const _d0a3c928 = () => interopDefault(import('..\\pages\\projects\\_id\\office.vue' /* webpackChunkName: "pages/projects/_id/office" */))
const _c0e59860 = () => interopDefault(import('..\\pages\\projects\\_id\\setting.vue' /* webpackChunkName: "pages/projects/_id/setting" */))

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
    component: _b7fc4b86,
    name: "about"
  }, {
    path: "/authentication",
    component: _094b7178,
    name: "authentication"
  }, {
    path: "/Test_popup",
    component: _b3c3f57a,
    name: "Test_popup"
  }, {
    path: "/workspace",
    component: _d7845976,
    name: "workspace"
  }, {
    path: "/projects/:id",
    component: _f7e4515c,
    name: "projects-id"
  }, {
    path: "/projects/:id?/history",
    component: _885d6fd8,
    name: "projects-id-history"
  }, {
    path: "/projects/:id?/office",
    component: _d0a3c928,
    name: "projects-id-office"
  }, {
    path: "/projects/:id?/setting",
    component: _c0e59860,
    name: "projects-id-setting"
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
