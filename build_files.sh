#!/bin/bash
set -e  # Stop on first error

# Check if python3.9 is available
if ! command -v python3.9 &> /dev/null; then
    echo "❌ python3.9 not found. Please install Python 3.9."
    exit 1
fi

# Check if sqlite3 module is available
if ! python3.9 -c "import sqlite3" &> /dev/null; then
    echo "❌ Python 3.9 is missing SQLite support (_sqlite3)."
    echo "👉 Install 'libsqlite3-dev' and recompile Python 3.9."
    exit 1
fi

# Optional: Create virtual environment
if [ ! -d "venv" ]; then
    python3.9 -m venv venv
fi

source venv/bin/activate

# Upgrade pip and install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput

echo "✅ Done."
