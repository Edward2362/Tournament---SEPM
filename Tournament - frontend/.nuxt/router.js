import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _36921214 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _49b71b81 = () => interopDefault(import('..\\pages\\authentication.vue' /* webpackChunkName: "pages/authentication" */))
const _71b0479c = () => interopDefault(import('..\\pages\\workspace.vue' /* webpackChunkName: "pages/workspace" */))
const _47aa169b = () => interopDefault(import('..\\pages\\projects\\_id\\index.vue' /* webpackChunkName: "pages/projects/_id/index" */))
const _095ad91d = () => interopDefault(import('..\\pages\\projects\\_id\\history.vue' /* webpackChunkName: "pages/projects/_id/history" */))
const _4799c543 = () => interopDefault(import('..\\pages\\projects\\_id\\office.vue' /* webpackChunkName: "pages/projects/_id/office" */))
const _25d2764e = () => interopDefault(import('..\\pages\\projects\\_id\\setting.vue' /* webpackChunkName: "pages/projects/_id/setting" */))

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
    component: _36921214,
    name: "about"
  }, {
    path: "/authentication",
    component: _49b71b81,
    name: "authentication"
  }, {
    path: "/workspace",
    component: _71b0479c,
    name: "workspace"
  }, {
    path: "/projects/:id",
    component: _47aa169b,
    name: "projects-id"
  }, {
    path: "/projects/:id?/history",
    component: _095ad91d,
    name: "projects-id-history"
  }, {
    path: "/projects/:id?/office",
    component: _4799c543,
    name: "projects-id-office"
  }, {
    path: "/projects/:id?/setting",
    component: _25d2764e,
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
