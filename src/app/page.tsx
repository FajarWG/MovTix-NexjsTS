"use client";

import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";

export default function Home() {
  const movies = useMovieList(true);

  return (
    <main className="px-2">
      <h2 className="text-2xl text-center font-semibold mb-4 text-black">
        Playing
      </h2>
      <MovieList data={movies} show={false} />
    </main>
  );
}
