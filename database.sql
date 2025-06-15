-- Create the todos table in your Supabase database
-- Run this in the Supabase SQL Editor

CREATE TABLE todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Insert some sample data
INSERT INTO todos (task, is_complete) VALUES 
('Set up Supabase project', false),
('Create the todos table', true),
('Connect Next.js to Supabase', false),
('Deploy the application', false);

-- Optional: Create an index for better performance
CREATE INDEX idx_todos_created_at ON todos (created_at DESC);
CREATE INDEX idx_todos_is_complete ON todos (is_complete);