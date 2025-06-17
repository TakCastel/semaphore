import { defineStore } from "pinia";
import { useFiltersStore } from "./useFilters";
import { useRuntimeConfig } from "#app/nuxt";

export const useFilmStore = defineStore("film", {
  state: () => ({
    film: null as any | null,
    savedFilms: [] as any[],
    seenFilms: [] as any[],
    loading: false,
    fallbackTriggered: false,
  }),

  getters: {
    poster(state) {
      if (!state.film?.poster_path) return null;
      return `https://image.tmdb.org/t/p/w500${state.film.poster_path}`;
    },
    isSaved: (state) => (id: number) =>
      state.savedFilms.some((f) => f.id === id),
    isSeen: (state) => (id: number) => state.seenFilms.some((f) => f.id === id),
  },

  actions: {
    async fetchRandomFilm() {
      this.loading = true;
      this.film = null;

      const config = useRuntimeConfig();
      const filters = useFiltersStore();
      const maxPages = 500;
      const maxAttempts = 50;
      let step = 0;

      try {
        this.fallbackTriggered = false;

        while (!this.film && step < maxAttempts) {
          const currentFilters = { ...filters };

          if (step >= 5) currentFilters.includeAdult = true;
          if (step >= 4) currentFilters.language = null;
          if (step >= 3) currentFilters.genre = null;
          if (step >= 2) currentFilters.yearMin = null;
          if (step >= 2) currentFilters.yearMax = null;

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

          if (currentFilters.genre) {
            results = results.filter((movie) =>
              movie.genre_ids?.includes(parseInt(currentFilters.genre))
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
        console.warn("Aucun film trouvé malgré l’élargissement progressif.");
      }
    },

    formatFilm(raw: any) {
      return {
        id: raw.id,
        title: raw.title,
        overview: raw.overview,
        poster: raw.poster_path
          ? `https://image.tmdb.org/t/p/w500${raw.poster_path}`
          : null,
      };
    },

    addToList(list: any[], filmToAdd: any) {
      if (!list.some((f) => f.id === filmToAdd.id)) {
        list.push(this.formatFilm(filmToAdd));
      }
    },

    removeFromList(list: any[], id: number) {
      const index = list.findIndex((f) => f.id === id);
      if (index !== -1) list.splice(index, 1);
    },

    saveCurrentFilm() {
      if (!this.film) return;
      this.addToList(this.savedFilms, this.film);
    },

    markAsSeen(filmToMark: any) {
      this.addToList(this.seenFilms, filmToMark);
    },

    removeSavedFilm(id: number) {
      this.removeFromList(this.savedFilms, id);
    },

    removeSeenFilm(id: number) {
      this.removeFromList(this.seenFilms, id);
    },
  },
});
