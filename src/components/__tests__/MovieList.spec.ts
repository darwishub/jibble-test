import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieList from '../MovieList.vue'
import { createPinia, setActivePinia } from 'pinia'

const mockJson = vi.fn()
global.fetch = vi.fn().mockResolvedValue({ ok: true, json: mockJson })

describe('MovieList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockJson.mockResolvedValue({
      page: 1,
      per_page: 10,
      total: 1,
      total_pages: 1,
      data: [{ Title: 'ABCD', Year: '2000', imdbID: 'tt0000' }],
    })
  })

  it('loads and shows results', async () => {
    const wrapper = mount(MovieList)
    await new Promise((r) => setTimeout(r, 0))
    expect(wrapper.text()).toContain('ABCD')
  })
})
