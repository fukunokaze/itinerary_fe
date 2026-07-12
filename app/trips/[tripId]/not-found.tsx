import Link from 'next/link';

export default function TripNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Trip not found</h1>
      <p className="text-gray-600 max-w-md">
        This trip doesn&apos;t exist or may have been deleted.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
