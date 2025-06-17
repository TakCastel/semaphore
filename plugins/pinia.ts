import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";
import localforage from "localforage";

export default defineNuxtPlugin(async (nuxtApp) => {
  const pinia = createPinia();

  // Liste des stores à persister
  const STORES_TO_PERSIST = ["film"];

  pinia.use(async ({ store }) => {
    if (import.meta.client && STORES_TO_PERSIST.includes(store.$id)) {
      const key = store.$id;

      // 1. Charger la sauvegarde AVANT tout
      const saved = await localforage.getItem(key);
      if (saved && typeof saved === "object") {
        store.$patch(saved);
      }

      // 2. Ecouter et sauvegarder ensuite SEULEMENT
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
