"use client";
import { React, useState } from "react";
import Pagination from "../components/Pagination";
import Image from "next/image";

const pageSize = 30;
const currentPage = 1;

export const paginate = (items, pageNumber, pageSize) => {
 const startIndex = (pageNumber - 1) * pageSize;
 return items.slice(startIndex, startIndex + pageSize);
};

export default function Welcome({ movies }) {

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginated_movie = paginate(movies, currentPage, pageSize);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">New Movies in Theaters (2024)</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {paginated_movie?.map((results) => (
              <div key={results.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={'https://image.tmdb.org/t/p/w500'+results.poster_path}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {results.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{results.release_date}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{results.vote_average.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        items={movies.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        />
    </main>
  );
}