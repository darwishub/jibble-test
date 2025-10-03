import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock fetch for API calls
global.fetch = vi.fn()

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Vuetify components globally
config.global.stubs = {
  'v-card': { template: '<div class="v-card"><slot /></div>' },
  'v-card-item': { template: '<div class="v-card-item"><slot /></div>' },
  'v-card-actions': { template: '<div class="v-card-actions"><slot /></div>' },
  'v-btn': { 
    template: '<button class="v-btn" @click="$emit(\'click\')"><slot /></button>',
    emits: ['click']
  },
  'v-icon': { 
    template: '<i class="v-icon"></i>',
    props: ['icon']
  },
  'v-spacer': { template: '<div class="v-spacer"></div>' },
  'v-text-field': { 
    template: '<input class="v-text-field" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
    props: ['modelValue', 'label', 'prependInnerIcon', 'clearable'],
    emits: ['update:modelValue']
  },
  'v-alert': { 
    template: '<div class="v-alert"><slot /></div>',
    props: ['type', 'variant', 'text']
  },
  'v-skeleton-loader': { 
    template: '<div class="v-skeleton-loader"></div>',
    props: ['type']
  },
  'v-row': { template: '<div class="v-row"><slot /></div>' },
  'v-col': { 
    template: '<div class="v-col"><slot /></div>',
    props: ['cols', 'sm', 'md', 'lg']
  },
  'v-empty-state': { 
    template: '<div class="v-empty-state"></div>',
    props: ['headline', 'title', 'icon']
  },
  'v-pagination': { 
    template: '<div class="v-pagination"></div>',
    props: ['modelValue', 'length', 'totalVisible'],
    emits: ['update:modelValue']
  },
  'v-app': { template: '<div class="v-app"><slot /></div>' },
  'v-app-bar': { 
    template: '<div class="v-app-bar"><slot /></div>',
    props: ['flat']
  },
  'v-container': { 
    template: '<div class="v-container"><slot /></div>',
    props: ['class']
  },
  'v-main': { template: '<main class="v-main"><slot /></main>' }
}