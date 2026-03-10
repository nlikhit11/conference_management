'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, MapPin, Users, Ticket, CheckCircle2, Clock } from 'lucide-react';

const registrations = [
  {
    id: 1,
    eventTitle: 'Tech Summit 2026',
    date: 'Mar 15-17, 2026',
    venue: 'San Francisco Convention Center',
    speakers: 12,
    status: 'registered',
    registeredDate: '2026-03-01',
  },
  {
    id: 2,
    eventTitle: 'AI Conference',
    date: 'May 10-12, 2026',
    venue: 'Austin Convention Center',
    speakers: 8,
    status: 'registered',
    registeredDate: '2026-03-02',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Digital Innovation Forum',
    date: 'Jun 5-7, 2026',
    venue: 'New York Hilton',
    speakers: 6,
    registered: false,
  },
  {
    id: 2,
    title: 'Cloud Computing Summit',
    date: 'Jul 15-17, 2026',
    venue: 'Seattle Convention Center',
    speakers: 10,
    registered: false,
  },
];

export default function AttendeeDashboard() {
  return (
    <DashboardLayout role="attendee" userName="Attendee User" userEmail="attendee@example.com">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Attendee Dashboard</h1>
          <p className="text-slate-600 mt-2">Explore and register for conferences</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Registered Events</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{registrations.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Upcoming Events</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{upcomingEvents.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Speakers</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {registrations.reduce((sum, r) => sum + r.speakers, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </div>

        {/* My Registrations */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">My Registrations</h2>
          <div className="space-y-4">
            {registrations.map((registration) => (
              <Card key={registration.id} className="p-6 border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{registration.eventTitle}</h3>
                    <p className="text-sm text-slate-600 mt-1">Registered on {registration.registeredDate}</p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {registration.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {registration.venue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Registered
                    </span>
                    <span className="text-xs text-slate-600">
                      {registration.speakers} speakers
                    </span>
                  </div>
                  <Link href="/attendee/pass">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Ticket className="w-4 h-4" />
                      View Pass
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Events */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Available Conferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{event.title}</h3>
                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {event.speakers} speakers
                  </p>
                </div>
                <Link href="/attendee/conferences">
                  <Button className="w-full">Register Now</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/attendee/conferences">
            <Button variant="outline" className="w-full">
              Browse All Events
            </Button>
          </Link>
          <Link href="/attendee/accommodation">
            <Button variant="outline" className="w-full">
              My Accommodation
            </Button>
          </Link>
          <Link href="/attendee/pass">
            <Button variant="outline" className="w-full">
              View QR Pass
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
