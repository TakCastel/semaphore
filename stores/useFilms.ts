// stores/useFilms.ts
import { defineStore } from "pinia";
import { useFiltersStore } from "./useFilters";

export const useFilmStore = defineStore(
  "film",
  () => {
    const config = useRuntimeConfig();
    const film = ref<any | null>(null);
    const savedFilms = ref<any[]>([]);
    const loading = ref(false);
    const fallbackTriggered = ref(false);

    async function fetchRandomFilm() {
      loading.value = true;
      film.value = null;

      const filters = useFiltersStore();
      const maxPages = 500;
      const maxAttempts = 50;

      let step = 0;

      try {
        fallbackTriggered.value = false; // on reset à chaque nouvelle recherche

        while (!film.value && step < maxAttempts) {
          const currentFilters = { ...filters };

          // Étapes progressives
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

          // Filtrage strict par genre si encore présent
          if (currentFilters.genre) {
            results = results.filter((movie) =>
              movie.genre_ids?.includes(parseInt(currentFilters.genre))
            );
          }

          if (results.length > 0) {
            const randomIndex = Math.floor(Math.random() * results.length);
            film.value = results[randomIndex];
            break;
          }

          step++;
          if (step === 2) fallbackTriggered.value = true; // dès qu’on commence à relâcher les critères
        }
      } catch (err) {
        console.error("Erreur TMDB :", err);
      } finally {
        loading.value = false;
      }

      if (!film.value) {
        console.warn("Aucun film trouvé malgré l’élargissement progressif.");
      }
    }

    async function fetchFilmById(id: number) {
      loading.value = true;
      film.value = null;

      try {
        const res = await $fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: config.public.tmdbApiKey,
            language: "fr-FR",
          },
        });

        film.value = res;
      } catch (err) {
        console.error("Erreur lors de la récupération du film :", err);
      } finally {
        loading.value = false;
      }
    }

    function saveCurrentFilm() {
      if (!film.value) return;

      // Vérifie doublon
      const alreadySaved = savedFilms.value.some((f) => f.id === film.value.id);
      if (!alreadySaved) savedFilms.value.push({ ...film.value });
    }

    const poster = computed(() => {
      if (!film.value?.poster_path) return null;
      return `https://image.tmdb.org/t/p/w500${film.value.poster_path}`;
    });

    function removeSavedFilm(id: number) {
      savedFilms.value = savedFilms.value.filter((f) => f.id !== id);
    }

    function isSaved(id: number) {
      return savedFilms.value.some((f) => f.id === id);
    }

    return {
      film,
      poster,
      loading,
      fallbackTriggered,
      fetchRandomFilm,
      fetchFilmById,
      saveCurrentFilm,
      savedFilms,
      removeSavedFilm,
      isSaved,
    };
  },
  {
    persist: true,
  }
);
