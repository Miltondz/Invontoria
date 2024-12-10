-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS warehouses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  expiry_date DATE,
  warehouse_id UUID REFERENCES warehouses(id),
  threshold INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS wastage_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES inventory(id),
  quantity INTEGER NOT NULL,
  reason TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS sales_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID REFERENCES inventory(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert sample data
INSERT INTO warehouses (name, location) VALUES
  ('Main Warehouse', 'New York'),
  ('Secondary Storage', 'Los Angeles');

INSERT INTO inventory (name, category, quantity, price, expiry_date, warehouse_id, threshold) VALUES
  ('Hand Sanitizer', 'Health', 100, 5.99, '2025-12-31', (SELECT id FROM warehouses WHERE name = 'Main Warehouse'), 20),
  ('Face Masks', 'Health', 500, 0.99, '2025-12-31', (SELECT id FROM warehouses WHERE name = 'Main Warehouse'), 100),
  ('Antibacterial Wipes', 'Health', 200, 3.99, '2025-06-30', (SELECT id FROM warehouses WHERE name = 'Secondary Storage'), 50),
  ('First Aid Kit', 'Health', 50, 15.99, '2026-12-31', (SELECT id FROM warehouses WHERE name = 'Secondary Storage'), 10);