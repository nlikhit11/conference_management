'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mail, Trash2, Send, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Speaker {
  id: number;
  name: string;
  email: string;
  event: string;
  topic: string;
  invitationStatus: 'pending' | 'accepted' | 'rejected';
  accommodationRequired: boolean;
  profileUrl?: string;
}

const mockSpeakers: Speaker[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah@example.com',
    event: 'Tech Summit 2026',
    topic: 'Future of AI',
    invitationStatus: 'accepted',
    accommodationRequired: true,
    profileUrl: 'https://example.com/speakers/sarah-johnson',
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    email: 'michael@example.com',
    event: 'AI Conference',
    topic: 'Machine Learning',
    invitationStatus: 'pending',
    accommodationRequired: true,
    profileUrl: 'https://example.com/speakers/michael-chen',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    event: 'Tech Summit 2026',
    topic: 'Startup Ecosystem',
    invitationStatus: 'rejected',
    accommodationRequired: false,
    profileUrl: 'https://example.com/speakers/emily-rodriguez',
  },
];

export default function OrganizerSpeakersPage() {
  const [speakers, setSpeakers] = useState(mockSpeakers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  const filtered = speakers.filter((speaker) => {
    const matchesSearch =
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || speaker.invitationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSendInvitation = (speaker: Speaker) => {
    toast.success(`Invitation sent to ${speaker.name}`);
  };

  const handleRemoveSpeaker = (id: number) => {
    setSpeakers(speakers.filter((s) => s.id !== id));
    toast.success('Speaker removed');
  };

  return (
    <DashboardLayout role="organizer" userName="Organizer User" userEmail="organizer@example.com">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Speakers</h1>
          <p className="text-slate-600 mt-2">Track speaker invitations and confirmations</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'accepted', 'rejected'] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Speakers List */}
        <div className="space-y-4">
          {filtered.map((speaker) => (
            <Card key={speaker.id} className="p-6 border-slate-200 hover:shadow-md transition-shadow duration-200 group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">{speaker.name}</h3>
                    {speaker.profileUrl && (
                      <a
                        href={speaker.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded-full bg-blue-50 hover:bg-blue-100"
                        title="Visit profile"
                      >
                        Visit Profile
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{speaker.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Event: {speaker.event}</p>
                  <p className="text-sm text-slate-600">Topic: {speaker.topic}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    speaker.invitationStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : speaker.invitationStatus === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {speaker.invitationStatus.charAt(0).toUpperCase() + speaker.invitationStatus.slice(1)}
                  </span>
                  {speaker.accommodationRequired && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      Accommodation needed
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {speaker.invitationStatus === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendInvitation(speaker)}
                      className="text-blue-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Resend
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveSpeaker(speaker.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card className="p-12 text-center border-slate-200">
            <p className="text-slate-500">No speakers found</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
