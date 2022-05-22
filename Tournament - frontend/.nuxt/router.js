import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2a9a8a62 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _3a161af3 = () => interopDefault(import('..\\pages\\authentication.vue' /* webpackChunkName: "pages/authentication" */))
const _140d093a = () => interopDefault(import('..\\pages\\test_popup.vue' /* webpackChunkName: "pages/test_popup" */))
const _7df02e2c = () => interopDefault(import('..\\pages\\workspace.vue' /* webpackChunkName: "pages/workspace" */))
const _45d78ee6 = () => interopDefault(import('..\\pages\\projects\\_id\\index.vue' /* webpackChunkName: "pages/projects/_id/index" */))
const _5f73e191 = () => interopDefault(import('..\\pages\\projects\\_id\\office.vue' /* webpackChunkName: "pages/projects/_id/office" */))
const _0ea8fc09 = () => interopDefault(import('..\\pages\\projects\\_id\\report.vue' /* webpackChunkName: "pages/projects/_id/report" */))
const _5eff9b6a = () => interopDefault(import('..\\pages\\projects\\_id\\setting.vue' /* webpackChunkName: "pages/projects/_id/setting" */))

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
    component: _2a9a8a62,
    name: "about"
  }, {
    path: "/authentication",
    component: _3a161af3,
    name: "authentication"
  }, {
    path: "/test_popup",
    component: _140d093a,
    name: "test_popup"
  }, {
    path: "/workspace",
    component: _7df02e2c,
    name: "workspace"
  }, {
    path: "/projects/:id",
    component: _45d78ee6,
    name: "projects-id"
  }, {
    path: "/projects/:id?/office",
    component: _5f73e191,
    name: "projects-id-office"
  }, {
    path: "/projects/:id?/report",
    component: _0ea8fc09,
    name: "projects-id-report"
  }, {
    path: "/projects/:id?/setting",
    component: _5eff9b6a,
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
