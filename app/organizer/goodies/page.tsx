'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface GoodiesInventory {
  id: number;
  itemName: string;
  availableStock: number;
  requestedStock: number;
  approvedStock: number;
  status: 'pending' | 'approved' | 'rejected';
}

const mockInventory: GoodiesInventory[] = [
  {
    id: 1,
    itemName: 'T-shirts',
    availableStock: 200,
    requestedStock: 500,
    approvedStock: 300,
    status: 'approved',
  },
  {
    id: 2,
    itemName: 'Conference Bags',
    availableStock: 150,
    requestedStock: 500,
    approvedStock: 0,
    status: 'pending',
  },
  {
    id: 3,
    itemName: 'Notepads',
    availableStock: 500,
    requestedStock: 1000,
    approvedStock: 0,
    status: 'pending',
  },
];

export default function GoodiesPage() {
  const [inventory, setInventory] = useState(mockInventory);
  const [newRequest, setNewRequest] = useState({ itemName: '', quantity: '' });

  const handleRequestMore = () => {
    if (!newRequest.itemName || !newRequest.quantity) {
      toast.error('Please fill in all fields');
      return;
    }

    const existing = inventory.find((i) => i.itemName === newRequest.itemName);
    if (existing) {
      setInventory(
        inventory.map((i) =>
          i.id === existing.id
            ? { ...i, requestedStock: i.requestedStock + parseInt(newRequest.quantity) }
            : i
        )
      );
    } else {
      setInventory([
        ...inventory,
        {
          id: Math.max(...inventory.map((i) => i.id), 0) + 1,
          itemName: newRequest.itemName,
          availableStock: 0,
          requestedStock: parseInt(newRequest.quantity),
          approvedStock: 0,
          status: 'pending',
        },
      ]);
    }

    setNewRequest({ itemName: '', quantity: '' });
    toast.success('Request sent to admin');
  };

  return (
    <DashboardLayout role="organizer" userName="Organizer User" userEmail="organizer@example.com">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Goodies Inventory</h1>
          <p className="text-slate-600 mt-2">Request and track event merchandise</p>
        </div>

        {/* Request Form */}
        <Card className="p-6 border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Request More Goodies</h2>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-48 space-y-2">
              <Label htmlFor="item">Item Name</Label>
              <Input
                id="item"
                placeholder="e.g., T-shirts, Bags"
                value={newRequest.itemName}
                onChange={(e) => setNewRequest({ ...newRequest, itemName: e.target.value })}
              />
            </div>
            <div className="flex-1 min-w-48 space-y-2">
              <Label htmlFor="qty">Quantity</Label>
              <Input
                id="qty"
                type="number"
                placeholder="500"
                value={newRequest.quantity}
                onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleRequestMore} className="gap-2">
                <Plus className="w-4 h-4" />
                Request
              </Button>
            </div>
          </div>
        </Card>

        {/* Inventory Table */}
        <Card className="border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-4 px-6 font-semibold text-sm text-slate-600">Item</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-slate-600">Available Stock</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-slate-600">Requested</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-slate-600">Approved</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-slate-900 flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      {item.itemName}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{item.availableStock}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{item.requestedStock}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{item.approvedStock}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : item.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
