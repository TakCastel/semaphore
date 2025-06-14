// stores/useFilms.ts
import { defineStore } from "pinia";
import { useFiltersStore } from "./useFilters";

export const useFilmStore = defineStore(
  "film",
  () => {
    const config = useRuntimeConfig();
    const film = ref<any | null>(null);
    const savedFilms = ref<any[]>([]);
    const seenFilms = ref<any[]>([]);
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
        fallbackTriggered.value = false;

        while (!film.value && step < maxAttempts) {
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
            film.value = results[randomIndex];
            break;
          }

          step++;
          if (step === 2) fallbackTriggered.value = true;
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

    // Format minimal pour une Card
    function formatFilm(raw: any) {
      return {
        id: raw.id,
        title: raw.title,
        overview: raw.overview,
        poster: raw.poster_path
          ? `https://image.tmdb.org/t/p/w500${raw.poster_path}`
          : null,
      };
    }

    function addToList(list: Ref<any[]>, filmToAdd: any) {
      if (!list.value.some((f) => f.id === filmToAdd.id)) {
        list.value.push(formatFilm(filmToAdd));
      }
    }

    function removeFromList(list: Ref<any[]>, id: number) {
      list.value = list.value.filter((f) => f.id !== id);
    }

    function saveCurrentFilm() {
      if (!film.value) return;
      addToList(savedFilms, film.value);
    }

    function markAsSeen(filmToMark: any) {
      addToList(seenFilms, filmToMark);
    }

    function removeSavedFilm(id: number) {
      removeFromList(savedFilms, id);
    }

    function removeSeenFilm(id: number) {
      removeFromList(seenFilms, id);
    }

    function isSaved(id: number) {
      return savedFilms.value.some((f) => f.id === id);
    }

    const poster = computed(() => {
      if (!film.value?.poster_path) return null;
      return `https://image.tmdb.org/t/p/w500${film.value.poster_path}`;
    });

    return {
      film,
      poster,
      loading,
      fallbackTriggered,
      fetchRandomFilm,
      saveCurrentFilm,
      savedFilms,
      removeSavedFilm,
      isSaved,
      seenFilms,
      markAsSeen,
      removeSeenFilm,
    };
  },
  {
    persist: true,
  }
);
