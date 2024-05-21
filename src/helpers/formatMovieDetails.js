export const formatMovieDetails = (watchProvider, releaseDate, runTime, voteAverage) => {
  const logoPath = watchProvider?.IN?.flatrate
      || watchProvider?.IN?.buy
      || watchProvider?.IN?.ads
      || watchProvider?.IN?.free
      || undefined;

  const watchProviderSlug = logoPath?.[0]?.logo_path;

  const [year, month, day] = releaseDate.split("-");
  const formattedReleaseDate = `${month}/${day}/${year}`;

  const formattedRuntime = `${Math.floor(runTime / 60)}h ${runTime % 60}m`;

  const rating = Math.floor(voteAverage * 10);

  const releaseYear = releaseDate.slice(0, 4);

  return {
    watchProviderSlug,
    formattedReleaseDate,
    formattedRuntime,
    rating,
    releaseYear,
  };
};
