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
import { MessageSquare, Search, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { Query } from '@/lib/types';

// Mock data
const mockQueries: Query[] = [
  {
    id: '1',
    conference_id: '1',
    user_id: 'speaker1',
    user_name: 'Sarah Johnson',
    question: 'What is the presentation duration?',
    reply: 'Each presentation slot is 30 minutes including Q&A.',
    status: 'answered',
    created_at: '2024-01-10',
    updated_at: '2024-01-10',
  },
  {
    id: '2',
    conference_id: '1',
    user_id: 'attendee1',
    user_name: 'Mike Chen',
    question: 'Is accommodation provided?',
    reply: undefined,
    status: 'open',
    created_at: '2024-01-12',
    updated_at: '2024-01-12',
  },
  {
    id: '3',
    conference_id: '2',
    user_id: 'speaker2',
    user_name: 'Emma Davis',
    question: 'Can I bring my own projector?',
    reply: undefined,
    status: 'open',
    created_at: '2024-01-13',
    updated_at: '2024-01-13',
  },
];

interface QueryWithEdit extends Query {
  replyText?: string;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<QueryWithEdit[]>(mockQueries);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'answered'>('all');
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.user_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || query.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleReply = (queryId: string) => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    setQueries(
      queries.map((q) =>
        q.id === queryId
          ? {
              ...q,
              reply: replyText,
              status: 'answered',
              updated_at: new Date().toISOString(),
            }
          : q
      )
    );

    toast.success('Reply sent successfully');
    setReplyingId(null);
    setReplyText('');
  };

  return (
    <DashboardLayout role="organizer" userName="John Organizer" userEmail="organizer@example.com">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Queries</h1>
          <p className="text-slate-600 mt-1">View and respond to speaker and attendee questions</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search questions or names..."
              className="pl-10 bg-white border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-full sm:w-40 bg-white border-slate-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Queries</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Queries Cards */}
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <Card key={query.id} className="p-6 border-slate-200 hover:border-slate-300 transition-colors">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-indigo-600" />
                      <h3 className="font-semibold text-slate-900">{query.user_name}</h3>
                      <span
                        className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                          query.status === 'answered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}
                      >
                        {query.status === 'answered' ? 'Answered' : 'Open'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {new Date(query.created_at).toLocaleDateString()} at{' '}
                      {new Date(query.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Question */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-slate-700 mb-2">Question:</p>
                  <p className="text-slate-900">{query.question}</p>
                </div>

                {/* Reply */}
                {query.reply && (
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <p className="text-sm font-medium text-emerald-700 mb-2">Your Reply:</p>
                    <p className="text-emerald-900">{query.reply}</p>
                  </div>
                )}

                {/* Reply Form */}
                {query.status === 'open' && replyingId === query.id && (
                  <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Your Reply</label>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Enter your reply..."
                        className="w-full mt-2 p-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setReplyingId(null);
                          setReplyText('');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleReply(query.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        Send Reply
                      </Button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {query.status === 'open' && replyingId !== query.id && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setReplyingId(query.id)}
                      className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Reply
                    </Button>
                  </div>
                )}

                {query.status === 'answered' && (
                  <div className="flex justify-end">
                    <span className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Answered
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredQueries.length === 0 && (
          <Card className="p-12 border-slate-200 text-center">
            <p className="text-slate-600">No queries found matching your filters.</p>
          </Card>
        )}

        {/* Summary Stats */}
        <Card className="p-6 border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-900 mb-4">Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-slate-900">{queries.length}</p>
              <p className="text-sm text-slate-600">Total Queries</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {queries.filter((q) => q.status === 'open').length}
              </p>
              <p className="text-sm text-slate-600">Open</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">
                {queries.filter((q) => q.status === 'answered').length}
              </p>
              <p className="text-sm text-slate-600">Answered</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
