export { default as AddTasks } from '../..\\components\\AddTasks.vue'
export { default as AppHeader } from '../..\\components\\AppHeader.vue'
export { default as ChooseTask } from '../..\\components\\ChooseTask.vue'
export { default as CoverCard } from '../..\\components\\CoverCard.vue'
export { default as CoverTask } from '../..\\components\\CoverTask.vue'
export { default as LoginForm } from '../..\\components\\LoginForm.vue'
export { default as MemberCard } from '../..\\components\\MemberCard.vue'
export { default as PopUpCreate } from '../..\\components\\PopUpCreate.vue'
export { default as ProjectCard } from '../..\\components\\ProjectCard.vue'
export { default as ProjectMenu } from '../..\\components\\ProjectMenu.vue'
export { default as RegisterForm } from '../..\\components\\RegisterForm.vue'
export { default as ReportCard } from '../..\\components\\ReportCard.vue'
export { default as SearchBar } from '../..\\components\\SearchBar.vue'
export { default as Task } from '../..\\components\\Task.vue'
export { default as Tasks } from '../..\\components\\Tasks.vue'
export { default as TrelloCard } from '../..\\components\\TrelloCard.vue'
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
