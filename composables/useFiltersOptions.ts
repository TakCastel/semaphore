export async function useFiltersOptions() {
  const config = useRuntimeConfig();
  const genres = ref([]);
  const languages = ref([]);

  // Genres
  const genreRes = await $fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      params: {
        api_key: config.public.tmdbApiKey,
        language: "fr-FR",
      },
    }
  );
  genres.value = genreRes.genres;

  // Langues (filtrées)
  const langRes = await $fetch(
    "https://api.themoviedb.org/3/configuration/languages",
    {
      params: {
        api_key: config.public.tmdbApiKey,
      },
    }
  );

  const common = ["fr", "en", "ja", "ko", "es"];
  languages.value = langRes.filter((lang) => common.includes(lang.iso_639_1));

  return {
    genres,
    languages,
  };
}
