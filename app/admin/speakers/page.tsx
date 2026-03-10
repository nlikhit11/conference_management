'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface SpeakerApproval {
  id: number;
  name: string;
  organization: string;
  event: string;
  topic: string;
  bio: string;
  invitationStatus: 'pending' | 'accepted' | 'rejected';
  acceptanceStatus: 'invited' | 'accepted' | 'declined';
  accommodationRequired: boolean;
}

const mockSpeakers: SpeakerApproval[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    organization: 'TechCorp AI Labs',
    event: 'Tech Summit 2026',
    topic: 'Future of AI in Enterprise',
    bio: 'Leading AI researcher with 15 years of experience',
    invitationStatus: 'pending',
    acceptanceStatus: 'invited',
    accommodationRequired: true,
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    organization: 'University of Technology',
    event: 'AI Conference',
    topic: 'Machine Learning Applications',
    bio: 'Professor and ML specialist',
    invitationStatus: 'accepted',
    acceptanceStatus: 'accepted',
    accommodationRequired: true,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    organization: 'Innovation Ventures',
    event: 'Tech Summit 2026',
    topic: 'Startup Ecosystem',
    bio: 'Entrepreneur and venture capital advisor',
    invitationStatus: 'pending',
    acceptanceStatus: 'invited',
    accommodationRequired: false,
  },
];

export default function SpeakerApprovalsPage() {
  const [speakers, setSpeakers] = useState(mockSpeakers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'declined'>('all');

  const filtered = speakers.filter((speaker) => {
    const matchesSearch =
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || speaker.invitationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (speaker: SpeakerApproval) => {
    const updated = speakers.map((s) =>
      s.id === speaker.id ? { ...s, invitationStatus: 'accepted' as const } : s
    );
    setSpeakers(updated);
    toast.success(`${speaker.name} approved as speaker`);
  };

  const handleReject = (speaker: SpeakerApproval) => {
    const updated = speakers.map((s) =>
      s.id === speaker.id ? { ...s, invitationStatus: 'rejected' as const } : s
    );
    setSpeakers(updated);
    toast.success(`${speaker.name} rejected`);
  };

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@example.com">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Speaker Approvals</h1>
          <p className="text-slate-600 mt-2">Verify and approve invited speakers for events</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name, organization, or event..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'accepted', 'declined'] as const).map((status) => (
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

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((speaker) => (
            <Card key={speaker.id} className="p-6 border-slate-200">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{speaker.name}</h3>
                    <p className="text-sm text-slate-600">{speaker.organization}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    speaker.invitationStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : speaker.invitationStatus === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {speaker.invitationStatus.charAt(0).toUpperCase() + speaker.invitationStatus.slice(1)}
                  </span>
                </div>

                <div className="space-y-1 mt-3">
                  <p className="text-sm font-medium text-slate-900">Event: {speaker.event}</p>
                  <p className="text-sm font-medium text-slate-900">Topic: {speaker.topic}</p>
                  <p className="text-xs text-slate-600 mt-2">{speaker.bio}</p>
                </div>

                {speaker.accommodationRequired && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs font-medium text-blue-900">Accommodation required</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-200">
                {speaker.invitationStatus === 'pending' && (
                  <>
                    <Button
                      className="flex-1 text-green-600"
                      variant="outline"
                      size="sm"
                      onClick={() => handleApprove(speaker)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      className="flex-1 text-red-600"
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(speaker)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {speaker.invitationStatus !== 'pending' && (
                  <Button disabled className="flex-1" variant="outline" size="sm">
                    {speaker.invitationStatus === 'accepted' ? 'Approved' : 'Rejected'}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card className="p-12 text-center border-slate-200">
            <p className="text-slate-500">No speakers found matching your filters</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
