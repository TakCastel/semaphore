import { defineStore } from "pinia";
import { useFiltersStore } from "./useFilters";
import { useRuntimeConfig } from "#app/nuxt";

export const useFilmStore = defineStore("film", {
  state: () => ({
    // Film brut récupéré depuis TMDB
    film: null as any | null,

    // Liste des films enregistrés, formatés avec poster complet
    savedFilms: [] as any[],

    // Liste des films vus, formatés avec poster complet
    seenFilms: [] as any[],

    // Indique si un chargement est en cours
    loading: false,

    // Indicateur pour savoir si les filtres ont été élargis faute de résultats
    fallbackTriggered: false,
  }),

  getters: {
    /**
     * Retourne l'URL complète du poster pour le film courant.
     */
    poster(state) {
      if (!state.film?.poster_path) return null;
      return `https://image.tmdb.org/t/p/w500${state.film.poster_path}`;
    },

    /**
     * Vérifie si un film est déjà enregistré.
     */
    isSaved: (state) => (id: number) =>
      state.savedFilms.some((f) => f.id === id),

    /**
     * Vérifie si un film est déjà marqué comme vu.
     */
    isSeen: (state) => (id: number) => state.seenFilms.some((f) => f.id === id),
  },

  actions: {
    /**
     * Récupère un film aléatoire en fonction des filtres actifs.
     * Élargit progressivement les critères si aucun résultat n'est trouvé.
     */
    async fetchRandomFilm() {
      this.loading = true;
      this.film = null;

      const config = useRuntimeConfig();
      const filtersStore = useFiltersStore();

      let currentFilters = {
        genre: filtersStore.genre,
        language: filtersStore.language,
        yearMin: filtersStore.yearMin,
        yearMax: filtersStore.yearMax,
        includeAdult: filtersStore.includeAdult,
      };

      const maxPages = 500;
      const maxAttempts = 50;
      let step = 0;

      try {
        this.fallbackTriggered = false;

        while (!this.film && step < maxAttempts) {
          // Snapshot des valeurs du store pour éviter de manipuler les refs directement
          currentFilters = {
            genre: filtersStore.genre,
            language: filtersStore.language,
            yearMin: filtersStore.yearMin,
            yearMax: filtersStore.yearMax,
            includeAdult: filtersStore.includeAdult,
          };

          // Élargit progressivement les critères de recherche
          if (step >= 5) currentFilters.includeAdult = true;
          if (step >= 4) currentFilters.language = "";
          if (step >= 3) currentFilters.genre = "";
          if (step >= 2) {
            currentFilters.yearMin = null;
            currentFilters.yearMax = null;
          }

          const page = Math.floor(Math.random() * maxPages) + 1;

          const res = await $fetch(
            "https://api.themoviedb.org/3/discover/movie",
            {
              params: {
                api_key: config.public.tmdbApiKey,
                language: "fr-FR",
                with_original_language: currentFilters.language || undefined,
                with_genres: currentFilters.genre || undefined,
                "primary_release_date.gte": currentFilters.yearMin
                  ? `${currentFilters.yearMin}-01-01`
                  : undefined,
                "primary_release_date.lte": currentFilters.yearMax
                  ? `${currentFilters.yearMax}-12-31`
                  : undefined,
                include_adult: currentFilters.includeAdult || false,
                vote_count_gte: 10,
                sort_by: "popularity.desc",
                page,
              },
            }
          );

          let results = res.results || [];

          // Filtre local supplémentaire pour vérifier les genres
          if (currentFilters.genre) {
            results = results.filter((movie) =>
              movie.genre_ids?.includes(parseInt(currentFilters.genre || "0"))
            );
          }

          if (results.length > 0) {
            const randomIndex = Math.floor(Math.random() * results.length);
            this.film = results[randomIndex];
            break;
          }

          step++;
          if (step === 2) this.fallbackTriggered = true;
        }
      } catch (err) {
        console.error("Erreur TMDB :", err);
      } finally {
        this.loading = false;
      }

      if (!this.film) {
        console.warn(
          "Aucun film trouvé après élargissement progressif des filtres."
        );
      }
    },

    /**
     * Formate un film brut TMDB pour qu'il ait un poster complet pour l'affichage.
     */
    formatFilm(raw: any) {
      return {
        id: raw.id,
        title: raw.title,
        overview: raw.overview,
        release_date: raw.release_date,
        poster: raw.poster_path
          ? `https://image.tmdb.org/t/p/w500${raw.poster_path}`
          : null,
      };
    },

    /**
     * Ajoute un film formaté à une liste donnée (enregistrés ou vus)
     * en évitant les doublons.
     */
    addToList(list: any[], filmToAdd: any) {
      const formatted = filmToAdd.poster
        ? filmToAdd
        : this.formatFilm(filmToAdd);
      if (!list.some((f) => f.id === formatted.id)) {
        list.push(formatted);
      }
    },

    /**
     * Retire un film d'une liste par son identifiant.
     */
    removeFromList(list: any[], id: number) {
      const index = list.findIndex((f) => f.id === id);
      if (index !== -1) list.splice(index, 1);
    },

    /**
     * Ajoute le film courant à la liste des enregistrés
     * et le retire de la liste des vus si présent.
     */
    saveCurrentFilm() {
      if (!this.film) return;
      this.addToList(this.savedFilms, this.film);
      this.removeFromList(this.seenFilms, this.film.id);
    },

    /**
     * Marque un film comme vu et le retire des enregistrés si présent.
     */
    markAsSeen(filmToMark: any) {
      const formatted = filmToMark.poster
        ? filmToMark
        : this.formatFilm(filmToMark);

      this.addToList(this.seenFilms, formatted);
      this.removeFromList(this.savedFilms, formatted.id);
    },

    /**
     * Retire un film de la liste des enregistrés.
     */
    removeSavedFilm(id: number) {
      this.removeFromList(this.savedFilms, id);
    },

    /**
     * Retire un film de la liste des vus.
     */
    removeSeenFilm(id: number) {
      this.removeFromList(this.seenFilms, id);
    },
  },
});
