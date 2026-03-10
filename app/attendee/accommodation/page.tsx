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
import { Calendar, MapPin, Phone, Mail, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface AccommodationInfo {
  id: string;
  conferenceId: string;
  hotelName: string;
  address: string;
  phone: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  confirmationNo: string;
  notes?: string;
  booked: boolean;
}

const mockAccommodations: AccommodationInfo[] = [
  {
    id: '1',
    conferenceId: '1',
    hotelName: 'Grand Convention Hotel',
    address: '123 Main Street, Downtown',
    phone: '+1-555-1234',
    email: 'reservations@grandhotel.com',
    checkInDate: '2024-06-14',
    checkOutDate: '2024-06-16',
    roomType: 'Standard Room',
    confirmationNo: 'GCH123456',
    notes: 'Free breakfast included. Check-in after 3 PM.',
    booked: true,
  },
  {
    id: '2',
    conferenceId: '2',
    hotelName: 'Tech Park Hotel',
    address: '456 Innovation Ave',
    phone: '+1-555-5678',
    email: 'reservations@techparkhotel.com',
    checkInDate: '2024-07-19',
    checkOutDate: '2024-07-21',
    roomType: 'Standard Room',
    confirmationNo: 'TPH789012',
    notes: 'Early check-in available upon request.',
    booked: false,
  },
];

export default function AttendeeAccommodationPage() {
  const [accommodations, setAccommodations] = useState<AccommodationInfo[]>(
    mockAccommodations
  );
  const [selectedAccom, setSelectedAccom] = useState<AccommodationInfo | null>(null);

  const calculateNights = (checkIn: string, checkOut: string) => {
    const check = new Date(checkIn);
    const out = new Date(checkOut);
    const nights = Math.ceil((out.getTime() - check.getTime()) / (1000 * 60 * 60 * 24));
    return nights;
  };

  const handleConfirmAccommodation = (id: string) => {
    setAccommodations(
      accommodations.map((a) =>
        a.id === id ? { ...a, booked: true } : a
      )
    );
    toast.success('Accommodation confirmed!');
  };

  const handleCancelAccommodation = (id: string) => {
    setAccommodations(
      accommodations.map((a) =>
        a.id === id ? { ...a, booked: false } : a
      )
    );
    toast.success('Accommodation cancelled');
  };

  return (
    <DashboardLayout role="attendee" userName="John Attendee" userEmail="attendee@example.com">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Accommodation</h1>
          <p className="text-slate-600 mt-1">View and manage your hotel bookings</p>
        </div>

        {/* Booked Accommodations */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Confirmed Bookings</h2>
          <div className="grid gap-4">
            {accommodations
              .filter((a) => a.booked)
              .map((accommodation) => (
                <Card key={accommodation.id} className="p-6 border-slate-200">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-5 h-5 text-indigo-600" />
                          <h3 className="font-bold text-lg text-slate-900">
                            {accommodation.hotelName}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {accommodation.address}
                        </p>
                      </div>
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Confirmed
                      </span>
                    </div>

                    {/* Check-in/Check-out */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Check-in</p>
                          <p className="font-semibold text-slate-900">
                            {new Date(accommodation.checkInDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Check-out</p>
                          <p className="font-semibold text-slate-900">
                            {new Date(accommodation.checkOutDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Room Info */}
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>{accommodation.roomType}</strong> for{' '}
                        <strong>
                          {calculateNights(accommodation.checkInDate, accommodation.checkOutDate)} night
                          {calculateNights(accommodation.checkInDate, accommodation.checkOutDate) !== 1
                            ? 's'
                            : ''}
                        </strong>
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Phone</p>
                          <p className="font-medium text-slate-900">{accommodation.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Email</p>
                          <p className="font-medium text-slate-900 text-sm">{accommodation.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Confirmation */}
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Confirmation Number</p>
                      <p className="font-bold text-slate-900 text-lg">{accommodation.confirmationNo}</p>
                    </div>

                    {/* Notes */}
                    {accommodation.notes && (
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <p className="text-xs text-blue-600 mb-1 font-medium">Special Notes:</p>
                        <p className="text-sm text-blue-900">{accommodation.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 justify-end border-t border-slate-200 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{accommodation.hotelName}</DialogTitle>
                            <DialogDescription>Full accommodation details</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 text-sm">
                            <div>
                              <p className="text-slate-600 font-medium">Address</p>
                              <p className="text-slate-900">{accommodation.address}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 font-medium">Confirmation #</p>
                              <p className="font-mono text-slate-900">{accommodation.confirmationNo}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 font-medium">Check-in</p>
                              <p className="text-slate-900">
                                {new Date(accommodation.checkInDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-600 font-medium">Check-out</p>
                              <p className="text-slate-900">
                                {new Date(accommodation.checkOutDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-600 font-medium">Contact Hotel</p>
                              <p className="text-slate-900">{accommodation.phone}</p>
                              <p className="text-slate-900">{accommodation.email}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelAccommodation(accommodation.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Available Accommodations */}
        {accommodations.some((a) => !a.booked) && (
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Available Accommodations</h2>
            <div className="grid gap-4">
              {accommodations
                .filter((a) => !a.booked)
                .map((accommodation) => (
                  <Card key={accommodation.id} className="p-6 border-slate-200 opacity-75">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Building2 className="w-5 h-5 text-slate-400" />
                            <h3 className="font-bold text-lg text-slate-900">
                              {accommodation.hotelName}
                            </h3>
                          </div>
                          <p className="text-sm text-slate-600 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {accommodation.address}
                          </p>
                        </div>
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-300">
                          Not Booked
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-xs text-slate-500">Check-in</p>
                            <p className="font-semibold text-slate-900">
                              {new Date(accommodation.checkInDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-xs text-slate-500">Check-out</p>
                            <p className="font-semibold text-slate-900">
                              {new Date(accommodation.checkOutDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end border-t border-slate-200 pt-4">
                        <Button
                          onClick={() => handleConfirmAccommodation(accommodation.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Confirm Booking
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {accommodations.length === 0 && (
          <Card className="p-12 border-slate-200 text-center">
            <p className="text-slate-600">No accommodations available yet.</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
