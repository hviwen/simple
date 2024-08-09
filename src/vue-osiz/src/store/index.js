import {createPinia} from "pinia";
import {resetSetupStore} from './plugins';

export function setupStore(app) {
  const store = createPinia()

  store.use(resetSetupStore)

  app.use(store)
}