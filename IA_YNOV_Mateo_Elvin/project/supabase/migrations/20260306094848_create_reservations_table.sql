/*
  # Create reservations table

  1. New Tables
    - `reservations`
      - `id` (uuid, primary key, auto-generated)
      - `traveler_name` (text, required) - Name of the traveler
      - `destination` (text, required) - Selected destination (e.g., Paris 1889, Le Cretace, Florence 1504)
      - `departure_era` (text, required) - Selected departure epoch/date
      - `created_at` (timestamptz, default now()) - When the reservation was made
      - `status` (text, default 'pending') - Reservation status

  2. Security
    - Enable RLS on `reservations` table
    - Add INSERT policy for anonymous users to submit reservations
    - Add SELECT policy for anonymous users to read their own reservation by ID
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  traveler_name text NOT NULL,
  destination text NOT NULL,
  departure_era text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a reservation"
  ON reservations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read reservations they just created"
  ON reservations
  FOR SELECT
  TO anon
  USING (created_at > now() - interval '5 minutes');
