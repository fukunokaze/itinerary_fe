import Link from 'next/link';
import {
  LayoutGrid,
  MapPin,
  Calendar,
  DollarSign,
  Settings,
  Plane,
} from 'lucide-react';
import { NavLink } from './NavLink';
import { getTrips } from '@/lib/api/trips';

const navLinks = [
  { label: 'Dashboard', icon: LayoutGrid, href: '/' },
  { label: 'My Trips', icon: MapPin, href: '/trips' },
  { label: 'Calendar', icon: Calendar, href: '/calendar' },
  { label: 'Budget', icon: DollarSign, href: '/budget' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export default async function Sidebar() {
  let trips: { id: string; title: string }[] = [];
  try {
    trips = await getTrips();
  } catch (error) {
    console.error('Failed to load trips for sidebar:', error);
  }

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col overflow-y-auto fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <Plane className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">JourneyPlanner</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={<Icon className="w-5 h-5" />}
              />
            );
          })}
        </div>
      </nav>

      {/* Trips Section */}
      <div className="px-4 py-6 border-t border-gray-800 flex-shrink-0">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Trips
        </h3>
        <div className="space-y-2">
          {trips.length === 0 ? (
            <p className="px-3 py-2 text-sm text-gray-500">No trips yet</p>
          ) : (
            trips.map((trip) => (
              <Link
                key={trip.id}
                href={`/trips/${trip.id}`}
                className="block px-3 py-2 rounded text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition truncate"
              >
                {trip.title}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
