-- Migration: Add missing columns for conference management enhancements
-- Purpose: Add profile links, event associations, and status tracking

-- Add profile_url to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS profile_url VARCHAR(500);

-- Add event_id to queries table (for event association and filtering)
ALTER TABLE queries 
ADD COLUMN IF NOT EXISTS event_id UUID REFERENCES conferences(id) ON DELETE CASCADE;

-- Create index for event_id on queries
CREATE INDEX IF NOT EXISTS idx_queries_event_id ON queries(event_id);

-- Add event_id to goodies_requests table (for event specification)
ALTER TABLE goodies_requests 
ADD COLUMN IF NOT EXISTS event_id UUID REFERENCES conferences(id) ON DELETE CASCADE;

-- Create index for event_id on goodies_requests
CREATE INDEX IF NOT EXISTS idx_goodies_requests_event_id ON goodies_requests(event_id);

-- Ensure accommodation_form has proper status tracking (already exists but verify)
-- accommodation_form.status already has proper CHECK constraint with values:
-- 'pending', 'approved', 'rejected', 'assigned'

-- Add helpful comment for profile_url
COMMENT ON COLUMN users.profile_url IS 'URL to speaker/attendee profile page for external sharing';
