import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5f198444 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _4b351f51 = () => interopDefault(import('..\\pages\\authentication.vue' /* webpackChunkName: "pages/authentication" */))
const _66a8ec98 = () => interopDefault(import('..\\pages\\test_popup.vue' /* webpackChunkName: "pages/test_popup" */))
const _47d321cc = () => interopDefault(import('..\\pages\\workspace.vue' /* webpackChunkName: "pages/workspace" */))
const _6069fe6b = () => interopDefault(import('..\\pages\\projects\\_id\\index.vue' /* webpackChunkName: "pages/projects/_id/index" */))
const _46d6d773 = () => interopDefault(import('..\\pages\\projects\\_id\\office.vue' /* webpackChunkName: "pages/projects/_id/office" */))
const _13e81c2a = () => interopDefault(import('..\\pages\\projects\\_id\\report.vue' /* webpackChunkName: "pages/projects/_id/report" */))
const _55080eae = () => interopDefault(import('..\\pages\\projects\\_id\\setting.vue' /* webpackChunkName: "pages/projects/_id/setting" */))

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
    component: _5f198444,
    name: "about"
  }, {
    path: "/authentication",
    component: _4b351f51,
    name: "authentication"
  }, {
    path: "/test_popup",
    component: _66a8ec98,
    name: "test_popup"
  }, {
    path: "/workspace",
    component: _47d321cc,
    name: "workspace"
  }, {
    path: "/projects/:id",
    component: _6069fe6b,
    name: "projects-id"
  }, {
    path: "/projects/:id?/office",
    component: _46d6d773,
    name: "projects-id-office"
  }, {
    path: "/projects/:id?/report",
    component: _13e81c2a,
    name: "projects-id-report"
  }, {
    path: "/projects/:id?/setting",
    component: _55080eae,
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
