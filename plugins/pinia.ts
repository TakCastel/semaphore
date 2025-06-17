import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";
import localforage from "localforage";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();

  pinia.use(({ store }) => {
    if (import.meta.client) {
      const key = store.$id;

      localforage.getItem(key).then((value) => {
        if (value) {
          store.$patch(value);
        }
      });

      store.$subscribe((_mutation, state) => {
        const persistable = {
          savedFilms: JSON.parse(JSON.stringify(state.savedFilms)),
          seenFilms: JSON.parse(JSON.stringify(state.seenFilms)),
        };
        localforage.setItem(key, persistable);
      });
    }
  });

  nuxtApp.vueApp.use(pinia);
});
