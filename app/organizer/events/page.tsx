'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Edit, Trash2, RotateCcw, Search } from 'lucide-react';
import { toast } from 'sonner';
import type { Conference } from '@/lib/types';

// Mock data
const mockEvents: Conference[] = [
  {
    id: '1',
    organizer_id: 'org1',
    title: 'Tech Summit 2024',
    description: 'Annual technology conference',
    date: '2024-06-15',
    venue: 'Convention Center',
    expected_attendees: 500,
    status: 'approved',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: '2',
    organizer_id: 'org1',
    title: 'AI Workshop Series',
    description: 'Deep dive into AI technologies',
    date: '2024-07-20',
    venue: 'Tech Park',
    expected_attendees: 150,
    status: 'pending',
    created_at: '2024-01-05',
    updated_at: '2024-01-05',
  },
];

interface EditingEvent extends Conference {
  changes?: Partial<Conference>;
}

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EditingEvent[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Conference>>({});
  const [resubmitId, setResubmitId] = useState<string | null>(null);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (event: Conference) => {
    setEditingId(event.id);
    setEditForm({ ...event });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    
    setEvents(
      events.map((e) =>
        e.id === editingId
          ? { ...e, ...editForm, status: 'pending', updated_at: new Date().toISOString() }
          : e
      )
    );
    
    toast.success('Event updated and resubmitted for approval');
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId));
    toast.success('Event deleted successfully');
  };

  const handleResubmit = (eventId: string) => {
    setEvents(
      events.map((e) =>
        e.id === eventId
          ? { ...e, status: 'pending', updated_at: new Date().toISOString() }
          : e
      )
    );
    
    toast.success('Event resubmitted for admin approval');
    setResubmitId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <DashboardLayout role="organizer" userName="John Organizer" userEmail="organizer@example.com">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Events</h1>
          <p className="text-slate-600 mt-1">Edit, update, or resubmit your events for approval</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by event name or venue..."
            className="pl-10 bg-white border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Events Table */}
        <Card className="border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Event Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Venue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Attendees</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">{event.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{event.venue}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{event.expected_attendees}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {/* Edit Dialog */}
                        <Dialog open={editingId === event.id} onOpenChange={(open) => !open && setEditingId(null)}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(event)}
                              className="gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Edit Event</DialogTitle>
                              <DialogDescription>Update event details and resubmit</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium text-slate-700">Event Title</label>
                                <Input
                                  value={editForm.title || ''}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, title: e.target.value })
                                  }
                                  className="mt-1 bg-white border-slate-200"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Description</label>
                                <textarea
                                  value={editForm.description || ''}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, description: e.target.value })
                                  }
                                  className="w-full mt-1 p-2 text-sm border border-slate-200 rounded-lg bg-white"
                                  rows={3}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Date</label>
                                <Input
                                  type="date"
                                  value={editForm.date || ''}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, date: e.target.value })
                                  }
                                  className="mt-1 bg-white border-slate-200"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Venue</label>
                                <Input
                                  value={editForm.venue || ''}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, venue: e.target.value })
                                  }
                                  className="mt-1 bg-white border-slate-200"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Expected Attendees</label>
                                <Input
                                  type="number"
                                  value={editForm.expected_attendees || ''}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      expected_attendees: parseInt(e.target.value),
                                    })
                                  }
                                  className="mt-1 bg-white border-slate-200"
                                />
                              </div>
                              <div className="flex gap-2 justify-end pt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => setEditingId(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleSaveEdit}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                  Save & Resubmit
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {/* Resubmit Dialog */}
                        {event.status === 'rejected' && (
                          <Dialog open={resubmitId === event.id} onOpenChange={(open) => !open && setResubmitId(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setResubmitId(event.id)}
                                className="gap-1 text-blue-600 hover:text-blue-700"
                              >
                                <RotateCcw className="w-4 h-4" />
                                <span className="hidden sm:inline">Resubmit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-sm">
                              <DialogHeader>
                                <DialogTitle>Resubmit Event</DialogTitle>
                                <DialogDescription>
                                  This event was previously rejected. Resubmitting will send it for review again.
                                </DialogDescription>
                              </DialogHeader>
                              <p className="text-sm text-slate-600">
                                {event.feedback && (
                                  <>
                                    <strong>Admin Feedback:</strong>
                                    <p className="mt-2 p-3 bg-slate-50 rounded text-slate-700">
                                      {event.feedback}
                                    </p>
                                  </>
                                )}
                              </p>
                              <div className="flex gap-2 justify-end pt-4">
                                <Button variant="outline" onClick={() => setResubmitId(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleResubmit(event.id)}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                  Resubmit
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        {/* Delete Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
                          className="gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredEvents.length === 0 && (
          <Card className="p-12 border-slate-200 text-center">
            <p className="text-slate-600">No events found matching your search.</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
