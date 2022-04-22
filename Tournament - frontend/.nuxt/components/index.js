export { default as AppHeader } from '../..\\components\\AppHeader.vue'
export { default as ChooseTask } from '../..\\components\\ChooseTask.vue'
export { default as Cover } from '../..\\components\\Cover.vue'
export { default as CreatePopUp } from '../..\\components\\CreatePopUp.vue'
export { default as LoginForm } from '../..\\components\\LoginForm.vue'
export { default as PopUpCreate } from '../..\\components\\PopUpCreate.vue'
export { default as ProjectCard } from '../..\\components\\ProjectCard.vue'
export { default as RegisterForm } from '../..\\components\\RegisterForm.vue'
export { default as SearchBar } from '../..\\components\\SearchBar.vue'
export { default as User } from '../..\\components\\User.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
