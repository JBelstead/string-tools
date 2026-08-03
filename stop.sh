#!/usr/bin/env bash
cd "$(dirname "${BASH_SOURCE[0]}")"

PID_FILE=".dev-server.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "Dev server is not running (no PID file)."
  exit 0
fi

PID=$(cat "$PID_FILE")
if kill -0 "$PID" 2>/dev/null; then
  kill "$PID"
  echo "Dev server stopped (PID $PID)."
else
  echo "Dev server was not running (stale PID file)."
fi
rm -f "$PID_FILE"
