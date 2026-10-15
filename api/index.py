"""Vercel Serverless Function entrypoint."""
import sys
import os

# Ensure project root is in python path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from backend.server import app
