/*
 * @Description: 导出pinia store并设置持久化
 */
import { createPinia } from "pinia"; // pinia
import type { App } from "vue";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
