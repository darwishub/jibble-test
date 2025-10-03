import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '../MovieCard.vue'
import { createPinia, setActivePinia } from 'pinia'
import { vuetify } from '../../tests/setup'

describe('MovieCard', () => {
  setActivePinia(createPinia())

  const movie = { Title: 'Test', Year: '2020', imdbID: 'tt1234567' }

  it('renders title/year/id', () => {
    const wrapper = mount(MovieCard, { 
      props: { movie },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toContain('Test')
    expect(wrapper.text()).toContain('2020')
    expect(wrapper.text()).toContain('tt1234567')
  })

  it('toggles favorite on click', async () => {
    const wrapper = mount(MovieCard, { 
      props: { movie },
      global: {
        plugins: [vuetify]
      }
    })
    const btn = wrapper.find('button')
    await btn.trigger('click')
    expect(wrapper.text()).toContain('Unstar')
  })
})