#!/bin/bash
set -e  # Exit on error

echo "🔧 Starting build..."

# Use python3 (whichever is available in the Vercel environment)
if ! command -v python3 &> /dev/null; then
    echo "❌ python3 not found in the environment."
    exit 1
fi

# Check sqlite3 support (required by Django)
if ! python3 -c "import sqlite3" &> /dev/null; then
    echo "❌ SQLite3 support is missing in the Python environment. Cannot proceed."
    exit 1
fi

# Install dependencies (usually handled by Vercel, but safe to include)
pip install -r requirements.txt

# Collect static files
python3 manage.py collectstatic --noinput

echo "✅ Build completed successfully."
