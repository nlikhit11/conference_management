import Link from 'next/link';
import { ArrowRight, Calendar, Users, QrCode, BarChart3, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              CE
            </div>
            <span className="font-semibold text-slate-900">ConferenceHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              Manage Conferences and Events <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Seamlessly</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              All-in-one platform for event planning, speaker management, attendee registration, and real-time check-in. Streamline your conference workflow with powerful tools designed for organizers, speakers, and attendees.
            </p>
            <div className="flex gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  View Conferences <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Illustration placeholder */}
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-12 flex items-center justify-center min-h-96">
            <div className="text-center">
              <Calendar className="w-24 h-24 text-indigo-600 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Conference Management Platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-slate-600">Everything you need to manage successful conferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Calendar className="w-6 h-6" />,
              title: 'Event Creation',
              description: 'Create and manage multiple conferences with detailed information, venues, and schedules.',
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: 'Speaker Management',
              description: 'Invite speakers, track invitations, manage bios, and accommodation requests.',
            },
            {
              icon: <QrCode className="w-6 h-6" />,
              title: 'QR Code Check-in',
              description: 'Generate unique QR codes for speakers and attendees for seamless event entry.',
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              title: 'Accommodation',
              description: 'Track and manage accommodation for speakers and attendees.',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Inventory Management',
              description: 'Request and manage goodies, merchandise, and supplies for your events.',
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: 'Analytics & Reports',
              description: 'Get insights with analytics and export attendee data to CSV.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Conferences Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Upcoming Conferences</h2>
          <p className="text-xl text-slate-600">Join these amazing events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Tech Summit 2026',
              date: 'March 15-17, 2026',
              location: 'San Francisco, CA',
              speakers: 12,
            },
            {
              title: 'Digital Innovation Forum',
              date: 'April 5-7, 2026',
              location: 'New York, NY',
              speakers: 18,
            },
            {
              title: 'AI & Machine Learning Conference',
              date: 'May 10-12, 2026',
              location: 'Austin, TX',
              speakers: 15,
            },
          ].map((conference, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">{conference.title}</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {conference.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {conference.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {conference.speakers} speakers
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1" size="sm">Register</Button>
                  <Button variant="outline" size="sm">Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  CE
                </div>
                <span className="font-semibold text-slate-900">ConferenceHub</span>
              </div>
              <p className="text-sm text-slate-600">Manage conferences and events seamlessly.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-slate-900">Features</Link></li>
                <li><Link href="#" className="hover:text-slate-900">Pricing</Link></li>
                <li><Link href="#" className="hover:text-slate-900">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-slate-900">About</Link></li>
                <li><Link href="#" className="hover:text-slate-900">Blog</Link></li>
                <li><Link href="#" className="hover:text-slate-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="#" className="hover:text-slate-900">Privacy</Link></li>
                <li><Link href="#" className="hover:text-slate-900">Terms</Link></li>
                <li><Link href="#" className="hover:text-slate-900">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex items-center justify-between">
            <p className="text-sm text-slate-600">&copy; 2026 ConferenceHub. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-600 hover:text-slate-900">Twitter</Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900">LinkedIn</Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
