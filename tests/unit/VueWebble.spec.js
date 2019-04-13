import {
  shallowMount
} from '@vue/test-utils'
import VueWebble from '../../src/components/VueWebble.vue'

describe('VueTrix.vue', () => {
  it('renders valid elements', () => {
    const wrapper = shallowMount(VueWebble)

    // assert the component is rendered
    expect(wrapper.is(VueWebble)).toBe(true)
  })
})