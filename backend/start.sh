#!/bin/bash
cd "$(dirname "$0")"
export PATH="/usr/bin:/usr/local/bin:$PATH"
/usr/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload


