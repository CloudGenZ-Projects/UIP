-- UIP Database Schema for Cloudflare D1
-- Migrated from MySQL/Sequelize

-- Admin users (auth)
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  desc TEXT NOT NULL,
  loc TEXT NOT NULL,
  time TEXT NOT NULL,
  link TEXT,
  buttonText TEXT DEFAULT 'More Info',
  featured INTEGER DEFAULT 0,
  inAppRegistration INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

-- Event registrations (FK to events)
CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guestStatus TEXT NOT NULL DEFAULT 'Attending Alone',
  eventId INTEGER NOT NULL,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE
);

-- Stories (with publish moderation)
CREATE TABLE IF NOT EXISTS stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  story_text TEXT NOT NULL,
  consent_pub INTEGER DEFAULT 0,
  consent_edit INTEGER DEFAULT 0,
  isPublished INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

-- News articles
CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  country TEXT NOT NULL,
  title TEXT NOT NULL,
  desc TEXT NOT NULL,
  source TEXT NOT NULL,
  date TEXT NOT NULL,
  url TEXT NOT NULL,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

-- Generic form submissions (replaces 10 separate tables)
-- form_type: volunteer, partnership, peer-support, wellness, cultural,
--            youth-program, contact, care-pack, support-request, contact-partnership
CREATE TABLE IF NOT EXISTS form_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  form_type TEXT NOT NULL,
  data TEXT NOT NULL,
  createdAt TEXT DEFAULT (datetime('now'))
);

-- Index for fast filtering by form type
CREATE INDEX IF NOT EXISTS idx_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_created ON form_submissions(form_type, createdAt);
