import type { PiniaPluginContext } from 'pinia'

type PersistOpts = {
  key?: string
  paths?: string[] // optional: persist only these state paths
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | PersistOpts
  }
}

export function persistLocalStoragePlugin({ store, options }: PiniaPluginContext) {
  const persist = options.persist
  if (!persist) return

  const key = (typeof persist === 'object' && persist.key) || `pinia:${store.$id}`

  // 1) Rehydrate
  const fromLS = localStorage.getItem(key)
  if (fromLS) {
    try {
      const saved = JSON.parse(fromLS)
      store.$patch(saved)
    } catch {}
  }

  // 2) Subscribe and save
  const paths = typeof persist === 'object' && Array.isArray(persist.paths) ? persist.paths : null

  store.$subscribe(
    (_mutation, state) => {
      const toSave = paths
        ? paths.reduce(
            (acc, p) => {
              acc[p] = state[p]
              return acc
            },
            {} as Record<string, unknown>
          )
        : state

      localStorage.setItem(key, JSON.stringify(toSave))
    },
    { detached: true }
  )
}
