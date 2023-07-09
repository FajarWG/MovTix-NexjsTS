"use client";

import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";

export default function Movies() {
  const movies = useMovieList(false);

  return (
    <main className="px-2">
      <MovieList data={movies} show={true} />
    </main>
  );
}
