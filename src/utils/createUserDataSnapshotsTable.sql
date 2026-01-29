-- Create user_data_snapshots table for bulletproof data persistence
-- This table stores complete snapshots of user data for recovery purposes

CREATE TABLE IF NOT EXISTS user_data_snapshots (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  data_snapshot JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add RLS policies
ALTER TABLE user_data_snapshots ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own data snapshots
CREATE POLICY "Users can view own data snapshots" ON user_data_snapshots
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data snapshots" ON user_data_snapshots
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data snapshots" ON user_data_snapshots
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data snapshots" ON user_data_snapshots
  FOR DELETE USING (auth.uid() = user_id);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_user_data_snapshots_user_id ON user_data_snapshots(user_id);
CREATE INDEX IF NOT EXISTS idx_user_data_snapshots_updated_at ON user_data_snapshots(updated_at);

-- Add trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_data_snapshots_updated_at
    BEFORE UPDATE ON user_data_snapshots
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
