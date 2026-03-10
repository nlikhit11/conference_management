'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface Accommodation {
  id: number;
  personName: string;
  personType: 'speaker' | 'attendee';
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  assigned: boolean;
}

const mockAccommodations: Accommodation[] = [
  {
    id: 1,
    personName: 'Dr. Sarah Johnson',
    personType: 'speaker',
    hotelName: 'Grand Plaza Hotel',
    checkInDate: '2026-03-14',
    checkOutDate: '2026-03-18',
    assigned: true,
  },
  {
    id: 2,
    personName: 'Prof. Michael Chen',
    personType: 'speaker',
    hotelName: 'Not assigned',
    checkInDate: '2026-05-09',
    checkOutDate: '2026-05-13',
    assigned: false,
  },
  {
    id: 3,
    personName: 'Alice Johnson',
    personType: 'attendee',
    hotelName: 'Business Inn',
    checkInDate: '2026-03-14',
    checkOutDate: '2026-03-18',
    assigned: true,
  },
];

export default function AccommodationPage() {
  const [accommodations, setAccommodations] = useState(mockAccommodations);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ hotelName: '' });

  const speakers = accommodations.filter((a) => a.personType === 'speaker');
  const attendees = accommodations.filter((a) => a.personType === 'attendee');

  const handleStartEdit = (acc: Accommodation) => {
    setEditingId(acc.id);
    setEditValues({ hotelName: acc.hotelName });
  };

  const handleSaveEdit = (id: number) => {
    if (!editValues.hotelName) {
      toast.error('Please enter a hotel name');
      return;
    }

    setAccommodations(
      accommodations.map((a) =>
        a.id === id ? { ...a, hotelName: editValues.hotelName, assigned: true } : a
      )
    );

    setEditingId(null);
    toast.success('Accommodation updated');
  };

  const renderAccommodationList = (items: Accommodation[]) => (
    <div className="space-y-4">
      {items.map((acc) => (
        <Card key={acc.id} className="p-4 border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{acc.personName}</p>
              {editingId === acc.id ? (
                <div className="mt-3 space-y-2">
                  <Label htmlFor={`hotel-${acc.id}`}>Hotel Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`hotel-${acc.id}`}
                      value={editValues.hotelName}
                      onChange={(e) => setEditValues({ hotelName: e.target.value })}
                    />
                    <Button onClick={() => handleSaveEdit(acc.id)} size="sm" className="bg-green-600">
                      Save
                    </Button>
                    <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  <p>
                    Hotel: <span className="font-medium text-slate-900">{acc.hotelName}</span>
                  </p>
                  <p>
                    {acc.checkInDate} → {acc.checkOutDate}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {acc.assigned && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              {!editingId || editingId !== acc.id ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStartEdit(acc)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <DashboardLayout role="organizer" userName="Organizer User" userEmail="organizer@example.com">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Accommodation Management</h1>
          <p className="text-slate-600 mt-2">Manage hotel bookings for speakers and attendees</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="speakers">
          <TabsList>
            <TabsTrigger value="speakers">Speakers ({speakers.length})</TabsTrigger>
            <TabsTrigger value="attendees">Attendees ({attendees.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="speakers" className="mt-6">
            {renderAccommodationList(speakers)}
          </TabsContent>

          <TabsContent value="attendees" className="mt-6">
            {renderAccommodationList(attendees)}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
