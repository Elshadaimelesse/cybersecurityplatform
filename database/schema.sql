CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    severity TEXT,
    status TEXT,
    assigned_to INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE malware_samples (
    id SERIAL PRIMARY KEY,
    filename TEXT,
    sha256 TEXT,
    entropy FLOAT,
    yara_matches TEXT,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE iocs (
    id SERIAL PRIMARY KEY,
    indicator TEXT,
    type TEXT,
    confidence INTEGER,
    source TEXT
);