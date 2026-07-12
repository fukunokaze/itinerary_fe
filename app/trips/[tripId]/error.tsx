'use client';

import { useEffect } from 'react';

export default function TripError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900">
        Couldn&apos;t load this trip
      </h1>
      <p className="text-gray-600 max-w-md">
        We couldn&apos;t reach the itinerary service. Check that the API is
        running and try again.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
      >
        Try again
      </button>
    </div>
  );
}
