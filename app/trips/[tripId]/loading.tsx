export default function TripLoading() {
  return (
    <div className="flex flex-col h-full">
      {/* Page Header Skeleton */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 animate-pulse">
        <div className="mb-4">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </div>
        </div>

        {/* Button Skeletons */}
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-40"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex gap-6 px-8 py-6">
        {/* Left Column: Timeline Skeleton */}
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-24 mb-6 animate-pulse"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="ml-5 space-y-2">
                  {[1, 2].map((j) => (
                    <div key={j} className="bg-gray-100 rounded p-3 h-16"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Logistics Skeleton */}
        <div className="w-80 space-y-6 animate-pulse">
          <div className="bg-gray-200 rounded h-32"></div>
          <div className="bg-gray-200 rounded h-32"></div>
          <div className="bg-gray-200 rounded h-32"></div>
        </div>
      </div>
    </div>
  );
}
